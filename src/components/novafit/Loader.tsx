import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const SESSION_KEY = "novafit_intro_seen";
const TOTAL_MS = 1600;

const PARTICLE_COUNT = 18;

export default function Loader() {
  const reducedMotion = usePrefersReducedMotion();
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) === "1";
  });
  const [phase, setPhase] = useState<"black" | "form" | "pulse" | "tagline" | "exit">("black");

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        angle: (i / PARTICLE_COUNT) * Math.PI * 2,
        radius: 52 + (i % 5) * 8,
        delay: i * 0.03,
      })),
    [],
  );

  useEffect(() => {
    if (done) return;
    sessionStorage.setItem(SESSION_KEY, "1");

    if (reducedMotion) {
      const t = window.setTimeout(() => setDone(true), 400);
      return () => window.clearTimeout(t);
    }

    const t1 = window.setTimeout(() => setPhase("form"), 120);
    const t2 = window.setTimeout(() => setPhase("pulse"), 520);
    const t3 = window.setTimeout(() => setPhase("tagline"), 900);
    const t4 = window.setTimeout(() => setPhase("exit"), 1280);
    const t5 = window.setTimeout(() => setDone(true), TOTAL_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
    };
  }, [done, reducedMotion]);

  return (
    <AnimatePresence mode="wait">
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="preloader-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          role="status"
          aria-live="polite"
          aria-label="Loading NOVAFIT"
        >
          <div className="relative flex flex-col items-center">
            <div className="relative grid h-28 w-28 place-items-center md:h-32 md:w-32" aria-hidden>
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  className="preloader-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-primary"
                  initial={{
                    opacity: 0,
                    x: Math.cos(p.angle) * p.radius,
                    y: Math.sin(p.angle) * p.radius,
                    scale: 0.2,
                  }}
                  animate={
                    phase === "black"
                      ? { opacity: 0, x: Math.cos(p.angle) * p.radius, y: Math.sin(p.angle) * p.radius, scale: 0.2 }
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
                className="preloader-wordmark relative z-10 font-display text-xl font-black uppercase tracking-[0.35em] text-foreground md:text-2xl"
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
              className="preloader-tagline mt-8 max-w-[18rem] text-center font-display text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-foreground md:text-[11px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: phase === "tagline" || phase === "exit" ? 1 : 0,
                y: phase === "tagline" || phase === "exit" ? 0 : 10,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Forge Your Ultimate Physique
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
