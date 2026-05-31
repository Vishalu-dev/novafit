import { memo } from "react";
import { FaPhone, FaWhatsapp, FaLocationDot } from "react-icons/fa6";
import { siteConfig } from "@/lib/env";

const MAPS_DIR =
  "https://www.google.com/maps/dir/?api=1&destination=Koregaon+Park+Pune";

function MobileQuickActions() {
  const telHref = `tel:${siteConfig.contactPhone.replace(/\s/g, "")}`;
  const waHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

  const actions = [
    { label: "Call Now", href: telHref, icon: FaPhone, external: false },
    { label: "WhatsApp", href: waHref, icon: FaWhatsapp, external: true },
    { label: "Directions", href: MAPS_DIR, icon: FaLocationDot, external: true },
  ] as const;

  return (
    <div
      className="fixed inset-x-0 z-[35] border-t border-white/8 glass-dock md:hidden"
      style={{ bottom: "calc(4.25rem + env(safe-area-inset-bottom, 0px))" }}
      aria-label="Quick contact actions"
    >
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-1 px-2 py-1.5">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            target={a.external ? "_blank" : undefined}
            rel={a.external ? "noopener noreferrer" : undefined}
            className="flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-xl font-display text-[9px] font-bold uppercase tracking-wider text-foreground/90 transition-colors active:text-primary"
          >
            <a.icon className="text-base text-primary" aria-hidden />
            <span>{a.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default memo(MobileQuickActions);
