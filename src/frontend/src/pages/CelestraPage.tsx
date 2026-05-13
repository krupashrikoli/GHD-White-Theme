import { Link } from "@tanstack/react-router";
import {
  Armchair,
  BedDouble,
  Briefcase,
  CalendarDays,
  Coffee,
  Dumbbell,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { StickyHomeSearchDock } from "../components/StickyHomeSearchDock";
import { useScrollAnimationAll } from "../hooks/useScrollAnimation";

const features = [
  {
    icon: BedDouble,
    label: "Modern Rooms & Suites",
    description:
      "Thoughtfully designed rooms with premium fixtures, luxurious bedding, and sophisticated finishes.",
  },
  {
    icon: Coffee,
    label: "All Day Dining Restaurant",
    description:
      "Vibrant all-day dining with international and regional cuisines served in a contemporary setting.",
  },
  {
    icon: Briefcase,
    label: "Business Meeting Spaces",
    description:
      "State-of-the-art meeting rooms and boardrooms equipped with modern technology.",
  },
  {
    icon: Armchair,
    label: "Premium Lounge",
    description:
      "Exclusive lounge areas for relaxation, networking, and informal business conversations.",
  },
  {
    icon: Dumbbell,
    label: "Fitness Center",
    description:
      "Fully equipped, modern fitness facilities with professional equipment and wellness programs.",
  },
  {
    icon: CalendarDays,
    label: "Event Spaces",
    description:
      "Flexible, elegantly designed spaces for corporate events, social gatherings, and private celebrations.",
  },
];

/** Fixed philosophy background — resort pathway photo. */
const CELESTRA_PHILOSOPHY_BACKGROUND = "/assets/generated/pathway.png";

/** Content fade over fixed pathway background (same timing idea as Nivaãra philosophy). */
const CELESTRA_PHILOSOPHY_CONTENT_FADE = {
  fadeInStartVh: 0.9,
  fadeInEndVh: 0.1,
  fadeOutStartVh: 0.8,
  fadeOutEndVh: 0.3,
};

export function CelestraPage() {
  useScrollAnimationAll();
  const heroWrapRef = useRef<HTMLDivElement | null>(null);
  const philosophyRef = useRef<HTMLElement | null>(null);
  const [philosophyContentFade, setPhilosophyContentFade] = useState(0);

  useEffect(() => {
    document.title = "Celéstra by GHD – Premium Hospitality";
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = philosophyRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const clamp = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, v));
      const smoothstep01 = (t: number) => t * t * (3 - 2 * t);

      const fadeInStartPx = vh * CELESTRA_PHILOSOPHY_CONTENT_FADE.fadeInStartVh;
      const fadeInEndPx = vh * CELESTRA_PHILOSOPHY_CONTENT_FADE.fadeInEndVh;
      const fadeInT = clamp(
        (fadeInStartPx - rect.top) / (fadeInStartPx - fadeInEndPx),
        0,
        1,
      );

      const fadeOutStartPx =
        vh * CELESTRA_PHILOSOPHY_CONTENT_FADE.fadeOutStartVh;
      const fadeOutEndPx = vh * CELESTRA_PHILOSOPHY_CONTENT_FADE.fadeOutEndVh;
      const fadeOutT = clamp(
        (rect.bottom - fadeOutEndPx) / (fadeOutStartPx - fadeOutEndPx),
        0,
        1,
      );

      setPhilosophyContentFade(
        smoothstep01(fadeInT) * smoothstep01(fadeOutT),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-cream min-h-screen celestra-test-font">
      <div ref={heroWrapRef}>
        <HeroSection
          bgImage="/assets/generated/hero-celestra.dim_1920x1080.png"
          screenReaderHeading="Celéstra"
          baseColor="black"
        />
      </div>
      <StickyHomeSearchDock boundaryRef={heroWrapRef} />

      <section
        aria-labelledby="celestra-page-title"
        className="relative isolate overflow-hidden border-b border-stone-200/70 bg-cream-deep px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-center bg-cover opacity-20"
          style={{ backgroundImage: "url(/assets/generated/pattern.png)" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            id="celestra-page-title"
            className="font-display text-black"
            style={{
              fontFamily: "Instrument Serif, Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              letterSpacing: "0.03em",
              lineHeight: 1.08,
            }}
          >
            — Celéstra —
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-black sm:mt-8"
            style={{
              fontFamily:
                '"Zapfino", "Snell Roundhand", "Apple Chancery", "Segoe Script", "Brush Script MT", cursive',
              fontSize: "clamp(1.05rem, 2.2vw, 1.85rem)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 1.45,
            }}
          >
            Where Earth Meets the Extraordinary
          </p>
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="section-pad-compact bg-white border-t border-stone-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="eyebrow eyebrow--gold-emphasis animate-on-scroll">
                The Premium Brand
              </p>
              <div className="gold-divider gold-divider-left animate-on-scroll delay-100" />
              <h2
                className="section-subheading animate-on-scroll delay-200 text-justify"
                style={{ marginBottom: "1.5rem" }}
              >
                A Celestial Expression of Refined Hospitality
              </h2>
              <div className="space-y-5 animate-on-scroll delay-300 text-justify">
                <p className="body-refined-lg text-charcoal/70">
                  In a world where travel experiences are often routine,
                  Celéstra was envisioned as something brighter — a celestial
                  expression of refined hospitality. The name Celéstra is
                  inspired by celestial, symbolizing light, elevation, and
                  effortless grace.
                </p>
                <p className="body-refined-lg text-charcoal/70">
                  As a 4-star hospitality brand, Celéstra blends comfort, style,
                  and sophistication to create experiences that feel both
                  uplifting and welcoming. Every Celéstra property is crafted to
                  reflect its surroundings while maintaining a distinctive
                  identity — whether overlooking serene coastlines, set within
                  vibrant cities, or located in emerging travel destinations.
                  Each hotel is designed to provide guests with a sense of calm,
                  balance, and modern luxury.
                </p>

                <p
                  className="font-display text-charcoal/90 italic mt-3 text-justify"
                  style={{
                    fontFamily: "Instrument Serif, Georgia, serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.5,
                  }}
                >
                  Celéstra by GHD Hotels — Where Comfort Meets Celestial
                  Elegance.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 lg:self-start lg:pt-12 animate-on-scroll-right delay-200">
              <div className="border border-gold/20 p-5 sm:p-8">
                <p className="eyebrow eyebrow--gold-emphasis mb-4 text-justify">
                  The Celéstra Promise
                </p>
                <ul className="space-y-3">
                  {[
                    "Elevated comfort — refined stays designed for modern travelers",
                    "Contemporary design — elegant spaces inspired by light and openness",
                    "Attentive service — warm, thoughtful hospitality that feels effortless",
                    "Local connection — experiences that reflect the spirit of each destination",
                    "Trusted excellence — consistent quality and comfort across every stay",
                  ].map((item) => {
                    const [label, ...rest] = item.split(" — ");
                    const restText = rest.join(" — ");
                    return (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-5 h-px bg-gold flex-shrink-0 mt-[0.65em]" />
                        <span
                          className="font-body text-base text-charcoal/70 min-w-0 flex-1 text-justify"
                          style={{
                            fontFamily:
                              "General Sans, Helvetica Neue, sans-serif",
                            fontWeight: 300,
                          }}
                        >
                          <strong className="text-charcoal/90 font-semibold">
                            {label}
                          </strong>
                          {restText ? ` — ${restText}` : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Philosophy of Celéstra — fixed pathway photo + scrim; light text (Nivaãra Buddha pattern) */}
      <section
        ref={philosophyRef}
        className="celestra-philosophy-section relative isolate flex w-full flex-col items-center justify-center bg-cream-deep px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10"
        style={
          {
            "--celestra-philosophy-bg": `url("${CELESTRA_PHILOSOPHY_BACKGROUND}")`,
          } as CSSProperties
        }
      >
        <div
          className="home-future-section relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-0"
          style={{
            opacity: philosophyContentFade,
            willChange: "opacity",
          }}
        >
          <p className="eyebrow eyebrow--gold-emphasis animate-on-scroll">
            The Philosophy of Celéstra
          </p>
          <div className="gold-divider mx-auto animate-on-scroll delay-100" />
          <h2
            className="section-heading animate-on-scroll delay-200"
            style={{
              marginBottom: "1.5rem",
              WebkitTextStroke: "0.35px rgba(255, 255, 255, 0.2)",
            }}
          >
            Designed for ease, crafted for memorable stays
          </h2>
          <div className="mx-auto max-w-3xl space-y-6 animate-on-scroll delay-300 text-center">
            <p className="body-refined-lg" style={{ fontWeight: 700 }}>
              True hospitality is not displayed; it is experienced — felt
              quietly and remembered naturally. A hotel should never overwhelm
              the traveler, but instead welcome them with ease and intention.
            </p>
            <p className="body-refined-lg" style={{ fontWeight: 700 }}>
              At Celéstra, this belief shapes every detail, where balanced
              design, warm service, and a deep sense of place come together to
              create environments in which journeys slow down and moments become
              meaningful.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid (Celéstra Offerings) */}
      <section className="section-pad-compact bg-cream border-t border-stone-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-0">
          <div className="text-center mb-12 sm:mb-20">
            <p className="eyebrow eyebrow--gold-emphasis animate-on-scroll">
              Celéstra Offerings
            </p>
            <div className="gold-divider animate-on-scroll delay-100" />
            <h2 className="section-heading animate-on-scroll delay-200">
              The Celéstra Experience
            </h2>
            <p className="body-refined-lg text-charcoal/70 mt-4 max-w-xl mx-auto animate-on-scroll delay-300">
              Every detail intentional. Every space a story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="feature-item animate-on-scroll"
                  style={{ transitionDelay: `${0.05 + i * 0.08}s` }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div className="min-w-0 text-justify">
                    <h3
                      className="font-display text-charcoal text-base mb-2"
                      style={{
                        fontFamily: "Instrument Serif, Georgia, serif",
                        fontWeight: 400,
                      }}
                    >
                      {feature.label}
                    </h3>
                    <p
                      className="font-body text-sm text-charcoal/60 leading-relaxed"
                      style={{
                        fontFamily: "General Sans, Helvetica Neue, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Under Development Banner */}
      <section className="py-16 bg-white border-t border-stone-200/50">
        <div className="max-w-3xl mx-auto text-center px-6">
          <div className="border border-gold/25 p-12 animate-on-scroll">
            <div className="gold-divider" />
            <h3
              className="font-display text-gold text-2xl mt-6 mb-4"
              style={{
                fontFamily: "Instrument Serif, Georgia, serif",
                fontWeight: 400,
              }}
            >
              Coming Soon
            </h3>
            <p
              className="font-body text-charcoal/65 text-base leading-relaxed mb-8"
              style={{
                fontFamily: "General Sans, Helvetica Neue, sans-serif",
                fontWeight: 300,
              }}
            >
              Celéstra properties are currently under development at carefully
              selected destinations. The finest experiences require the finest
              preparation.
            </p>
            <Link to="/contact" className="btn-gold text-sm">
              <span>Register Your Interest</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross Navigation */}
      <section className="border-t border-gold/10 bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="eyebrow mb-8 animate-on-scroll">
            Explore Our Portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll delay-200">
            <Link
              to="/samraya"
              className="btn-gold"
              data-ocid="celestra.samraya.button"
            >
              <span>Explore Samrāya</span>
            </Link>
            <Link
              to="/nivaara"
              className="btn-gold"
              data-ocid="celestra.nivaara.button"
            >
              <span>Explore Nivaãra</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
