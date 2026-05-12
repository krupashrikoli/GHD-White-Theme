import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Clock, Laptop, Moon, Tv2, Utensils, Wifi } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { StickyHomeSearchDock } from "../components/StickyHomeSearchDock";
import { useScrollAnimationAll } from "../hooks/useScrollAnimation";

const features = [
  {
    icon: Tv2,
    label: "Smart Rooms",
    description:
      "Technology-integrated rooms with smart controls for lighting, temperature, and entertainment.",
  },
  {
    icon: Wifi,
    label: "High Speed WiFi",
    description:
      "High-bandwidth connectivity throughout the property ensuring seamless work and leisure experiences.",
  },
  {
    icon: Moon,
    label: "Comfortable Bedding",
    description:
      "Premium quality bedding with carefully selected mattresses ensuring a restful, restorative sleep.",
  },
  {
    icon: Utensils,
    label: "Compact Dining",
    description:
      "Efficient all-day dining with wholesome, quality meals and a curated selection of beverages.",
  },
  {
    icon: Laptop,
    label: "Business Friendly Facilities",
    description:
      "Dedicated work areas, printing facilities, and meeting spaces for business travelers.",
  },
  {
    icon: Clock,
    label: "24 Hour Reception",
    description:
      "Round-the-clock front desk service ensuring assistance and support at every hour.",
  },
];

export function NivaaraPage() {
  useScrollAnimationAll();
  const heroWrapRef = useRef<HTMLDivElement | null>(null);
  const philosophyRef = useRef<HTMLElement | null>(null);
  const [philosophyBgOpacity, setPhilosophyBgOpacity] = useState(0);
  const [propertiesImageIndex, setPropertiesImageIndex] = useState(0);
  const [propertiesCarouselPaused, setPropertiesCarouselPaused] = useState(false);
  const [propertiesFading, setPropertiesFading] = useState(false);
  const propertiesFadeTimerRef = useRef<number | null>(null);

  const PROPERTIES_IMAGES = Array.from(
    { length: 6 },
    () => "/assets/generated/hero-nivaara.dim_1920x1080.png",
  );
  const PROPERTIES_AUTO_ADVANCE_MS = 3000;
  const PROPERTIES_FADE_MS = 260;

  const requestPropertiesIndex = (nextIndex: number) => {
    const total = PROPERTIES_IMAGES.length;
    const next = ((nextIndex % total) + total) % total;
    if (next === propertiesImageIndex) return;

    if (propertiesFadeTimerRef.current) {
      window.clearTimeout(propertiesFadeTimerRef.current);
      propertiesFadeTimerRef.current = null;
    }

    setPropertiesFading(true);
    propertiesFadeTimerRef.current = window.setTimeout(() => {
      setPropertiesImageIndex(next);
      setPropertiesFading(false);
      propertiesFadeTimerRef.current = null;
    }, PROPERTIES_FADE_MS);
  };

  // Smooth opacity fade when entering/leaving Philosophy.
  // Uses rect.top/rect.bottom so it naturally fades as the section transitions into/out of view.
  const NIVAA_PHILOSOPHY_FADE = {
    fadeInStartVh: 0.9,
    fadeInEndVh: 0.1,
    fadeOutStartVh: 0.8,
    fadeOutEndVh: 0.3,
  };

  useEffect(() => {
    document.title = "Nivaãra by GHD – Smart Comfort";
  }, []);

  useEffect(() => {
    if (propertiesCarouselPaused) return;
    const id = window.setInterval(() => {
      requestPropertiesIndex(propertiesImageIndex + 1);
    }, PROPERTIES_AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [
    propertiesCarouselPaused,
    PROPERTIES_AUTO_ADVANCE_MS,
    PROPERTIES_IMAGES.length,
    propertiesImageIndex,
  ]);

  useEffect(() => {
    return () => {
      if (propertiesFadeTimerRef.current) {
        window.clearTimeout(propertiesFadeTimerRef.current);
        propertiesFadeTimerRef.current = null;
      }
    };
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

      // Fade timing: fade in when entering the section, fade out as the section scrolls away
      // (into the next content area). No transform/parallax changes here.
      const fadeInStartPx = vh * NIVAA_PHILOSOPHY_FADE.fadeInStartVh;
      const fadeInEndPx = vh * NIVAA_PHILOSOPHY_FADE.fadeInEndVh;
      const fadeInT = clamp(
        (fadeInStartPx - rect.top) / (fadeInStartPx - fadeInEndPx),
        0,
        1,
      );

      const fadeOutStartPx = vh * NIVAA_PHILOSOPHY_FADE.fadeOutStartVh;
      const fadeOutEndPx = vh * NIVAA_PHILOSOPHY_FADE.fadeOutEndVh;
      const fadeOutT = clamp(
        (rect.bottom - fadeOutEndPx) / (fadeOutStartPx - fadeOutEndPx),
        0,
        1,
      );

      const opacity = smoothstep01(fadeInT) * smoothstep01(fadeOutT);
      setPhilosophyBgOpacity(opacity);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-cream min-h-screen nivaara-test-font">
      <div ref={heroWrapRef}>
        <HeroSection
          bgImage="/assets/generated/hero-nivaara.dim_1920x1080.png"
          screenReaderHeading="Nivaãra"
          baseColor="black"
        />
      </div>
      <StickyHomeSearchDock boundaryRef={heroWrapRef} />

      <section
        aria-labelledby="nivaara-page-title"
        className="border-b border-stone-200/70 bg-cream-deep px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1
            id="nivaara-page-title"
            className="font-display text-black"
            style={{
              fontFamily: "Instrument Serif, Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              letterSpacing: "0.03em",
              lineHeight: 1.08,
            }}
          >
            — Nivaãra —
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
            Luxury in Motion
          </p>
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="section-pad-compact bg-white border-t border-stone-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center">
            <div className="lg:col-span-7">
              <p
                className="eyebrow eyebrow--gold-emphasis animate-on-scroll"
              >
                The Smart Comfort Brand
              </p>
              <div
                className="gold-divider gold-divider-left animate-on-scroll delay-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #b8975a, transparent)",
                }}
              />
              <h2
                className="section-subheading animate-on-scroll delay-200 text-justify"
                style={{ marginBottom: "2.5rem" }}
              >
                Where Urban Energy Finds Balance
              </h2>
              <div className="space-y-5 animate-on-scroll delay-300 text-justify">
                <p className="body-refined-lg text-charcoal/70">
                  In the rhythm of modern cities, time moves quickly. Meetings
                  begin early. Flights depart late. Opportunities appear without
                  warning. Nivaãra was created for those who live within this
                  momentum.
                </p>
                <p className="body-refined-lg text-charcoal/70">
                  Derived from the idea of shelter and restoration, Nivaãra
                  offers travelers a place where the energy of the city meets
                  the comfort of thoughtful hospitality. It is not a retreat
                  away from movement—it is a sanctuary designed to support it.
                </p>
                <p className="body-refined-lg text-charcoal/70">
                  Every stay at Nivaãra is intentionally calm and quietly
                  serene. From muted palettes to gentle lighting and
                  acoustically softened rooms, the experience feels
                  peaceful—even when the city outside is moving fast.
                </p>
                <p
                  className="font-display text-charcoal/90 italic text-justify"
                  style={{
                    fontFamily: "Instrument Serif, Georgia, serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.5,
                    marginTop: "0.75rem",
                  }}
                >
                  Nivaãra by GHD Hotels — Quick comfort. Refined living.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 lg:self-start lg:pt-12 animate-on-scroll-right delay-200">
              <div className="border border-gold/20 p-5 sm:p-8">
                <p className="eyebrow eyebrow--gold-emphasis mb-4 text-justify">
                  The Nivaãra Promise
                </p>
                <ul className="space-y-3">
                  {[
                    "Smart comfort — rooms that balance efficiency with modern elegance",
                    "Seamless connectivity — reliable high-speed internet for effortless connectivity",
                    "Effortless arrival — smooth, efficient check-in and check-out",
                    "Honest dining — quality food crafted with care, offered at fair prices",
                    "Urban access — well-located hotels close to city’s business and movement",
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

      {/* The Philosophy of Nivaãra — fixed Buddha bg; text centered on image (vertically + horizontally) */}
      <section
        ref={philosophyRef}
        className="nivaara-philosophy-section relative isolate flex w-full flex-col items-center justify-center bg-cream-deep px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10"
      >
        <div
          className="home-future-section relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-0"
          style={{ opacity: philosophyBgOpacity, willChange: "opacity" }}
        >
          <p className="eyebrow eyebrow--gold-emphasis animate-on-scroll">
            The Philosophy of Nivaãra
          </p>
          <div
            className="gold-divider animate-on-scroll delay-100"
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
            Calm in the Heart of Motion
          </h2>
          <div className="mx-auto max-w-3xl space-y-6 animate-on-scroll delay-300">
            <p className="body-refined-lg" style={{ fontWeight: 700 }}>
              At Nivaãra by GHD Hotels, our philosophy is built around the
              understanding that modern travel moves at an accelerated pace.
              Cities are dynamic, journeys are purposeful, and time has become
              one of the most valuable resources for today’s traveler.
            </p>
            <p className="body-refined-lg" style={{ fontWeight: 700 }}>
              Nivaãra was created to respond to this rhythm.
            </p>
            <p className="body-refined-lg" style={{ fontWeight: 700 }}>
              Rather than slowing the world down, we design our hospitality to
              move with it—offering spaces where comfort, efficiency, and
              thoughtful design come together to support the traveler’s journey.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-pad-compact bg-cream border-t border-stone-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-0">
          <div className="text-center mb-12 sm:mb-16">
            <p
              className="eyebrow eyebrow--gold-emphasis animate-on-scroll"
            >
              Nivaãra Offerings
            </p>
            <div
              className="gold-divider animate-on-scroll delay-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #b8975a, transparent)",
              }}
            />
            <h2 className="section-heading animate-on-scroll delay-200">
              The Nivaãra Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="feature-item animate-on-scroll"
                  style={{
                    transitionDelay: `${0.05 + i * 0.1}s`,
                    borderColor: "rgba(168, 144, 112, 0.12)",
                  }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon size={18} style={{ color: "#b8975a" }} />
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

      {/* Properties */}
      <section
        id="properties"
        className="py-12 sm:py-16 bg-white border-t border-gold/10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="eyebrow eyebrow--gold-emphasis mb-4">Properties</p>
          <div
            className="gold-divider mx-auto mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, #b8975a, transparent)",
            }}
          />
          <ul className="text-left mx-auto space-y-4">
            <li
              className="font-body text-charcoal/90 border border-gold/35 rounded-2xl px-6 py-6 sm:px-8 sm:py-8 w-full bg-cream-deep/30"
              style={{
                fontFamily: "General Sans, Helvetica Neue, sans-serif",
              }}
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-8">
                <div className="min-w-0 shrink-0 text-left lg:flex lg:flex-col lg:justify-center">
                  <span className="font-display text-gold-light text-2xl block">
                    Nivaara - Nerul
                  </span>
                </div>

                <div
                  className="w-full min-w-0 flex-1 self-stretch rounded-2xl border border-gold/40 bg-cream-deep/40 px-4 py-4 sm:px-5 sm:py-5 text-left"
                  role="group"
                  aria-label="Nivaara - Nerul contact details"
                >
                  <div className="space-y-2.5 text-sm text-charcoal/85 leading-relaxed">
                    <p>
                      <span className="text-charcoal/70">Reception :</span>{" "}
                      <a
                        href="tel:+918390020408"
                        className="text-charcoal hover:text-gold transition-colors"
                      >
                        +91 8390020408
                      </a>
                    </p>
                    <p>
                      <span className="text-charcoal/70">Reception Email :</span>{" "}
                      <a
                        href="mailto:info.nerul@ghdhotels.in"
                        className="text-charcoal hover:text-gold transition-colors break-all"
                      >
                        info.nerul@ghdhotels.in
                      </a>
                    </p>
                    <p className="text-charcoal/80">
                      <span className="text-charcoal/70">Address :</span>{" "}
                      Survey No. 98, Nerul, North Goa – 403114
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div
                  className="relative rounded-2xl overflow-hidden border border-gold/35 bg-cream-deep/30"
                  onMouseEnter={() => setPropertiesCarouselPaused(true)}
                  onMouseLeave={() => setPropertiesCarouselPaused(false)}
                  onFocusCapture={() => setPropertiesCarouselPaused(true)}
                  onBlurCapture={(e) => {
                    const next = e.relatedTarget as Node | null;
                    if (!next || !e.currentTarget.contains(next)) {
                      setPropertiesCarouselPaused(false);
                    }
                  }}
                >
                  <img
                    src={PROPERTIES_IMAGES[propertiesImageIndex] ?? PROPERTIES_IMAGES[0]}
                    alt={`Nivaara - Nerul photo ${propertiesImageIndex + 1}`}
                    className={`w-full h-[340px] sm:h-[420px] lg:h-[520px] object-cover transition-opacity duration-300 ${
                      propertiesFading ? "opacity-0" : "opacity-100"
                    }`}
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Left / right arrows */}
                  <div className="absolute inset-y-0 left-0 flex items-center px-3">
                    <button
                      type="button"
                      className="h-10 w-10 rounded-full bg-black/45 border border-white/10 text-white/90 flex items-center justify-center hover:bg-black/55 transition"
                      aria-label="Previous photo"
                      onClick={() =>
                        requestPropertiesIndex(propertiesImageIndex - 1)
                      }
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3">
                    <button
                      type="button"
                      className="h-10 w-10 rounded-full bg-black/45 border border-white/10 text-white/90 flex items-center justify-center hover:bg-black/55 transition"
                      aria-label="Next photo"
                      onClick={() =>
                        requestPropertiesIndex(propertiesImageIndex + 1)
                      }
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </button>
                  </div>

                  {/* Dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                    {PROPERTIES_IMAGES.map((_, i) => (
                      <button
                        key={`prop-dot-${i}`}
                        type="button"
                        className={`h-2.5 w-2.5 rounded-full border border-white/25 transition ${
                          i === propertiesImageIndex
                            ? "bg-gold/90"
                            : "bg-white/15 hover:bg-white/25"
                        }`}
                        aria-label={`Show photo ${i + 1}`}
                        onClick={() => requestPropertiesIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
              to="/celestra"
              className="btn-gold"
              data-ocid="nivaara.celestra.button"
            >
              <span>Explore Celéstra</span>
            </Link>
            <Link
              to="/samraya"
              className="btn-gold"
              data-ocid="nivaara.samraya.button"
            >
              <span>Explore Samrāya</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
