"use client";
import Link from "next/link";
import { Menu, MessageCircle, ShoppingBasket, X } from "lucide-react";
import { useState } from "react";
import { useBasket } from "@/context/BasketContext";
import { siteConfig } from "@/data/site-config";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useBasket();
  const links = [["Home", "/"], ["Menu", "/menu"], ["About", "/#about"], ["Contact", "/#contact"]];
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-cream/95 backdrop-blur"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4"><Link href="/" className="font-display text-2xl font-black uppercase tracking-tight">Braai <span className="text-orange">Chicken</span></Link><nav className="hidden items-center gap-6 md:flex">{links.map(([label, href]) => <Link key={label} href={href} className="font-bold text-sm hover:text-orange">{label}</Link>)}</nav><div className="flex items-center gap-2"><a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="hidden rounded-full bg-whatsapp px-4 py-2 text-sm font-black text-white sm:inline-flex"><MessageCircle size={17} /> WhatsApp</a><Link href="/basket" aria-label={`Basket with ${itemCount} items`} className="relative rounded-full p-2 hover:bg-black/5"><ShoppingBasket size={22} />{itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange px-1 text-[11px] font-black text-white">{itemCount}</span>}</Link><button className="rounded-full p-2 md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div>{open && <nav className="border-t border-black/10 bg-cream px-5 py-4 md:hidden">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={label} href={href} className="block py-3 font-bold">{label}</Link>)}<a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 font-black text-white">WhatsApp</a></nav>}</header>;
}
