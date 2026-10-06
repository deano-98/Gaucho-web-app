import { products } from "@/data/products";
import { ProductCard } from "@/components/menu/ProductCard";

export function MenuSection({ fullPage = false }: { fullPage?: boolean }) {
  const chicken = products.filter((p) => p.category === "chicken" && p.active);
  const wings = products.filter((p) => p.category === "wings" && p.active);
  const desserts = products.filter((p) => p.category === "dessert" && p.active);
  const sides = products.filter((p) => p.category === "side" && p.active);
  const section = (title: string, items: typeof products) =>
    items.length ? (
      <div className="mt-12">
        <div className="mb-5 flex items-end justify-between">
          <h3 className="font-display text-3xl font-black uppercase">
            {title}
          </h3>
          {/* <span className="text-sm text-slate-500">{items.length} options</span> */}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    ) : null;
  return (
    <section id="menu" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        {!fullPage && (
          <>
            <p className="font-black uppercase tracking-[.2em] text-orange">
              menu
            </p>
            <h2 className="mt-2 max-w-3xl font-display text-4xl font-black uppercase md:text-5xl">
              Big braai flavour without the restaurant price tag.
            </h2>
          </>
        )}
        {section("Chicken", chicken)}
        {section("Wings", wings)}
        {section("Desserts", desserts)}
        {section("Sides", sides)}
        {/* {!fullPage && (
          <div className="mt-8">
            <a
              href="/menu"
              className="font-bold underline decoration-orange decoration-2 underline-offset-4"
            >
              See the full menu
            </a>
          </div>
        )} */}
      </div>
    </section>
  );
}
