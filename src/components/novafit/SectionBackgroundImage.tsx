import { memo } from "react";
import { motion, type MotionValue } from "framer-motion";
import { resolveImageSrc } from "@/lib/resolve-image-src";
import { cn } from "@/lib/utils";

type ImageImport = string | { default: string };

export type SectionOverlayMode = "default" | "transformation" | "cta" | "minimal";

type SectionBackgroundImageProps = {
  src: ImageImport;
  /** Image layer opacity (0–1). Overlays are separate. */
  imageOpacity?: number;
  /** Legacy: blurs the photo. Prefer `overlayMode` without blur for cinematic sections. */
  blur?: boolean;
  priority?: boolean;
  parallaxY?: MotionValue<number>;
  overlayClassName?: string;
  /** Cinematic overlay stacks — lighter gradients so the photo reads clearly. */
  overlayMode?: SectionOverlayMode;
  className?: string;
};

function CinematicOverlays({ mode }: { mode: SectionOverlayMode }) {
  if (mode === "minimal") return null;

  if (mode === "transformation") {
    return (
      <>
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)]" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,oklch(0.62_0.24_22/0.28),transparent_72%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_42%,oklch(0.08_0.02_20/0.75)_100%)]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden />
      </>
    );
  }

  if (mode === "cta") {
    return (
      <>
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.48)]" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-br from-background/55 via-background/25 to-background/65"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_30%_50%,oklch(0.62_0.24_22/0.22),transparent_65%)]"
          aria-hidden
        />
      </>
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-b from-background/80 via-background/65 to-background",
      )}
      aria-hidden
    />
  );
}

function SectionBackgroundImageComponent({
  src,
  imageOpacity = 1,
  blur = false,
  priority = false,
  parallaxY,
  overlayClassName,
  overlayMode = "default",
  className,
}: SectionBackgroundImageProps) {
  const url = resolveImageSrc(src);
  if (!url) return null;

  const useDefaultGradient = overlayMode === "default";

  const layer = (
    <>
      <img
        src={url}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center",
          blur && "scale-[1.03] blur-[2px] md:blur-sm",
        )}
        style={{ opacity: imageOpacity }}
      />
      {useDefaultGradient && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-background/80 via-background/65 to-background",
            overlayClassName,
          )}
        />
      )}
      <CinematicOverlays mode={overlayMode} />
      {!useDefaultGradient && overlayClassName && (
        <div className={cn("absolute inset-0", overlayClassName)} aria-hidden />
      )}
    </>
  );

  return (
    <div className={cn("absolute inset-0 z-0 min-h-full overflow-hidden", className)} aria-hidden>
      {parallaxY ? (
        <motion.div className="absolute inset-0 min-h-full w-full will-change-transform" style={{ y: parallaxY }}>
          {layer}
        </motion.div>
      ) : (
        <div className="absolute inset-0 min-h-full w-full">{layer}</div>
      )}
    </div>
  );
}

export const SectionBackgroundImage = memo(SectionBackgroundImageComponent);
