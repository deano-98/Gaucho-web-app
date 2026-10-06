"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useBasket } from "@/context/BasketContext";
import { getProduct } from "@/data/products";
import { formatCurrency } from "@/lib/format-currency";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import type { BasketItem as BasketItemType } from "@/types/basket";
export function BasketItem({ item }: { item: BasketItemType }) {
  const { setQuantity, removeItem } = useBasket();
  const product = getProduct(item.productId);
  if (!product) return null;
  return (
    <div className="flex gap-4 border-b border-white/10 py-5">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-charcoal">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3">
          <div>
            <h3 className="font-bold">{product.name}</h3>
            <p className="mt-1 text-xs text-white/60">
              {product.category === "combo"
                ? Object.entries(item.comboOptions ?? {})
                    .flatMap(([productId, ids]) => {
                      const child = getProduct(productId);
                      return ids.map(
                        (id) =>
                          child?.flavours?.find((f) => f.id === id)?.label ??
                          id,
                      );
                    })
                    .join(", ")
                : [
                    item.sizeId &&
                      product.sizes?.find((x) => x.id === item.sizeId)?.label,
                    item.flavourId &&
                      product.flavours?.find((x) => x.id === item.flavourId)
                        ?.label,
                  ]
                    .filter(Boolean)
                    .join(" / ")}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.lineId)}
            aria-label={`Remove ${product.name}`}
            className="text-white/50 hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector
            label={product.name}
            value={item.quantity}
            onChange={(value) => setQuantity(item.lineId, value)}
          />
          <span className="font-black">
            {formatCurrency(item.unitPrice * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
