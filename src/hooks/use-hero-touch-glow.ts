import { useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const LERP = 0.14;

/** Mobile touch ambient glow for hero (lighter than desktop mouse parallax). */
export function useHeroTouchGlow(
  sectionRef: RefObject<HTMLElement | null>,
  glowRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const reducedMotion = usePrefersReducedMotion();
  const target = useRef({ x: 50, y: 50 });
  const current = useRef({ x: 50, y: 50 });
  const rafId = useRef(0);

  useEffect(() => {
    if (!enabled || reducedMotion) return;
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const setFromTouch = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      target.current.x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      target.current.y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
    };

    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      setFromTouch(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onEnd = () => {
      target.current = { x: 50, y: 50 };
    };

    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * LERP;
      c.y += (t.y - c.y) * LERP;
      glow.style.setProperty("--x", `${c.x}%`);
      glow.style.setProperty("--y", `${c.y}%`);
      rafId.current = requestAnimationFrame(tick);
    };

    section.addEventListener("touchstart", onTouch, { passive: true });
    section.addEventListener("touchmove", onTouch, { passive: true });
    section.addEventListener("touchend", onEnd);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("touchstart", onTouch);
      section.removeEventListener("touchmove", onTouch);
      section.removeEventListener("touchend", onEnd);
      cancelAnimationFrame(rafId.current);
      glow.style.removeProperty("--x");
      glow.style.removeProperty("--y");
    };
  }, [enabled, reducedMotion, sectionRef, glowRef]);
}
