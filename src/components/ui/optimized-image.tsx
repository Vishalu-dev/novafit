import { memo, useEffect, useState, type ImgHTMLAttributes } from "react";
import { IMAGE_PLACEHOLDER } from "@/assets/images/placeholder";
import { resolveImageSrc } from "@/lib/resolve-image-src";
import { cn } from "@/lib/utils";

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { default: string };
  /** Fill a position:relative parent (recommended for cards) */
  fill?: boolean;
  /** Set false for LCP / above-the-fold images */
  lazy?: boolean;
  /** Unified cinematic color grade for photos */
  cinematic?: boolean;
};

function OptimizedImageComponent({
  src,
  alt,
  className,
  fill = false,
  lazy = true,
  cinematic = false,
  width,
  height,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const resolved = resolveImageSrc(src);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    resolved ? "loading" : "error",
  );

  useEffect(() => {
    setStatus(resolved ? "loading" : "error");
  }, [resolved]);

  const displaySrc = status === "error" || !resolved ? IMAGE_PLACEHOLDER : resolved;
  const showSkeleton = status === "loading" && fill;

  const img = (
    <img
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      fetchPriority={lazy ? "auto" : "high"}
      className={cn(
        "transition-opacity duration-300",
        fill && "absolute inset-0 h-full w-full object-cover",
        cinematic && "cinematic-img",
        status === "loading" && !fill && "opacity-0",
        (status === "loaded" || status === "error") && "opacity-100",
        className,
      )}
      onLoad={(e) => {
        setStatus("loaded");
        onLoad?.(e);
      }}
      onError={(e) => {
        setStatus("error");
        onError?.(e);
      }}
      {...props}
    />
  );

  if (fill) {
    return (
      <span className="relative block h-full w-full overflow-hidden bg-surface">
        {showSkeleton && (
          <span className="absolute inset-0 animate-pulse bg-muted/25" aria-hidden />
        )}
        {img}
      </span>
    );
  }

  return img;
}

export const OptimizedImage = memo(OptimizedImageComponent);
