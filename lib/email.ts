import { Resend } from "resend";
import { siteConfig } from "@/data/site-config";
import { formatCurrency } from "@/lib/format-currency";
import type { ValidatedBasketItem } from "@/types/basket";
import type { CustomerDetails, FulfilmentDetails } from "@/types/order";

export async function sendOrderConfirmationEmail(input: {
  orderNumber: string;
  customer: CustomerDetails;
  fulfilment: FulfilmentDetails;
  items: ValidatedBasketItem[];
  total: number;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) throw new Error("Email service is not configured.");

  const resend = new Resend(apiKey);
  const location =
    input.fulfilment.method === "PICKUP"
      ? input.fulfilment.pickupLocation
      : input.fulfilment.deliveryAddress;
  const rows = input.items
    .map(
      (item) =>
        `<tr><td style="padding:10px;border-bottom:1px solid #eee">${escapeHtml(item.name)}<br><small>${escapeHtml([item.sizeLabel, item.flavourLabel].filter(Boolean).join(" / "))}</small></td><td style="padding:10px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td><td style="padding:10px;border-bottom:1px solid #eee;text-align:right">${formatCurrency(item.lineTotal)}</td></tr>`,
    )
    .join("");
  const html = `<!doctype html><html><body style="margin:0;background:#fff8ed;font-family:Arial,sans-serif;color:#171717"><div style="max-width:620px;margin:30px auto;background:#fff;padding:32px;border-radius:16px"><div style="font-size:28px;font-weight:900">Braai <span style="color:#f15a24">Chicken</span></div><p>Thank you for ordering from Braai Chicken!</p><div style="background:#171717;color:#fff;padding:18px;border-radius:12px"><div style="font-size:13px;opacity:.8">ORDER NUMBER</div><div style="font-size:24px;font-weight:800">${escapeHtml(input.orderNumber)}</div></div><p>Please present this number when collecting your order.</p><table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left">Item</th><th>Qty</th><th style="text-align:right">Total</th></tr></thead><tbody>${rows}</tbody></table><p><strong>Total: ${formatCurrency(input.total)}</strong></p><p>Fulfilment: <strong>${input.fulfilment.method === "PICKUP" ? "Pickup" : "Delivery"}</strong><br>${escapeHtml(String(location ?? "To be confirmed"))}</p><p>We will contact you through WhatsApp to confirm your order.</p><p>Thank you for supporting a local business!</p></div></body></html>`;
  const text = `Thank you for ordering from Braai Chicken!\n\nOrder number: ${input.orderNumber}\n\n${input.items.map((item) => `${item.name} ${item.flavourLabel ?? ""} ${item.sizeLabel ?? ""} x${item.quantity}: ${formatCurrency(item.lineTotal)}`).join("\n")}\n\nTotal: ${formatCurrency(input.total)}\nFulfilment: ${input.fulfilment.method}\n${location ?? ""}\n\nWe will contact you through WhatsApp to confirm your order.`;

  const result = await resend.emails.send({
    from,
    to: input.customer.email,
    subject: `Your Braai Chicken Order #${input.orderNumber}`,
    html,
    text,
    replyTo: siteConfig.email,
  });

  if (result.error) throw new Error(result.error.message);
  return result.data;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        char
      ] ?? char,
  );
}
