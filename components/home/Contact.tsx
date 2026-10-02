import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
export function Contact() {
  return (
    <section id="contact" className="px-5 py-20">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-orange p-8 text-white md:p-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-black uppercase tracking-[.2em] text-gold">
              Contact
            </p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase md:text-5xl">
              Ready for a proper braai?
            </h2>
            <p className="mt-4 max-w-xl text-white/80">
              Message us to confirm availability, pickup details or delivery
              arrangements.
            </p>
          </div>
          <div className="grid gap-4 text-sm">
            <div className="flex gap-3">
              <MessageCircle />{" "}
              <span>WhatsApp: {siteConfig.whatsappNumber}</span>
            </div>
            <div className="flex gap-3">
              <Phone /> <span>Phone: {siteConfig.phone}</span>
            </div>
            <div className="flex gap-3">
              <MapPin /> <span>Pickup: Westgate & Avondale</span>
            </div>
            {siteConfig.businessHours && (
              <div className="flex gap-3">
                <Clock3 /> <span>{siteConfig.businessHours}</span>
              </div>
            )}
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-fit rounded-full bg-charcoal px-6 py-3 font-black"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
