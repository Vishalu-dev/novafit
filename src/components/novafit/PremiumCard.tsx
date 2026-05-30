import { memo, useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "a";
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

function PremiumCardComponent({
  children,
  className,
  as: Tag = "div",
  href,
  onClick,
  "aria-label": ariaLabel,
}: PremiumCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const resetTilt = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateZ(0)`;
    },
    [reducedMotion],
  );

  const shared = {
    ref: ref as React.Ref<HTMLDivElement>,
    onMouseMove: onMove,
    onMouseLeave: resetTilt,
    className: cn(
      "premium-card group relative will-change-transform",
      className,
    ),
  };

  const glow = (
    <span
      className="premium-card-glow pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden
    />
  );

  if (Tag === "a") {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} {...shared}>
        {children}
        {glow}
      </a>
    );
  }

  return (
    <Tag {...shared}>
      {children}
      {glow}
    </Tag>
  );
}

export const PremiumCard = memo(PremiumCardComponent);
