import type { Metadata } from "next";
import { BasketPage } from "@/components/basket/BasketPage";
export const metadata: Metadata = {
  title: "Your Basket",
  description: "Review your Braai Chicken order and place it through WhatsApp.",
};
export default function BasketRoute() {
  return (
    <main className="pt-20">
      <BasketPage />
    </main>
  );
}
