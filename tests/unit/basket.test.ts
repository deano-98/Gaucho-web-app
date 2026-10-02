import { describe, expect, it } from "vitest";
import { calculateBasketTotal, makeLineId } from "@/lib/basket";

describe("basket calculations", () => {
  it("calculates line totals from trusted unit prices", () =>
    expect(
      calculateBasketTotal([
        { lineId: "a", productId: "wings-15", quantity: 2, unitPrice: 8 },
      ]),
    ).toBe(16));
  it("keeps different configurations as different line IDs", () =>
    expect(
      makeLineId({
        productId: "wings-15",
        quantity: 1,
        unitPrice: 8,
        flavourId: "spicy",
      }),
    ).not.toBe(
      makeLineId({
        productId: "wings-15",
        quantity: 1,
        unitPrice: 8,
        flavourId: "classic",
      }),
    ));
});
