import { IMAGE_PLACEHOLDER } from "@/assets/images/placeholder";

type ImageImport = string | { default: string } | undefined | null;

/** Normalize Vite/static image imports to a URL string safe for &lt;img src&gt; */
export function resolveImageSrc(src: ImageImport): string {
  if (src == null || src === "") return "";
  if (typeof src === "string") return src;
  if (typeof src === "object" && "default" in src && typeof src.default === "string") {
    return src.default;
  }
  return String(src);
}

export function imageSrcOrPlaceholder(src: ImageImport): string {
  const resolved = resolveImageSrc(src);
  return resolved || IMAGE_PLACEHOLDER;
}
