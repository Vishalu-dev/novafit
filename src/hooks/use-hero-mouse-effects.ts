import { useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const LERP = 0.1;
const MAX_PARALLAX_PX = 10;

type HeroMouseEffectsOptions = {
  enabled?: boolean;
};

/** rAF-smoothed cursor glow (--x/--y) and subtle bg parallax (max 10px). */
export function useHeroMouseEffects(
  sectionRef: RefObject<HTMLElement | null>,
  glowRef: RefObject<HTMLElement | null>,
  parallaxRef: RefObject<HTMLElement | null>,
  { enabled = true }: HeroMouseEffectsOptions = {},
) {
  const reducedMotion = usePrefersReducedMotion();
  const target = useRef({ x: 50, y: 50, px: 0, py: 0 });
  const current = useRef({ x: 50, y: 50, px: 0, py: 0 });
  const rafId = useRef(0);

  useEffect(() => {
    if (!enabled || reducedMotion) return;
    const section = sectionRef.current;
    const glow = glowRef.current;
    const parallax = parallaxRef.current;
    if (!section || !glow) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 100;
      const ny = ((e.clientY - rect.top) / rect.height) * 100;
      target.current.x = Math.min(100, Math.max(0, nx));
      target.current.y = Math.min(100, Math.max(0, ny));
      target.current.px = ((e.clientX - rect.left) / rect.width - 0.5) * MAX_PARALLAX_PX * 2;
      target.current.py = ((e.clientY - rect.top) / rect.height - 0.5) * MAX_PARALLAX_PX * 2;
    };

    const onLeave = () => {
      target.current = { x: 50, y: 50, px: 0, py: 0 };
    };

    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * LERP;
      c.y += (t.y - c.y) * LERP;
      c.px += (t.px - c.px) * LERP;
      c.py += (t.py - c.py) * LERP;
      glow.style.setProperty("--x", `${c.x}%`);
      glow.style.setProperty("--y", `${c.y}%`);
      if (parallax) {
        parallax.style.transform = `translate3d(${c.px}px, ${c.py}px, 0) scale(1.05)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
      glow.style.removeProperty("--x");
      glow.style.removeProperty("--y");
      if (parallax) parallax.style.removeProperty("transform");
    };
  }, [enabled, reducedMotion, sectionRef, glowRef, parallaxRef]);
}
