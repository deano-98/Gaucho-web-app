// MANUAL INPUT REQUIRED: Replace every placeholder with the business owner's real information.
export const siteConfig = {
  name: "Braai Chicken",
  tagline: "Fresh. Juicy. Local.",
  description:
    "Smoky, juicy charcoal-braaied chicken and wings made for great-value meals in Harare.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2637XXXXXXXX",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+263 7X XXX XXXX",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "orders@example.com",
  // MANUAL INPUT REQUIRED: Add real hours before enabling LocalBusiness structured data hours.
  businessHours: "",
  address: "", // MANUAL INPUT REQUIRED: Do not invent a street address.
  social: {
    instagram: "", // MANUAL INPUT REQUIRED
    facebook: "", // MANUAL INPUT REQUIRED
    tiktok: "", // MANUAL INPUT REQUIRED
  },
  pickupLocations: {
    WESTGATE: {
      label: "Westgate",
      instructions: "", // MANUAL INPUT REQUIRED
    },
    AVONDALE: {
      label: "Avondale",
      instructions: "", // MANUAL INPUT REQUIRED
    },
  },
  delivery: {
    enabled: false, // MANUAL INPUT REQUIRED: Set true only after zones and fees are configured.
    fee: 0,
    zones: [] as string[],
    note: "Delivery fees and availability are confirmed by the business.",
  },
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
    clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "",
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  },
  order: {
    currency: "USD",
    currencySymbol: "$",
    rateLimitMax: Number(process.env.ORDER_RATE_LIMIT_MAX || 8),
    rateLimitWindowMs: Number(process.env.ORDER_RATE_LIMIT_WINDOW_MS || 60000),
  },
} as const;
