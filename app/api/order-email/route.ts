import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";
import type { ValidatedBasketItem } from "@/types/basket";

export const runtime = "nodejs";

// Internal retry endpoint. Keep ORDER_ID_SECRET server-only and call this only from trusted automation.
export async function POST(request: Request) {
  if (!process.env.ORDER_ID_SECRET || request.headers.get("x-order-secret") !== process.env.ORDER_ID_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { orderId } = await request.json() as { orderId?: string };
    if (!orderId) return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    const items: ValidatedBasketItem[] = order.items.map((item) => ({ lineId: item.id, productId: item.productId, quantity: item.quantity, unitPrice: Number(item.unitPrice), name: item.productName, image: "", lineTotal: Number(item.lineTotal), flavourLabel: item.flavourLabel ?? undefined, sizeLabel: item.sizeLabel ?? undefined }));
    await sendOrderConfirmationEmail({ orderNumber: order.orderNumber, customer: { fullName: order.fullName, phone: order.phone, email: order.email }, fulfilment: order.fulfilment === "PICKUP" ? { method: "PICKUP", pickupLocation: order.pickupLocation as "WESTGATE" | "AVONDALE" } : { method: "DELIVERY", deliveryAddress: order.deliveryAddress ?? "" }, items, total: Number(order.total) });
    await prisma.order.update({ where: { id: order.id }, data: { emailStatus: "SENT", emailError: null } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Email retry failed" }, { status: 500 });
  }
}
