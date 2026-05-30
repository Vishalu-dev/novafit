import { useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const LERP = 0.12;

type Options = {
  enabled?: boolean;
  /** Desktop mouse tracking */
  mouse?: boolean;
  /** Mobile touch ambient */
  touch?: boolean;
};

/** Cursor / touch reactive ambient glow via --gx / --gy (percent). */
export function useSectionInteractionGlow(
  sectionRef: RefObject<HTMLElement | null>,
  glowRef: RefObject<HTMLElement | null>,
  { enabled = true, mouse = true, touch = true }: Options = {},
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

    const setFromPoint = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      target.current.x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      target.current.y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
    };

    const onMove = (e: MouseEvent) => {
      if (!mouse) return;
      setFromPoint(e.clientX, e.clientY);
    };

    const onTouch = (e: TouchEvent) => {
      if (!touch || !e.touches[0]) return;
      setFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onLeave = () => {
      target.current = { x: 50, y: 50 };
    };

    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * LERP;
      c.y += (t.y - c.y) * LERP;
      glow.style.setProperty("--gx", `${c.x}%`);
      glow.style.setProperty("--gy", `${c.y}%`);
      rafId.current = requestAnimationFrame(tick);
    };

    if (mouse) {
      section.addEventListener("mousemove", onMove);
      section.addEventListener("mouseleave", onLeave);
    }
    if (touch) {
      section.addEventListener("touchstart", onTouch, { passive: true });
      section.addEventListener("touchmove", onTouch, { passive: true });
    }
    rafId.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      section.removeEventListener("touchstart", onTouch);
      section.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(rafId.current);
      glow.style.removeProperty("--gx");
      glow.style.removeProperty("--gy");
    };
  }, [enabled, reducedMotion, mouse, touch, sectionRef, glowRef]);
}
