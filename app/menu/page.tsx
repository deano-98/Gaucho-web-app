import type { Metadata } from "next";
import { MenuSection } from "@/components/menu/MenuSection";
export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse charcoal-braaied chicken, wings, desserts and value combos in Harare.",
};
export default function MenuPage() {
  return (
    <main className="pt-20">
      <MenuSection fullPage />
    </main>
  );
}
