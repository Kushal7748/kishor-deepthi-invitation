import { cn } from "../../lib/cn";
import type { ImageAsset } from "../../config/invitation";

interface ImagePlaceholderProps {
  image: ImageAsset | null;
  /** Shown inside the placeholder so it's obvious what belongs here during development */
  label: string;
  className?: string;
}

/**
 * Renders a real <img> once `image` is populated in the config (Phase 6).
 * Until then, shows a soft, clearly-labeled placeholder rather than a
 * broken image icon or blank space — this is a graceful fallback, not
 * a final visual.
 */
export function ImagePlaceholder({ image, label, className }: ImagePlaceholderProps) {
  if (image) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className={cn("h-full w-full object-cover", className)}
        style={{ objectPosition: image.focalPoint ?? "center" }}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 bg-champagne text-taupe",
        className
      )}
      role="img"
      aria-label={`${label} — photograph pending`}
    >
      <div className="h-8 w-8 rounded-full border border-taupe/40" />
      <p className="eyebrow !text-taupe/70">{label}</p>
    </div>
  );
}
