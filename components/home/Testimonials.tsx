const testimonials = [
  "REAL REVIEW PLACEHOLDER — replace with a verified customer review.",
  "REAL REVIEW PLACEHOLDER — replace with a verified customer review.",
  "REAL REVIEW PLACEHOLDER — replace with a verified customer review.",
];
export function Testimonials() {
  return (
    <section className="bg-charcoal px-5 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="font-black uppercase tracking-[.2em]">
          What customers say
        </p>
        <h2 className="mt-3 font-display text-4xl font-black uppercase">
          Real words from real customers.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((text, i) => (
            <blockquote
              key={i}
              className="rounded-3xl border border-white/10 bg-cream p-6 text-sm leading-7"
            >
              <p>“{text}”</p>
              <footer className="mt-5 font-bold text-white/50">
                Customer review placeholder
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
