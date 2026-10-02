"use client";
import Image from "next/image";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useBasket } from "@/context/BasketContext";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/format-currency";
import { trackEvent } from "@/lib/analytics";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useBasket();
  const [flavour, setFlavour] = useState("");
  const [size, setSize] = useState(product.sizes?.[product.sizes.length - 1]?.id ?? "");
  const [added, setAdded] = useState(false);
  const price = product.sizes ? product.sizes.find((x) => x.id === size)?.price ?? null : product.price;
  const add = () => {
    if (product.flavours?.length && !flavour) return;
    if (product.sizes?.length && !size) return;
    if (price == null) return;
    addItem({ productId: product.id, quantity: 1, unitPrice: price, flavourId: flavour || undefined, sizeId: size || undefined });
    trackEvent("add_to_cart", { product_id: product.id, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };
  return <article className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm"><div className="relative aspect-[4/3] bg-charcoal"><Image src={product.image} alt={`${product.name} — replace placeholder with actual food photography`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div><div className="p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl font-black uppercase">{product.name}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{product.description}</p></div><span className="whitespace-nowrap font-black text-orange">{price == null ? "Price TBD" : formatCurrency(price)}</span></div>{product.sizes && <label className="mt-4 block text-xs font-black uppercase tracking-wide">Size<select value={size} onChange={(e) => setSize(e.target.value)} className="mt-1 w-full rounded-xl border border-black/10 bg-cream px-3 py-2.5 text-sm"><option value="">Choose size</option>{product.sizes.map((s) => <option key={s.id} value={s.id}>{s.label} — {s.price == null ? "TBD" : formatCurrency(s.price)}</option>)}</select></label>}{product.flavours && <label className="mt-4 block text-xs font-black uppercase tracking-wide">Flavour<select value={flavour} onChange={(e) => setFlavour(e.target.value)} className="mt-1 w-full rounded-xl border border-black/10 bg-cream px-3 py-2.5 text-sm"><option value="">Choose flavour</option>{product.flavours.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}</select></label>}<button disabled={price == null || (product.flavours?.length ? !flavour : false)} onClick={add} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 font-black text-white transition hover:bg-orange disabled:cursor-not-allowed disabled:opacity-40">{added ? <><Check size={18} /> Added</> : <><Plus size={18} /> Add to Basket</>}</button></div></article>;
}
