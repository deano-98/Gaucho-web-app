import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/order-number";
import { validateAndPriceOrder } from "@/lib/server-order";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/data/site-config";
import { Prisma } from "@prisma/client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = checkRateLimit(ip, siteConfig.order.rateLimitMax, siteConfig.order.rateLimitWindowMs);
  if (!limit.allowed) return NextResponse.json({ error: "Too many order attempts. Please wait and try again." }, { status: 429, headers: { "Retry-After": String(Math.ceil((limit.retryAfterMs ?? 60000) / 1000)) } });

  try {
    const body = await request.json();
    const order = validateAndPriceOrder(body);
    const existing = await prisma.order.findUnique({ where: { idempotencyKey: order.idempotencyKey }, include: { items: true } });
    if (existing) return buildExistingResponse(existing);

    let created;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const orderNumber = generateOrderNumber();
      try {
        created = await prisma.order.create({
          data: {
            orderNumber,
            idempotencyKey: order.idempotencyKey,
            fullName: order.customer.fullName,
            phone: order.customer.phone,
            email: order.customer.email,
            fulfilment: order.fulfilment.method,
            pickupLocation: order.fulfilment.method === "PICKUP" ? order.fulfilment.pickupLocation : null,
            deliveryAddress: order.fulfilment.method === "DELIVERY" ? order.fulfilment.deliveryAddress : null,
            subtotal: order.subtotal,
            deliveryFee: order.deliveryFee,
            total: order.total,
            items: { create: order.items.map((item) => ({ productId: item.productId, productName: item.name, quantity: item.quantity, unitPrice: item.unitPrice, lineTotal: item.lineTotal, flavourId: item.flavourId, flavourLabel: item.flavourLabel, sizeId: item.sizeId, sizeLabel: item.sizeLabel, variantId: item.variantId, variantLabel: item.variantLabel, configuration: item.comboOptions ?? undefined })) }
          },
          include: { items: true }
        });
        break;
      } catch (error) {
        if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") throw error;
      }
    }
    if (!created) throw new Error("Could not allocate a unique order number.");

    const validatedItems = order.items;
    const message = buildWhatsAppMessage({ orderNumber: created.orderNumber, customer: order.customer, fulfilment: order.fulfilment, items: validatedItems, total: order.total });
    const whatsappUrl = buildWhatsAppUrl(message);

    try {
      await sendOrderConfirmationEmail({ orderNumber: created.orderNumber, customer: order.customer, fulfilment: order.fulfilment, items: validatedItems, total: order.total });
      await prisma.order.update({ where: { id: created.id }, data: { emailStatus: "SENT" } });
    } catch (emailError) {
      await prisma.order.update({ where: { id: created.id }, data: { emailStatus: "FAILED", emailError: emailError instanceof Error ? emailError.message.slice(0, 500) : "Email provider error" } });
      // Email failure does not invalidate an already-persisted order; WhatsApp remains the primary handoff.
    }

    return NextResponse.json({ orderNumber: created.orderNumber, whatsappUrl, total: order.total });
  } catch (error) {
    if (error instanceof SyntaxError) return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
    const message = error instanceof Error ? error.message : "Unable to create order.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function buildExistingResponse(order: Prisma.OrderGetPayload<{ include: { items: true } }>) {
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  const items = order.items.map((item) => ({ lineId: item.id, productId: item.productId, quantity: item.quantity, unitPrice: Number(item.unitPrice), name: item.productName, image: "", lineTotal: Number(item.lineTotal), flavourLabel: item.flavourLabel ?? undefined, sizeLabel: item.sizeLabel ?? undefined }));
  const message = buildWhatsAppMessage({ orderNumber: order.orderNumber, customer: { fullName: order.fullName, phone: order.phone, email: order.email }, fulfilment: order.fulfilment === "PICKUP" ? { method: "PICKUP", pickupLocation: order.pickupLocation as "WESTGATE" | "AVONDALE" } : { method: "DELIVERY", deliveryAddress: order.deliveryAddress ?? "" }, items, total: Number(order.total) });
  return NextResponse.json({ orderNumber: order.orderNumber, whatsappUrl: buildWhatsAppUrl(message), total: Number(order.total), duplicate: true });
}
