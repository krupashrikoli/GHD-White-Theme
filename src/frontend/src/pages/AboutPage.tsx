import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { StickyHomeSearchDock } from "../components/StickyHomeSearchDock";
import { useScrollAnimationAll } from "../hooks/useScrollAnimation";

const values = [
  {
    number: "01",
    title: "Design Excellence",
    description:
      "Every GHD property is conceived by world-class architects and interior designers, ensuring that each hotel is a work of art in its own right — a destination, not merely a place to stay.",
  },
  {
    number: "02",
    title: "Service Philosophy",
    description:
      "Our service culture is built on anticipation. We believe the finest hospitality is felt before it is requested — in the details noticed, the needs predicted, and the moments made extraordinary.",
  },
  {
    number: "03",
    title: "Culinary Vision",
    description:
      "GHD Hotels places extraordinary emphasis on dining as an integral part of the guest experience. Each restaurant is curated with the same care as the accommodation itself.",
  },
  {
    number: "04",
    title: "Global Standards",
    description:
      "Regardless of brand tier, every GHD property adheres to uncompromising quality benchmarks. International travelers can expect the same dedication to excellence across all our categories.",
  },
];

const ABOUT_COUPLE_HERO_IMAGE =
  "/assets/generated/lady%20by%20the%20pool.png";

const ABOUT_SECTION_FADE = {
  fadeInStartVh: 0.9,
  fadeInEndVh: 0.1,
  fadeOutStartVh: 0,
  fadeOutEndVh: -1.2,
};

export function AboutPage() {
  useScrollAnimationAll();
  const heroWrapRef = useRef<HTMLDivElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const valuesRef = useRef<HTMLElement | null>(null);
  const quoteRef = useRef<HTMLElement | null>(null);
  const [missionFade, setMissionFade] = useState(0);
  const [valuesFade, setValuesFade] = useState(0);
  const [quoteFade, setQuoteFade] = useState(0);

  useEffect(() => {
    document.title = "Our Story – GHD Hotels";
  }, []);

  useEffect(() => {
    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));
    const smoothstep01 = (t: number) => t * t * (3 - 2 * t);
    const getSectionFade = (el: HTMLElement, vh: number) => {
      const rect = el.getBoundingClientRect();
      const fadeInStartPx = vh * ABOUT_SECTION_FADE.fadeInStartVh;
      const fadeInEndPx = vh * ABOUT_SECTION_FADE.fadeInEndVh;
      const fadeInT = clamp(
        (fadeInStartPx - rect.top) / (fadeInStartPx - fadeInEndPx),
        0,
        1,
      );
      const fadeOutStartPx = vh * ABOUT_SECTION_FADE.fadeOutStartVh;
      const fadeOutEndPx = vh * ABOUT_SECTION_FADE.fadeOutEndVh;
      const fadeOutT = clamp(
        (rect.bottom - fadeOutEndPx) / (fadeOutStartPx - fadeOutEndPx),
        0,
        1,
      );
      return smoothstep01(fadeInT) * smoothstep01(fadeOutT);
    };

    const onScroll = () => {
      const vh = window.innerHeight;
      if (missionRef.current) setMissionFade(getSectionFade(missionRef.current, vh));
      if (valuesRef.current) setValuesFade(getSectionFade(valuesRef.current, vh));
      if (quoteRef.current) setQuoteFade(getSectionFade(quoteRef.current, vh));
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
    <div className="bg-cream min-h-screen">
      {/* Image-only hero — page title lives in the section below */}
      <div ref={heroWrapRef}>
        <HeroSection bgImage={ABOUT_COUPLE_HERO_IMAGE} />
      </div>
      <StickyHomeSearchDock boundaryRef={heroWrapRef} />

      <section
        aria-labelledby="about-page-title"
        className="border-b border-stone-200/70 bg-cream-deep px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1
            id="about-page-title"
            className="font-display text-black"
            style={{
              fontFamily: "Instrument Serif, Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              letterSpacing: "0.03em",
              lineHeight: 1.08,
            }}
          >
            — GHD Hotels —
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
            Where stays become experiences
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="who-we-are"
        ref={missionRef}
        className="section-pad-compact bg-white border-t border-stone-200/60"
      >
        <div
          className="max-w-5xl mx-auto px-2 sm:px-0"
          style={{ opacity: missionFade, willChange: "opacity" }}
        >
          <div className="grid grid-cols-1 gap-12 items-start">
            <div className="text-center">
              <p className="eyebrow eyebrow--gold-emphasis animate-on-scroll-left">
                Who We Are
              </p>
              <div className="gold-divider animate-on-scroll-left delay-100" />
              <h2
                className="section-subheading animate-on-scroll-left delay-200"
                style={{ marginBottom: "2.5rem" }}
              >
                A Vision Born from Passion for Hospitality
              </h2>
              <div className="space-y-6 animate-on-scroll-left delay-300">
                <p className="body-refined-lg">
                  GHD Hotels was conceived with a clear and ambitious vision —
                  to create a hospitality brand that seamlessly serves the full
                  spectrum of modern travelers, from ultra-luxury seekers to
                  smart, efficiency-conscious guests.
                </p>
                <p className="body-refined">
                  Our founding philosophy recognizes that true luxury is not
                  defined by a price point — it is defined by the experience of
                  feeling understood, valued, and cared for in a thoughtfully
                  designed environment.
                </p>
                <p className="body-refined">
                  The GHD portfolio — Celéstra, Samrāya, and Nivaãra —
                  represents three distinct expressions of this philosophy, each
                  calibrated for a different traveler, but unified by the same
                  commitment to excellence.
                </p>
              </div>
            </div>

              <div className="about-logo-strip animate-on-scroll-right delay-200 mt-4 sm:mt-6">
                <div className="about-logo-track" aria-hidden>
                  <div className="about-logo-group">
                    <img
                      src="/assets/logo/Celestra_logo.png"
                      alt=""
                      className="about-logo-item about-logo-item--celestra"
                    />
                    <img
                      src="/assets/logo/Samrāya_logo.png"
                      alt=""
                      className="about-logo-item"
                    />
                    <img
                      src="/assets/logo/Nivaãra_logo.png"
                      alt=""
                      className="about-logo-item"
                    />
                  </div>
                  <div className="about-logo-group">
                    <img
                      src="/assets/logo/Celestra_logo.png"
                      alt=""
                      className="about-logo-item about-logo-item--celestra"
                    />
                    <img
                      src="/assets/logo/Samrāya_logo.png"
                      alt=""
                      className="about-logo-item"
                    />
                    <img
                      src="/assets/logo/Nivaãra_logo.png"
                      alt=""
                      className="about-logo-item"
                    />
                  </div>
                </div>
                <div className="sr-only">
                  Celéstra, Samrāya, and Nivaãra brand logos moving continuously.
                </div>
              </div>

              <p
                className="mt-6 font-body text-[0.7rem] sm:text-xs text-charcoal/60 leading-relaxed max-w-4xl mx-auto animate-on-scroll-right delay-300"
                style={{
                  fontFamily: "General Sans, Helvetica Neue, sans-serif",
                  fontWeight: 300,
                }}
              >
                IPR Disclaimer: “All brands, names, logos, and associated assets
                of GHD Hotels LLP are protected under Intellectual Property Rights
                (IPR) laws of India. Any unauthorized use, reproduction, or
                imitation will be subject to legal action.”
              </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className="section-pad-compact bg-cream border-t border-stone-200/50"
      >
        <div
          className="max-w-6xl mx-auto px-2 sm:px-0"
          style={{ opacity: valuesFade, willChange: "opacity" }}
        >
          <div className="text-center mb-12 sm:mb-20">
            <p
              className="eyebrow eyebrow--gold-emphasis animate-on-scroll"
            >
              Our Principles
            </p>
            <div className="gold-divider animate-on-scroll delay-100" />
            <h2 className="section-heading animate-on-scroll delay-200">
              The Pillars of GHD
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={value.number}
                className="pillar-card animate-on-scroll"
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="flex items-start gap-4 sm:gap-6 lg:gap-8">
                  <span
                    className="pillar-number font-display flex-shrink-0 leading-none"
                    style={{
                      fontFamily: "Instrument Serif, Georgia, serif",
                      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                      lineHeight: 1,
                    }}
                  >
                    {value.number}
                  </span>
                  <div className="pt-1 sm:pt-2 min-w-0 text-justify">
                    <h3
                      className="font-display text-charcoal mb-3"
                      style={{
                        fontFamily: "Instrument Serif, Georgia, serif",
                        fontWeight: 400,
                        fontSize: "1.35rem",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {value.title}
                    </h3>
                    <p className="body-refined">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote section — photo on its own layer + darken for readable quote */}
      <section
        ref={quoteRef}
        className="section-pad-compact relative isolate overflow-hidden text-center"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ABOUT_COUPLE_HERO_IMAGE})`,
            filter: "brightness(0.85)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-black/55 to-black/70"
        />
        <div
          className="relative z-10 max-w-3xl mx-auto"
          style={{ opacity: quoteFade, willChange: "opacity" }}
        >
          <div className="gold-divider animate-on-scroll opacity-90" />
          <blockquote
            className="font-display italic animate-on-scroll delay-200 text-white"
            style={{
              fontFamily: "Instrument Serif, Georgia, serif",
              fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)",
              lineHeight: 1.4,
              letterSpacing: "0.02em",
              margin: "3rem 0",
              color: "#ffffff",
              WebkitTextStroke: "0.55px #000000",
              paintOrder: "stroke fill",
            }}
          >
            "Hospitality is not an amenity. It is an art form — one that we at
            GHD Hotels are dedicated to mastering, one property at a time."
          </blockquote>
          <div className="gold-divider animate-on-scroll delay-300 opacity-90" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
