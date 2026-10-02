const benefits = [
  [
    "01",
    "Freshly Braaied",
    "Cooked over charcoal for that smoky braai flavour.",
  ],
  [
    "02",
    "Great Value",
    "Straightforward portions and promos built around value.",
  ],
  ["03", "Made with Care", "Thoughtful preparation from kitchen to handoff."],
  ["04", "Support Local", "Your order helps a local Harare business grow."],
];
export function WhyChooseUs() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-black uppercase tracking-[.2em] text-orange">
          Why choose us
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([n, t, d]) => (
            <article
              key={t}
              className="rounded-3xl border border-black/10 bg-white p-6"
            >
              <span className="text-sm font-black text-orange">{n}</span>
              <h2 className="mt-8 font-display text-2xl font-black uppercase">
                {t}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
