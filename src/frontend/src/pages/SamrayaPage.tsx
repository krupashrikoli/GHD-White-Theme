import { Link } from "@tanstack/react-router";
import {
  Crown,
  Gem,
  Heart,
  Sparkles,
  Star,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { StickyHomeSearchDock } from "../components/StickyHomeSearchDock";
import { useScrollAnimationAll } from "../hooks/useScrollAnimation";

const features = [
  {
    icon: Gem,
    label: "Bespoke Suites",
    description:
      "Private sanctuaries with layered lighting, bespoke furnishings, and views that restore perspective.",
  },
  {
    icon: UtensilsCrossed,
    label: "Culinary Artistry",
    description:
      "Immersive journeys curated by master chefs, reflecting destination culture and timeless technique.",
  },
  {
    icon: Sparkles,
    label: "Signature Spa Rituals",
    description:
      "Holistic sanctuaries rooted in ancient wisdom and modern science; experiences that cannot be replicated.",
  },
  {
    icon: Waves,
    label: "Iconic Pools & Landscapes",
    description:
      "Architecturally landmark infinity pools and settings that define the destination.",
  },
  {
    icon: Crown,
    label: "Grand Ballrooms & Events",
    description:
      "Opulent spaces for celebrations that feel once-in-a-lifetime and business that feels regal.",
  },
  {
    icon: Heart,
    label: "Destination Weddings",
    description:
      "Bespoke celebrations set in architectural masterpieces — unforgettable by design.",
  },
];

// Smooth opacity fade for philosophy text over fixed royal-lady background.
// Values are in "vh" terms and applied against the section's rect.top / rect.bottom.
const SAMRAYA_PHILOSOPHY_FADE = {
  // Fade in as section top moves from here -> here.
  fadeInStartVh: 0.9,
  fadeInEndVh: 0.1,
  // Fade out as section bottom moves from here -> here (negative = above viewport).
  fadeOutStartVh: 0.9,
  fadeOutEndVh: 0.1,
};

export function SamrayaPage() {
  useScrollAnimationAll();
  const heroWrapRef = useRef<HTMLDivElement | null>(null);
  const philosophyRef = useRef<HTMLElement | null>(null);
  const [philosophyFade, setPhilosophyFade] = useState(0);

  useEffect(() => {
    document.title = "Samrāya by GHD – Flagship Luxury";
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = philosophyRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const clamp = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, v));

      // Smooth enter/exit fade using rect.top/rect.bottom.
      const smoothstep01 = (t: number) => t * t * (3 - 2 * t);
      const fadeInStartPx = vh * SAMRAYA_PHILOSOPHY_FADE.fadeInStartVh;
      const fadeInEndPx = vh * SAMRAYA_PHILOSOPHY_FADE.fadeInEndVh;
      const fadeInT = clamp(
        (fadeInStartPx - rect.top) / (fadeInStartPx - fadeInEndPx),
        0,
        1,
      );

      const fadeOutStartPx = vh * SAMRAYA_PHILOSOPHY_FADE.fadeOutStartVh;
      const fadeOutEndPx = vh * SAMRAYA_PHILOSOPHY_FADE.fadeOutEndVh;
      const fadeOutT = clamp(
        (rect.bottom - fadeOutEndPx) / (fadeOutStartPx - fadeOutEndPx),
        0,
        1,
      );

      setPhilosophyFade(smoothstep01(fadeInT) * smoothstep01(fadeOutT));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="bg-cream-deep min-h-screen overflow-x-clip">
      <div ref={heroWrapRef}>
        <HeroSection
          bgImage="/assets/generated/hero-samraya.dim_1920x1080.png"
          screenReaderHeading="Samrāya"
          baseColor="black"
        />
      </div>
      <StickyHomeSearchDock boundaryRef={heroWrapRef} />

      <section
        aria-labelledby="samraya-page-title"
        className="border-b border-stone-200/70 bg-cream px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1
            id="samraya-page-title"
            className="font-display text-black"
            style={{
              fontFamily: "Instrument Serif, Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              letterSpacing: "0.03em",
              lineHeight: 1.08,
            }}
          >
            — Samrāya —
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
            A Realm of Refined Grandeur
          </p>
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="section-pad-compact relative z-0 bg-cream-deep">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-justify">
              <p
                className="eyebrow eyebrow--gold-emphasis animate-on-scroll"
              >
                The Flagship Brand
              </p>
              <div
                className="gold-divider gold-divider-left animate-on-scroll delay-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #b8975a, transparent)",
                }}
              />
              <h2
                className="section-subheading animate-on-scroll delay-200"
                style={{ marginBottom: "2.5rem" }}
              >
                A Quieter Power, Rooted in Heritage
              </h2>
              <div className="space-y-5 animate-on-scroll delay-300">
                <p className="body-refined-lg text-charcoal/70">
                  Luxury is not only about grandeur—it is about creating
                  experiences that carry meaning, heritage, and timeless
                  elegance. The name <strong>Samrāya</strong> is inspired by the
                  idea of sovereignty and sanctuary—a realm that reflects
                  dignity, balance, and quiet authority. Chosen for its cultural
                  depth and regal character, it embodies a vision of spaces
                  where guests are welcomed with the warmth and reverence
                  traditionally reserved for royalty.
                </p>
                <p className="body-refined-lg text-charcoal/70">
                  As the flagship five-star brand of GHD Hotels, Samrāya is
                  conceived as a luxury hospitality experience rooted in Indian
                  heritage. Drawing from the architectural elegance, cultural
                  richness, and royal traditions of historic Indian palaces, the
                  brand reinterprets these influences through contemporary
                  design and modern hospitality standards.
                </p>
                <p
                  className="font-display text-charcoal/90 italic"
                  style={{
                    fontFamily: "Instrument Serif, Georgia, serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.5,
                    marginTop: "0.75rem",
                  }}
                >
                  Samrāya — A Kingdom of Comfort. A Legacy of Luxury.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 lg:self-start lg:pt-12 animate-on-scroll-right delay-200">
              <div
                className="border border-gold/15 p-5 sm:p-8"
                style={{ borderColor: "rgba(184, 151, 90, 0.2)" }}
              >
                <p
                  className="eyebrow eyebrow--gold-emphasis mb-4 text-justify"
                >
                  The Samrāya Promise
                </p>
                <ul className="space-y-3">
                  {[
                    "Refined luxury — excellence in every detail",
                    "Grand design — heritage-inspired architecture with modern elegance",
                    "Intuitive service — personalized, discreet, and effortless",
                    "Living heritage — Indian culture expressed through experience, not display",
                    "Enduring excellence — world-class standards across every destination",
                  ].map((item) => {
                    const [bold, ...rest] = item.split(" — ");
                    const restText = rest.join(" — ");
                    return (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="w-5 h-px flex-shrink-0 mt-[0.65em]"
                          style={{ background: "#b8975a" }}
                        />
                        <span className="font-body text-base text-charcoal/70 min-w-0 flex-1 text-justify">
                          <strong className="text-charcoal/90 font-semibold">
                            {bold}
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

      {/* The Philosophy of Samrāya — fixed royal lady photo + scrim; light text (Nivaãra Buddha pattern) */}
      <section
        ref={philosophyRef}
        className="samraya-philosophy-section relative isolate z-10 flex w-full flex-col items-center justify-center bg-cream-deep px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10"
      >
        <div
          className="home-future-section relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-0"
          style={{ opacity: philosophyFade, willChange: "opacity" }}
        >
          <p className="eyebrow eyebrow--gold-emphasis animate-on-scroll">
            The Philosophy of Samrāya
          </p>
          <div
            className="gold-divider mx-auto animate-on-scroll delay-100"
            style={{
              background:
                "linear-gradient(90deg, transparent, #b8975a, transparent)",
            }}
          />
          <h2
            className="section-heading animate-on-scroll delay-200"
            style={{
              marginBottom: "1.5rem",
              WebkitTextStroke: "0.35px rgba(255, 255, 255, 0.2)",
            }}
          >
            Luxury with Purpose
          </h2>
          <div className="mx-auto max-w-3xl space-y-6 animate-on-scroll delay-300 text-center">
            <p className="body-refined-lg" style={{ fontWeight: 700 }}>
              At Samrāya, luxury is shaped by purpose, precision, and thoughtful
              hospitality.
            </p>
            <p className="body-refined-lg" style={{ fontWeight: 700 }}>
              Rooted in the timeless Indian principle of{" "}
              <em>Atithi Devo Bhava</em>— the guest is divine — Samrāya
              interprets India’s heritage through a contemporary lens, creating
              spaces where grandeur, dignity, and thoughtful service coexist in
              perfect harmony. As the flagship five-star brand of GHD Hotels,
              Samrāya is designed to deliver world-class luxury experiences
              while preserving the warmth and cultural depth of Indian
              hospitality.
            </p>
            <p className="body-refined-lg" style={{ fontWeight: 700 }}>
              Samrāya represents refined grandeur — not opulence for display, but
              excellence expressed through architecture, service, and
              meticulous attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Samrāya Offerings */}
      <section className="section-pad-compact relative z-10 bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <p
              className="eyebrow eyebrow--gold-emphasis animate-on-scroll"
            >
              Samrāya Offerings
            </p>
            <div
              className="gold-divider animate-on-scroll delay-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #b8975a, transparent)",
              }}
            />
            <h2 className="section-heading animate-on-scroll delay-200">
              The Samrāya Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="feature-item animate-on-scroll text-justify"
                  style={{
                    transitionDelay: `${0.05 + i * 0.1}s`,
                    borderColor: "rgba(184, 151, 90, 0.12)",
                  }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon size={18} style={{ color: "#b8975a" }} />
                  </div>
                  <div>
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
                      className="font-body text-base text-charcoal/70 leading-relaxed"
                      style={{
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
      <section className="py-10 sm:py-14 lg:py-16 bg-cream-deep">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
          <div
            className="p-6 sm:p-8 lg:p-12 animate-on-scroll"
            style={{ border: "1px solid rgba(184, 151, 90, 0.25)" }}
          >
            <div
              className="gold-divider"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #b8975a, transparent)",
              }}
            />
            <h3
              className="font-display text-xl sm:text-2xl mt-4 sm:mt-6 mb-3 sm:mb-4"
              style={{
                fontFamily: "Instrument Serif, Georgia, serif",
                fontWeight: 400,
                color: "#b8975a",
              }}
            >
              Coming Soon
            </h3>
            <p
              className="font-body text-charcoal/65 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8"
              style={{
                fontWeight: 300,
              }}
            >
              Samrāya hotels are currently under development at premier business
              and leisure destinations across India and beyond.
            </p>
            <Link
              to="/contact"
              className="btn-gold text-sm w-full sm:w-auto inline-block text-center"
              style={{ borderColor: "#b8975a", color: "#b8975a" }}
            >
              <span>Register Your Interest</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross Navigation */}
      <section className="border-t border-gold/10 bg-white py-10 sm:py-14 lg:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <p className="eyebrow mb-6 sm:mb-8 animate-on-scroll">
            Explore Our Portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center animate-on-scroll delay-200">
            <Link
              to="/celestra"
              className="btn-gold w-full sm:w-auto text-center"
              data-ocid="samraya.celestra.button"
            >
              <span>Explore Celéstra</span>
            </Link>
            <Link
              to="/nivaara"
              className="btn-gold w-full sm:w-auto text-center"
              data-ocid="samraya.nivaara.button"
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
