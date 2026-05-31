import { memo } from "react";
import { cn } from "@/lib/utils";

type FlowVariant =
  | "hero-down"
  | "programs-transformation"
  | "transformation-down"
  | "testimonials-cta";

const VARIANTS: Record<FlowVariant, string> = {
  "hero-down":
    "h-24 md:h-32 bg-gradient-to-b from-transparent via-background/40 to-background",
  "programs-transformation":
    "h-20 md:h-28 bg-gradient-to-b from-background via-background/90 to-background",
  "transformation-down":
    "h-20 md:h-28 bg-gradient-to-b from-transparent via-background/50 to-background",
  "testimonials-cta":
    "h-28 md:h-36 bg-gradient-to-b from-background via-background/85 to-background",
};

type SectionFlowTransitionProps = {
  variant: FlowVariant;
  className?: string;
};

function SectionFlowTransitionComponent({ variant, className }: SectionFlowTransitionProps) {
  return (
    <div
      className={cn("section-flow-transition pointer-events-none relative z-[2] -my-px w-full", VARIANTS[variant], className)}
      aria-hidden
    >
      <div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-x-[12%] top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-[1px]"
        aria-hidden
      />
    </div>
  );
}

export const SectionFlowTransition = memo(SectionFlowTransitionComponent);
