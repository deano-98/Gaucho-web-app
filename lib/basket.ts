import type { BasketItem } from "@/types/basket";
import { getProduct } from "@/data/products";

export function makeLineId(item: Omit<BasketItem, "lineId">) {
  return [
    item.productId,
    item.variantId,
    item.sizeId,
    item.flavourId,
    JSON.stringify(item.comboOptions ?? {}),
  ]
    .filter(Boolean)
    .join("|");
}

export function calculateBasketTotal(items: BasketItem[]) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function calculateClientPrice(item: BasketItem) {
  const product = getProduct(item.productId);
  if (!product) return 0;
  if (product.category === "combo") return product.price ?? 0;
  if (item.sizeId)
    return product.sizes?.find((size) => size.id === item.sizeId)?.price ?? 0;
  if (item.variantId)
    return (
      product.variants?.find((variant) => variant.id === item.variantId)
        ?.price ??
      product.price ??
      0
    );
  return product.price ?? 0;
}
