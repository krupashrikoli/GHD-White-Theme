import { Link } from "@tanstack/react-router";
import { Building2, Leaf, TrendingUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { StickyHomeSearchDock } from "../components/StickyHomeSearchDock";
import { useScrollAnimationAll } from "../hooks/useScrollAnimation";

const pillars = [
  {
    number: "I",
    icon: Building2,
    title: "Carefully Designed Hotel Architecture",
    description:
      "Every GHD property begins with a vision — not just of a building, but of an experience. Our architectural approach engages the finest design studios to create hotels that are as much cultural landmarks as they are places to stay. Each property responds to its geography, climate, and context, resulting in structures that belong to their location while transcending it.",
    accentColor: "#b8975a",
  },
  {
    number: "II",
    icon: Leaf,
    title: "Sustainable Development",
    description:
      "GHD Hotels is committed to a development philosophy that respects and preserves the environments in which we build. From the materials used in construction to the operational practices of our hotels, sustainability is not an afterthought but a founding principle. We aim to create properties that leave the lightest possible footprint while delivering the richest possible experiences.",
    accentColor: "#8aab7a",
  },
  {
    number: "III",
    icon: Users,
    title: "Guest Experience Driven Design",
    description:
      "Every decision in the development of a GHD hotel is filtered through a single lens: how will this enhance the guest experience? From room layouts optimised for natural light to lobby designs that facilitate organic social connection, the architecture and interior design of our properties are fundamentally in service of the people who stay in them.",
    accentColor: "#7a9db8",
  },
  {
    number: "IV",
    icon: TrendingUp,
    title: "Long Term Hospitality Vision",
    description:
      "GHD Hotels is building a hospitality portfolio with generational ambition. We are not developing hotels for quick returns but for lasting legacies. Our properties are designed to be iconic, enduring, and continually evolving. The GHD brand is being built to stand among the world's most respected hospitality names — a vision we pursue with patience and conviction.",
    accentColor: "#b8975a",
  },
];

const VISION_SECTION_FADE = {
  fadeInStartVh: 0.9,
  fadeInEndVh: 0.1,
  fadeOutStartVh: 0,
  fadeOutEndVh: -1.2,
};

export function VisionPage() {
  useScrollAnimationAll();
  const heroWrapRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLElement | null>(null);
  const pillarsRef = useRef<HTMLElement | null>(null);
  const statusRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const [introFade, setIntroFade] = useState(0);
  const [pillarsFade, setPillarsFade] = useState(0);
  const [statusFade, setStatusFade] = useState(0);
  const [ctaFade, setCtaFade] = useState(0);

  useEffect(() => {
    document.title =
      "Development Vision – GHD Hotels | Building the Future of Hospitality";
  }, []);

  useEffect(() => {
    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));
    const smoothstep01 = (t: number) => t * t * (3 - 2 * t);
    const getSectionFade = (el: HTMLElement, vh: number) => {
      const rect = el.getBoundingClientRect();
      const fadeInStartPx = vh * VISION_SECTION_FADE.fadeInStartVh;
      const fadeInEndPx = vh * VISION_SECTION_FADE.fadeInEndVh;
      const fadeInT = clamp(
        (fadeInStartPx - rect.top) / (fadeInStartPx - fadeInEndPx),
        0,
        1,
      );
      const fadeOutStartPx = vh * VISION_SECTION_FADE.fadeOutStartVh;
      const fadeOutEndPx = vh * VISION_SECTION_FADE.fadeOutEndVh;
      const fadeOutT = clamp(
        (rect.bottom - fadeOutEndPx) / (fadeOutStartPx - fadeOutEndPx),
        0,
        1,
      );
      return smoothstep01(fadeInT) * smoothstep01(fadeOutT);
    };

    const onScroll = () => {
      const vh = window.innerHeight;
      if (introRef.current) setIntroFade(getSectionFade(introRef.current, vh));
      if (pillarsRef.current) setPillarsFade(getSectionFade(pillarsRef.current, vh));
      if (statusRef.current) setStatusFade(getSectionFade(statusRef.current, vh));
      if (ctaRef.current) setCtaFade(getSectionFade(ctaRef.current, vh));
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
    <div className="bg-cream min-h-screen nivaara-test-font">
      <div ref={heroWrapRef}>
        <HeroSection
          bgImage="/assets/generated/hero-vision.dim_1920x1080.png"
          screenReaderHeading="Development Vision"
        />
      </div>
      <StickyHomeSearchDock boundaryRef={heroWrapRef} />

      <section
        aria-labelledby="vision-page-title"
        className="border-b border-stone-200/70 bg-cream px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1
            id="vision-page-title"
            className="font-display text-black"
            style={{
              fontFamily: "Instrument Serif, Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              letterSpacing: "0.03em",
              lineHeight: 1.08,
            }}
          >
            Building the Future of Hospitality
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section ref={introRef} className="section-pad-compact bg-cream-muted">
        <div
          className="max-w-4xl mx-auto text-center px-4 sm:px-0"
          style={{ opacity: introFade, willChange: "opacity" }}
        >
          <p className="eyebrow eyebrow--gold-emphasis animate-on-scroll">
            The GHD Approach
          </p>
          <div className="gold-divider animate-on-scroll delay-100" />
          <h2
            className="section-heading animate-on-scroll delay-200"
            style={{ marginBottom: "3rem" }}
          >
            A New Hospitality Ecosystem
          </h2>
          <div className="space-y-6">
            <p className="body-refined-lg">
              GHD Hotels is not merely building hotels. We are developing a
              comprehensive hospitality ecosystem — one that offers remarkable
              experiences at every tier, from the most discerning luxury
              traveler to the efficiency-focused business guest.
            </p>
            <p className="body-refined">
              Our development approach is guided by four core principles that
              inform every aspect of how we select locations, design properties,
              and create the operational culture that will define the GHD guest
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section ref={pillarsRef} className="section-pad-compact bg-cream">
        <div
          className="max-w-6xl mx-auto px-4 sm:px-0"
          style={{ opacity: pillarsFade, willChange: "opacity" }}
        >
          <div className="text-center mb-12 sm:mb-20">
            <p className="eyebrow eyebrow--gold-emphasis animate-on-scroll">
              Development Pillars
            </p>
            <div className="gold-divider animate-on-scroll delay-100" />
            <h2 className="section-heading animate-on-scroll delay-200">
              Four Cornerstones of Excellence
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="pillar-card animate-on-scroll"
                  style={{
                    transitionDelay: `${0.1 + i * 0.12}s`,
                    borderColor: `${pillar.accentColor}20`,
                  }}
                >
                  <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <span
                      className="pillar-number font-display text-5xl leading-none flex-shrink-0"
                      style={{
                        fontFamily: "Instrument Serif, Georgia, serif",
                        color: `${pillar.accentColor}30`,
                      }}
                    >
                      {pillar.number}
                    </span>
                    <div className="pt-2">
                      <Icon size={24} style={{ color: pillar.accentColor }} />
                    </div>
                  </div>

                  <div className="min-w-0 text-justify">
                    <h3
                      className="font-display text-charcoal text-xl md:text-2xl mb-4"
                      style={{
                        fontFamily: "Instrument Serif, Georgia, serif",
                        fontWeight: 400,
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="font-body text-base text-charcoal/65 leading-relaxed"
                      style={{
                        fontFamily: "General Sans, Helvetica Neue, sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline / Under Construction */}
      <section
        id="development-status"
        ref={statusRef}
        className="section-pad-compact parallax-section relative overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-vision.dim_1920x1080.png)",
            filter: "blur(4px)",
            transform: "scale(1.06)",
          }}
        />
        <div
          className="home-future-section relative z-10 mx-auto max-w-4xl px-4 sm:px-0"
          style={{ opacity: statusFade, willChange: "opacity" }}
        >
          <div className="vision-status-headlines mb-12 text-center sm:mb-20">
            <p className="eyebrow eyebrow--gold-emphasis animate-on-scroll">
              Development Status
            </p>
            <div className="gold-divider animate-on-scroll delay-100" />
            <h2 className="section-heading animate-on-scroll delay-200">
              The Journey Ahead
            </h2>
          </div>

          <div className="space-y-6 animate-on-scroll delay-300">
            {[
              {
                phase: "Phase I",
                title: "Site Selection & Acquisition",
                status: "In Progress",
                detail:
                  "Strategic site selection across Tier 1 and Tier 2 Indian cities and international destinations.",
              },
              {
                phase: "Phase II",
                title: "Architectural Design & Planning",
                status: "In Progress",
                detail:
                  "Collaboration with world-class architecture firms to develop signature property designs.",
              },
              {
                phase: "Phase III",
                title: "Construction & Development",
                status: "Coming Soon",
                detail:
                  "Ground-up construction of flagship properties across all three brand tiers.",
              },
              {
                phase: "Phase IV",
                title: "Soft Opening & Launch",
                status: "Future",
                detail:
                  "Phased opening of properties beginning with select Nivaãra and Samrāya locations.",
              },
            ].map((item, i) => (
              <div
                key={item.phase}
                className="flex flex-col items-start gap-4 border border-white/20 p-4 sm:flex-row sm:gap-6 sm:p-6 animate-on-scroll"
                style={{
                  background: "rgba(26, 26, 26, 0.5)",
                  transitionDelay: `${0.1 + i * 0.12}s`,
                }}
              >
                <div className="w-24 flex-shrink-0 text-center">
                  <p className="eyebrow text-[#fafaf9]">{item.phase}</p>
                  <p
                    className="font-body mt-2 border border-white/25 px-2 py-1 text-center text-sm text-[#fafaf9]"
                    style={{
                      fontFamily: "General Sans, Helvetica Neue, sans-serif",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.status}
                  </p>
                </div>
                <div>
                  <h4
                    className="font-display mb-2 text-lg text-[#fafaf9]"
                    style={{
                      fontFamily: "Instrument Serif, Georgia, serif",
                      fontWeight: 400,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="font-body text-base text-[rgba(250,250,249,0.92)]"
                    style={{
                      fontFamily: "General Sans, Helvetica Neue, sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className="py-12 sm:py-20 bg-cream-muted border-t border-gold/10"
      >
        <div
          className="max-w-3xl mx-auto text-center px-4 sm:px-6"
          style={{ opacity: ctaFade, willChange: "opacity" }}
        >
          <div className="gold-divider animate-on-scroll" />
          <h3
            className="font-display text-charcoal text-3xl mt-8 mb-4 animate-on-scroll delay-200"
            style={{
              fontFamily: "Instrument Serif, Georgia, serif",
              fontWeight: 400,
            }}
          >
            Join the GHD Journey
          </h3>
          <p
            className="font-body text-charcoal/65 text-base leading-relaxed mb-10 animate-on-scroll delay-300"
            style={{
              fontFamily: "General Sans, Helvetica Neue, sans-serif",
              fontWeight: 300,
            }}
          >
            We welcome partnerships, investment inquiries, and expressions of
            interest from those who share our vision for the future of
            hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll delay-400">
            <Link to="/contact" className="btn-gold">
              <span>Get in Touch</span>
            </Link>
            <Link to="/about" className="btn-gold">
              <span>Learn About GHD</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
