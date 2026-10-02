import { siteConfig } from "@/data/site-config";
import { formatCurrency } from "@/lib/format-currency";
import type { ValidatedBasketItem } from "@/types/basket";
import type { CustomerDetails, FulfilmentDetails } from "@/types/order";

export function buildWhatsAppMessage(input: {
  orderNumber: string;
  customer: CustomerDetails;
  fulfilment: FulfilmentDetails;
  items: ValidatedBasketItem[];
  total: number;
}) {
  const itemLines = input.items
    .map((item) => {
      const options = [item.sizeLabel, item.flavourLabel].filter(Boolean).join(" / ");
      return `${item.name}${options ? ` — ${options}` : ""}\nQuantity: ${item.quantity}\nPrice: ${formatCurrency(item.lineTotal)}`;
    })
    .join("\n\n");

  const location = input.fulfilment.method === "PICKUP"
    ? input.fulfilment.pickupLocation
    : input.fulfilment.deliveryAddress;

  return [
    "Hello Braai Chicken! I would like to place an order.",
    "",
    `Order Number: ${input.orderNumber}`,
    "",
    `Customer: ${input.customer.fullName}`,
    `Phone: ${input.customer.phone}`,
    `Email: ${input.customer.email}`,
    "",
    "ORDER DETAILS:",
    itemLines,
    "",
    `Fulfilment: ${input.fulfilment.method === "PICKUP" ? "Pickup" : "Delivery"}`,
    `Location or Address: ${location ?? "To be confirmed"}`,
    "",
    `Total: ${formatCurrency(input.total)}`,
    "",
    "Please confirm my order. Thank you!"
  ].join("\n");
}

export function buildWhatsAppUrl(message: string) {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
