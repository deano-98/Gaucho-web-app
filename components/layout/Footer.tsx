import Link from "next/link";
import { siteConfig } from "@/data/site-config";
export function Footer() {
  return (
    <footer className="bg-charcoal px-5 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-black uppercase">
            Gau<span className="text-orange">cho</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            {siteConfig.tagline} Charcoal-grilled chicken, wings and desserts
            made for local value.
          </p>
        </div>
        <div>
          <h2 className="font-bold">Explore</h2>
          <div className="mt-3 grid gap-2 text-sm text-white/70">
            <Link href="/menu">Menu</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
            <Link href="/basket">Basket</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Contact</h2>
          <p className="mt-3 text-sm text-white/70">
            Phone:{" "}
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
              className="underline-offset-4 hover:underline"
            >
              {siteConfig.phone}
            </a>
          </p>
          <p className="text-sm text-white/70">Email: {siteConfig.email}</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/50">
        © {new Date().getFullYear()} Braai Chicken. All rights reserved.
      </div>
    </footer>
  );
}
