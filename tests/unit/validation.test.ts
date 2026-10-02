import { describe, expect, it } from "vitest";
import { validateAndPriceOrder } from "@/lib/server-order";
describe("server order validation", () => {
  const base = { idempotencyKey: "550e8400-e29b-41d4-a716-446655440000", customer: { fullName: "Test Customer", phone: "+263 771234567", email: "test@example.com" }, fulfilment: { method: "PICKUP" as const, pickupLocation: "WESTGATE" as const } };
  it("recalculates a normal product price", () => { const result = validateAndPriceOrder({ ...base, items: [{ lineId: "x", productId: "wings-15", quantity: 2, flavourId: "spicy", unitPrice: 999 }] }); expect(result.subtotal).toBe(16); });
  it("rejects missing flavour", () => expect(() => validateAndPriceOrder({ ...base, items: [{ lineId: "x", productId: "wings-15", quantity: 1 }] })).toThrow());
  it("prices combos from configured promo price", () => { const result = validateAndPriceOrder({ ...base, items: [{ lineId: "x", productId: "combo-large-chicken-15-wings", quantity: 1, comboOptions: { "wings-15": ["classic"] } }] }); expect(result.subtotal).toBe(16); });
});
