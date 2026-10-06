"use client";
import { useState } from "react";
import { products } from "@/data/products";
import { calculateComboRegularPrice } from "@/lib/server-order";
import { formatCurrency } from "@/lib/format-currency";
import { useBasket } from "@/context/BasketContext";
import { trackEvent } from "@/lib/analytics";

export function Promotions() {
  const combos = products.filter((p) => p.category === "combo" && p.active);
  const { addItem } = useBasket();
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<
    Record<string, Record<string, string[]>>
  >({});
  const needsOptions = (id: string) =>
    products
      .find((p) => p.id === id)
      ?.comboComponents?.some((c) => !c.fixedOptionId && c.optionType);
  const add = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p?.price) return;
    const options = selected[id] ?? {};
    if (needsOptions(id)) {
      for (const c of p.comboComponents ?? [])
        if (
          !c.fixedOptionId &&
          c.optionType &&
          (options[c.productId]?.length ?? 0) < c.quantity
        ) {
          setMessage("Choose all combo flavours first.");
          return;
        }
    }
    addItem({
      productId: id,
      quantity: 1,
      unitPrice: p.price,
      comboOptions: options,
    });
    trackEvent("add_to_cart", { product_id: id, quantity: 1 });
    setMessage(`${p.name} added to basket.`);
  };
  const setOption = (
    comboId: string,
    productId: string,
    index: number,
    value: string,
  ) =>
    setSelected((current) => ({
      ...current,
      [comboId]: {
        ...(current[comboId] ?? {}),
        [productId]: Object.assign([...(current[comboId]?.[productId] ?? [])], {
          [index]: value,
        }),
      },
    }));
  return (
    <section id="promos" className="bg-charcoal px-5 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-black uppercase tracking-[.2em] text-orange">
              Promos
            </p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase">
              Feed more. Spend less.
            </h2>
          </div>
          {message && (
            <p role="status" className="text-sm font-bold">
              {message}
            </p>
          )}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {combos.map((combo) => {
            const regular = calculateComboRegularPrice(combo.id);
            const comboPrice = combo.price ?? 0;
            const saving = Math.max(0, regular - comboPrice);
            return (
              <article
                key={combo.id}
                className="rounded-3xl border border-white/10 bg-cream p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase">
                      {combo.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      {combo.description}
                    </p>
                  </div>
                  {saving > 0 && (
                    <span className="rounded-full bg-gold px-3 py-1 text-xs font-black">
                      Save {formatCurrency(saving)}
                    </span>
                  )}
                </div>
                {(combo.comboComponents ?? [])
                  .filter((c) => !c.fixedOptionId && c.optionType)
                  .map((c) => {
                    const child = products.find((p) => p.id === c.productId)!;
                    return (
                      <div key={c.productId} className="mt-4">
                        {Array.from({ length: c.quantity }).map((_, i) => (
                          <select
                            key={i}
                            value={selected[combo.id]?.[c.productId]?.[i] ?? ""}
                            onChange={(e) =>
                              setOption(
                                combo.id,
                                c.productId,
                                i,
                                e.target.value,
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-white/15 bg-charcoal px-3 py-3 text-sm text-white"
                          >
                            <option value="">
                              Choose {child.name} flavour
                            </option>
                            {child.flavours?.map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.label}
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                    );
                  })}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <span className="font-black text-orange">
                      {formatCurrency(comboPrice)}
                    </span>
                    {regular > comboPrice && (
                      <span className="ml-2 text-xs text-white/50 line-through">
                        {formatCurrency(regular)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => add(combo.id)}
                    className="rounded-full bg-orange px-4 py-2 text-sm font-black text-white"
                  >
                    Add combo
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
