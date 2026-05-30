import { siteConfig } from "@/lib/env";
import { titleLogoUrl } from "@/assets/images";

export function getHealthClubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: titleLogoUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Koregaon Park",
      addressLocality: "Pune",
      postalCode: "411001",
      addressCountry: "IN",
    },
    telephone: siteConfig.contactPhone,
    email: siteConfig.contactEmail,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };
}
