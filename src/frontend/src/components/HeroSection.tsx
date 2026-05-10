import type { CSSProperties, ReactNode } from "react";

interface HeroSectionProps {
  /** Background photo URL. Omit or leave empty for a neutral gradient until an asset is added. */
  bgImage?: string;
  /** Background video URL (e.g. mp4). When provided, it takes precedence over bgImage. */
  bgVideo?: string;
  /** Optional poster image for bgVideo (shown while video loads). */
  bgVideoPoster?: string;
  eyebrow?: string;
  /** Main visual heading; omit on home hero when only video + CTAs are desired */
  title?: ReactNode;
  /** When `title` is omitted, use for the document’s primary `<h1>` (screen readers only) */
  screenReaderHeading?: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  bottomNote?: ReactNode;
  /** `light` / `medium`: no overlay. `dark`: flat translucent scrim for contrast (no gradients). */
  overlay?: "light" | "medium" | "dark";
  titleClass?: string;
  titleStyle?: CSSProperties;
  /** Optional: blur the hero background image slightly (layout-only, not scroll-driven). */
  bgBlurPx?: number;
  /** Optional: dim/brighten the hero background image (layout-only, not scroll-driven).
   * 1 = unchanged, 0.85 = slightly dim.
   */
  bgBrightness?: number;
  /** Base color behind the hero image (section bg). Default charcoal (grey); use "black" for pure black. */
  baseColor?: "charcoal" | "black";
  /** Max width class for the inner content column (default max-w-5xl). */
  contentClassName?: string;
  /** Allow dropdowns (search bar) to extend past hero bottom; raises stacking above following sections */
  allowSearchOverflow?: boolean;
  /** White title + subtle outline for readability on photography heroes */
  titleOnPhoto?: boolean;
}

export function HeroSection({
  bgImage,
  bgVideo,
  bgVideoPoster,
  eyebrow,
  title,
  screenReaderHeading,
  subtitle,
  description,
  children,
  bottomNote,
  overlay = "light",
  titleClass = "",
  titleStyle,
  bgBlurPx = 0,
  bgBrightness = 1,
  baseColor = "charcoal",
  contentClassName = "max-w-5xl",
  allowSearchOverflow = false,
  titleOnPhoto = false,
}: HeroSectionProps) {
  const hasVisibleTitle =
    title != null &&
    title !== false &&
    (typeof title !== "string" || title.trim().length > 0);
  const hasPhoto = Boolean(bgImage?.trim());
  const hasVideo = Boolean(bgVideo?.trim());

  /** Flat scrim only — no gradients on the media layer */
  const darkScrim = overlay === "dark";

  return (
    <section
      className={`hero-section snap-section${baseColor === "black" ? " hero-section--black" : ""}${allowSearchOverflow ? " hero-section--search-visible" : ""}`}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              !hasVideo && hasPhoto
                ? `url(${bgImage})`
                : "linear-gradient(145deg, #fdfcfa 0%, #f4efe6 38%, #ebe4d6 72%, #e3dac9 100%)",
            filter: !hasVideo && hasPhoto
              ? (() => {
                  const parts: string[] = [];
                  if (bgBlurPx) parts.push(`blur(${bgBlurPx}px)`);
                  if (bgBrightness !== 1)
                    parts.push(`brightness(${bgBrightness})`);
                  return parts.length ? parts.join(" ") : undefined;
                })()
              : undefined,
          }}
        />
        {hasVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            style={{
              filter:
                bgBrightness !== 1 ? `brightness(${bgBrightness})` : undefined,
            }}
            src={bgVideo}
            poster={bgVideoPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden
          />
        )}
      </div>

      {darkScrim ? (
        <div
          className="pointer-events-none absolute inset-0 bg-black/22"
          aria-hidden
        />
      ) : null}

      {/* Content — no entrance motion on hero chrome */}
      <div
        className={`relative z-10 mx-auto w-full px-4 pt-3 text-center sm:px-6 sm:pt-6 md:pt-10 ${contentClassName}`}
      >
        {eyebrow && (
          <p
            className={`eyebrow mb-7${titleOnPhoto ? " hero-eyebrow-photo" : ""}`}
          >
            {eyebrow}
          </p>
        )}

        {(eyebrow || hasVisibleTitle) && (
          <div className="gold-divider mb-10" />
        )}

        {hasVisibleTitle ? (
          <h1
            className={`font-display ${titleOnPhoto ? "hero-title-photo" : "text-charcoal"} ${titleClass}`}
            style={{
              fontFamily: "Instrument Serif, Georgia, serif",
              fontSize: "clamp(3rem, 7.5vw, 7rem)",
              fontWeight: 500,
              letterSpacing: "0.03em",
              lineHeight: 1.02,
              marginBottom: "2rem",
              ...(titleOnPhoto
                ? {
                    color: "#fafaf9",
                    WebkitTextStroke: "0.65px rgba(87, 83, 78, 0.95)",
                    paintOrder: "stroke fill",
                    textShadow:
                      "0 1px 2px rgba(0, 0, 0, 0.42), 0 2px 14px rgba(0, 0, 0, 0.28), 0 0 1px rgba(0, 0, 0, 0.35)",
                  }
                : {}),
              ...titleStyle,
            }}
          >
            {title}
          </h1>
        ) : (
          screenReaderHeading && (
            <h1 className="sr-only">{screenReaderHeading}</h1>
          )
        )}

        {subtitle && (
          <p
            className="eyebrow text-gold-light mb-8"
            style={{
              letterSpacing: "0.4em",
            }}
          >
            {subtitle}
          </p>
        )}

        {description && (
          <p
            className="font-body mx-auto mb-8 max-w-xl text-charcoal/60 sm:mb-12"
            style={{
              fontFamily: "General Sans, Helvetica Neue, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(1.125rem, 2.4vw, 1.2rem)",
              lineHeight: 1.9,
              letterSpacing: "0.01em",
            }}
          >
            {description}
          </p>
        )}

        {children && (
          <div
            className={
              hasVisibleTitle ? "mt-16 sm:mt-24" : "mt-6 sm:mt-10"
            }
          >
            {children}
          </div>
        )}
      </div>

      {bottomNote && (
        <div className="absolute bottom-2 left-4 z-10 max-w-[92%] sm:bottom-3 sm:left-6 sm:max-w-[80%] md:bottom-4 md:left-10">
          {bottomNote}
        </div>
      )}
    </section>
  );
}
