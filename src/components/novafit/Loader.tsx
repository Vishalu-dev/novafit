import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const SESSION_KEY = "novafit_intro_seen";
const TOTAL_MS = 2000;
const TAGLINE = "Strong Today. Stronger Tomorrow.";

const PARTICLE_COUNT = 18;

function StaticLoaderContent() {
  return (
    <div className="flex min-h-0 flex-col items-center justify-center gap-4">
      <div className="relative grid h-24 w-24 place-items-center md:h-28 md:w-28" aria-hidden>
        <p className="preloader-wordmark relative z-10 font-display text-lg font-black uppercase tracking-[0.35em] text-foreground opacity-0 md:text-xl">
          NOVA
          <span className="text-primary">FIT</span>
        </p>
        <span className="preloader-logo-glow pointer-events-none absolute inset-0 rounded-full opacity-0" aria-hidden />
      </div>
      <p className="preloader-tagline max-w-[16rem] text-center font-display text-[9px] font-semibold uppercase tracking-[0.38em] text-muted-foreground opacity-0 md:max-w-[18rem] md:text-[10px]">
        {TAGLINE}
      </p>
    </div>
  );
}

export default function Loader() {
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState<"black" | "form" | "pulse" | "tagline" | "exit">("black");

  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const radius = 52 + (i % 5) * 8;
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      return {
        id: i,
        delay: i * 0.03,
        x: Math.round(Math.cos(angle) * radius * 100) / 100,
        y: Math.round(Math.sin(angle) * radius * 100) / 100,
      };
    });
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setDone(true);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");

    if (reducedMotion) {
      const t = window.setTimeout(() => setDone(true), 600);
      return () => window.clearTimeout(t);
    }

    const t1 = window.setTimeout(() => setPhase("form"), 150);
    const t2 = window.setTimeout(() => setPhase("pulse"), 600);
    const t3 = window.setTimeout(() => setPhase("tagline"), 1100);
    const t4 = window.setTimeout(() => setPhase("exit"), 1750);
    const t5 = window.setTimeout(() => setDone(true), TOTAL_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
    };
  }, [mounted, reducedMotion]);

  return (
    <AnimatePresence mode="wait">
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="preloader-screen fixed inset-0 z-[100] flex items-center justify-center bg-black px-4"
          role="status"
          aria-live="polite"
          aria-label="Loading NOVAFIT"
        >
          {!mounted ? (
            <StaticLoaderContent />
          ) : (
            <div className="flex min-h-0 flex-col items-center justify-center gap-4">
              <div className="relative grid h-24 w-24 place-items-center md:h-28 md:w-28" aria-hidden>
                {particles.map((p) => (
                  <motion.span
                    key={p.id}
                    className="preloader-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-primary"
                    initial={{
                      opacity: 0,
                      x: p.x,
                      y: p.y,
                      scale: 0.2,
                    }}
                    animate={
                      phase === "black"
                        ? { opacity: 0, x: p.x, y: p.y, scale: 0.2 }
                        : {
                            opacity: [0, 1, 0.85],
                            x: 0,
                            y: 0,
                            scale: [0.2, 1, 0.6],
                          }
                    }
                    transition={{
                      duration: 0.55,
                      delay: p.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
                <motion.p
                  className="preloader-wordmark relative z-10 font-display text-lg font-black uppercase tracking-[0.35em] text-foreground md:text-xl"
                  initial={{ opacity: 0, filter: "blur(12px)" }}
                  animate={{
                    opacity: phase === "black" ? 0 : 1,
                    filter: phase === "black" ? "blur(12px)" : "blur(0px)",
                  }}
                  transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  NOVA
                  <span className="text-primary">FIT</span>
                </motion.p>
                <motion.span
                  className="preloader-logo-glow pointer-events-none absolute inset-0 rounded-full"
                  aria-hidden
                  animate={{
                    opacity: phase === "pulse" || phase === "tagline" || phase === "exit" ? [0.35, 0.7, 0.35] : 0,
                    scale: phase === "pulse" || phase === "tagline" || phase === "exit" ? [0.9, 1.08, 0.9] : 0.85,
                  }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                />
              </div>

              <motion.p
                className="preloader-tagline max-w-[16rem] text-center font-display text-[9px] font-semibold uppercase text-muted-foreground md:max-w-[18rem] md:text-[10px]"
                initial={{ opacity: 0, y: 8, letterSpacing: "0.52em", filter: "blur(4px)" }}
                animate={
                  phase === "tagline" || phase === "exit"
                    ? {
                        opacity: [0, 1, 1],
                        y: 0,
                        letterSpacing: ["0.52em", "0.38em", "0.42em"],
                        filter: ["blur(4px)", "blur(0px)", "blur(0px)"],
                        textShadow: [
                          "0 0 0px oklch(0.62 0.24 22 / 0)",
                          "0 0 24px oklch(0.62 0.24 22 / 0.55)",
                          "0 0 12px oklch(0.62 0.24 22 / 0.35)",
                        ],
                      }
                    : { opacity: 0, y: 8, letterSpacing: "0.52em", filter: "blur(4px)" }
                }
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              >
                {TAGLINE}
              </motion.p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
