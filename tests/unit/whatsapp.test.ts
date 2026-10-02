import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
describe("WhatsApp order messages", () => {
  it("includes order details and encodes the URL", () => {
    const message = buildWhatsAppMessage({
      orderNumber: "BC-20261001-ABC12345",
      customer: {
        fullName: "Dean",
        phone: "+263771234567",
        email: "d@example.com",
      },
      fulfilment: { method: "PICKUP", pickupLocation: "WESTGATE" },
      items: [
        {
          lineId: "1",
          productId: "wings-15",
          quantity: 2,
          unitPrice: 8,
          name: "15 Wings",
          image: "",
          lineTotal: 16,
          flavourLabel: "Spicy",
        },
      ],
      total: 16,
    });
    expect(message).toContain("BC-20261001-ABC12345");
    expect(buildWhatsAppUrl(message)).toContain("https://wa.me/");
    expect(buildWhatsAppUrl(message)).toContain(encodeURIComponent(message));
  });
});
