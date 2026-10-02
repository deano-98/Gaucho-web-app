"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Suspense } from "react";

function Confirmation() {
  const params = useSearchParams();
  const order = params.get("order") ?? "your order";
  const whatsapp = params.get("whatsapp");
  return (
    <section className="mx-auto max-w-2xl px-5 py-20 text-center">
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700">
        <CheckCircle2 />
      </div>
      <p className="font-bold uppercase tracking-[.2em] text-orange">
        Order created
      </p>
      <h1 className="mt-3 font-display text-4xl font-black uppercase">
        Thanks for choosing local.
      </h1>
      <p className="mt-4 text-slate-600">
        Your order number is <strong>{order}</strong>. WhatsApp still needs to
        be sent and the business must confirm your order.
      </p>
      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-black text-white"
        >
          <MessageCircle size={20} /> Continue to WhatsApp
        </a>
      )}
      <div className="mt-5">
        <Link href="/menu" className="font-bold underline">
          Back to menu
        </Link>
      </div>
    </section>
  );
}
export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <Confirmation />
    </Suspense>
  );
}
