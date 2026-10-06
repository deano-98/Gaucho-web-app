"use client";
import Link from "next/link";
import { useBasket } from "@/context/BasketContext";
import { BasketItem } from "@/components/basket/BasketItem";
import { OrderForm } from "@/components/basket/OrderForm";
import { formatCurrency } from "@/lib/format-currency";
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";
export function BasketPage() {
  const { items, subtotal, hydrated } = useBasket();
  useEffect(() => {
    if (hydrated) {
      trackEvent("view_cart", { item_count: items.length });
      trackEvent("begin_checkout", { item_count: items.length });
    }
  }, [hydrated]);
  if (!hydrated)
    return (
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p>Loading basket…</p>
      </section>
    );
  if (!items.length)
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="font-black uppercase tracking-[.2em] text-orange">
          Your basket
        </p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase">
          Nothing here yet.
        </h1>
        <p className="mt-4 text-white/70">
          Pick a chicken, wings or dessert and your order will appear here.
        </p>
        <Link
          href="#menu"
          className="mt-7 inline-block rounded-full bg-orange px-6 py-3 font-black text-white"
        >
          Browse the menu
        </Link>
      </section>
    );
  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="font-black uppercase tracking-[.2em] text-orange">
            Your basket
          </p>
          <h1 className="mt-2 font-display text-4xl font-black uppercase">
            Ready to order?
          </h1>
          <div className="mt-6 rounded-3xl border border-white/10 bg-cream px-5">
            {items.map((item) => (
              <BasketItem key={item.lineId} item={item} />
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl bg-charcoal p-5 text-white">
            <span className="font-bold">Subtotal</span>
            <strong className="text-xl">{formatCurrency(subtotal)}</strong>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-cream p-5 shadow-sm md:p-7">
          <OrderForm />
        </div>
      </div>
    </section>
  );
}
