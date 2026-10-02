import { Hero } from "@/components/home/Hero";
import { MenuSection } from "@/components/menu/MenuSection";
import { Promotions } from "@/components/home/Promotions";
import { About } from "@/components/home/About";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { Contact } from "@/components/home/Contact";
import { LocalBusinessJsonLd } from "@/components/home/LocalBusinessJsonLd";

export default function HomePage() {
  return (
    <main>
      <LocalBusinessJsonLd />
      <Hero />
      <MenuSection />
      <Promotions />
      <About />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </main>
  );
}
