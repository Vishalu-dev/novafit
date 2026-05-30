import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { logo } from "@/assets/images";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useMembership } from "@/components/novafit/membership-context";

const links = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openMembership } = useMembership();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all ${
              scrolled ? "glass-strong" : "glass"
            }`}
          >
            <a href="#home" className="flex items-center gap-2.5 group">
              <OptimizedImage src={logo} alt="NOVAFIT" width={32} height={32} lazy={false} className="h-8 w-8 transition-transform group-hover:rotate-12" />
              <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-gradient-silver">NOVAFIT</span>
            </a>
            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="relative rounded-full px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest text-foreground/80 transition-colors hover:text-foreground"
                >
                  <span className="relative z-10">{l.label}</span>
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/0 opacity-0 transition-all hover:bg-primary/10 hover:opacity-100" />
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openMembership}
                className="hidden rounded-full bg-primary px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.03] hover:neon-glow md:inline-flex"
              >
                Join Now
              </button>
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
              >
                <HiMenuAlt4 className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col glass-strong p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <OptimizedImage src={logo} alt="NOVAFIT" width={36} height={36} lazy={false} className="h-9 w-9" />
                <button aria-label="Close" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full glass">
                  <HiX className="text-xl" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="rounded-xl px-4 py-3 font-display text-sm font-semibold uppercase tracking-widest text-foreground/90 hover:bg-white/5"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openMembership();
                }}
                className="mt-auto w-full rounded-full bg-primary px-5 py-3 text-center font-display text-sm font-bold uppercase tracking-widest text-primary-foreground neon-glow"
              >
                Join Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Navbar);