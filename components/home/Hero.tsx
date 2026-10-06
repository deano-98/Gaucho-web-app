import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-charcoal text-white">
      <Image
        src="/images/chicken/hero_2.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/25"
      />
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-24">
        <div className="relative z-10 max-w-3xl">
          <p className="font-black uppercase tracking-[.25em] text-gold">
            Real chicken. Real flavour.
          </p>
          <h1 className="mt-4 font-display text-5xl font-black uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            Freshly braaied chicken{" "}
            <span className="text-orange">& wings.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75">
            Smoky, juicy and freshly braaied over charcoal. Great taste, great
            value, right in your neighbourhood.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 font-black"
            >
              Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
