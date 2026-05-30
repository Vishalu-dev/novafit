import { memo } from "react";
import { FaWhatsapp, FaPhone, FaInstagram, FaDumbbell, FaUsers, FaHouse } from "react-icons/fa6";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { useMembership } from "./membership-context";

const social = [
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/919999999999", accent: "text-[#25D366]" },
  { icon: FaPhone, label: "Call", href: "tel:+919999999999", accent: "text-foreground" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com", accent: "text-[#E1306C]" },
] as const;

const mobileNav = [
  { icon: FaHouse, label: "Home", href: "#home" },
  { icon: FaDumbbell, label: "Programs", href: "#programs" },
  { icon: FaUsers, label: "Trainers", href: "#trainers" },
  { icon: FaWhatsapp, label: "Chat", href: "https://wa.me/919999999999", external: true },
] as const;

function FloatingDock() {
  const visible = useScrollVisibility(80);
  const { openMembership } = useMembership();

  return (
    <>
      {/* Desktop — compact pill, bottom-right, auto-hide */}
      <div
        className={`pointer-events-none fixed bottom-6 right-5 z-40 hidden transition-[transform,opacity] duration-300 ease-out md:block ${
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        aria-hidden={!visible}
      >
        <div className="pointer-events-auto flex flex-col items-center gap-1.5 rounded-2xl glass-dock p-2 shadow-[0_12px_40px_oklch(0_0_0/0.45)]">
          {social.map((it) => (
            <a
              key={it.label}
              href={it.href}
              target={it.label === "WhatsApp" || it.label === "Instagram" ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={it.label}
              className="group relative grid h-11 w-11 place-items-center rounded-xl text-foreground/75 transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-white/8 hover:text-foreground"
            >
              <it.icon className={`text-lg ${it.accent}`} />
              <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md bg-foreground/95 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-background opacity-0 transition-opacity group-hover:opacity-100">
                {it.label}
              </span>
            </a>
          ))}
          <div className="my-0.5 h-px w-8 bg-white/10" />
          <button
            type="button"
            onClick={openMembership}
            aria-label="Book consultation"
            className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            <FaDumbbell className="text-lg" />
          </button>
        </div>
      </div>

      {/* Mobile — bottom navigation */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 glass-dock md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 py-2">
          {mobileNav.map((it) =>
            "external" in it && it.external ? (
              <a
                key={it.label}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[48px] min-w-[56px] flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-display font-semibold uppercase tracking-wider text-muted-foreground transition-colors active:text-primary"
              >
                <it.icon className="text-lg" />
                <span>{it.label}</span>
              </a>
            ) : (
              <a
                key={it.label}
                href={it.href}
                className="flex min-h-[48px] min-w-[56px] flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-display font-semibold uppercase tracking-wider text-muted-foreground transition-colors active:text-primary"
              >
                <it.icon className="text-lg" />
                <span>{it.label}</span>
              </a>
            ),
          )}
          <button
            type="button"
            onClick={openMembership}
            className="flex min-h-[48px] min-w-[56px] flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-display font-bold uppercase tracking-wider text-primary"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <FaDumbbell className="text-sm" />
            </span>
            <span>Join</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default memo(FloatingDock);
