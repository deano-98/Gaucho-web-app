import { siteConfig } from "@/data/site-config";
export function LocalBusinessJsonLd() {
  const data = { "@context": "https://schema.org", "@type": "FoodEstablishment", name: siteConfig.name, description: siteConfig.description, url: siteConfig.url, telephone: siteConfig.phone, sameAs: Object.values(siteConfig.social).filter(Boolean), ...(siteConfig.address ? { address: { "@type": "PostalAddress", streetAddress: siteConfig.address } } : {}), ...(siteConfig.businessHours ? { openingHours: siteConfig.businessHours } : {}) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
