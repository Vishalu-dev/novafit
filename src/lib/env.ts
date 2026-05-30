/** Public site config — safe for client bundle (VITE_* only). */
export const siteConfig = {
  name: "NOVAFIT",
  tagline: "Forge Your Ultimate Physique",
  description:
    "Premium futuristic luxury gym in Pune. Elite trainers, smart programs, 24/7 access.",
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://novafit.in",
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? "hello@novafit.in",
  contactPhone: (import.meta.env.VITE_CONTACT_PHONE as string | undefined) ?? "+919999999999",
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "919999999999",
  instagram: (import.meta.env.VITE_INSTAGRAM_URL as string | undefined) ?? "https://instagram.com",
} as const;
