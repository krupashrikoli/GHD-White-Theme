import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const primaryNav: Array<{ label: string; to: string }> = [
  { label: "Our Story", to: "/about" },
  { label: "Our Vision", to: "/vision" },
  { label: "Careers", to: "/careers" },
];

const brandLinks: Array<{ label: string; to: string }> = [
  { label: "Samrāya", to: "/samraya" },
  { label: "Celéstra", to: "/celestra" },
  { label: "Nivaãra", to: "/nivaara" },
];

/** Corporate contact — same details as Contact page. */
const concierge = {
  phoneDisplay: "+91 83800 08687",
  phoneTel: "+918380008687",
  email: "reservation@ghdhotels.in",
  locality: "Panjim, Goa, India",
} as const;

const footerInnerMax =
  "max-w-[min(75rem,calc(100%-1.25rem))] mx-auto" as const;

const footerDisclaimer =
  "Disclaimer: The images shown are conceptual representations based on brand vision and may differ from the final development.";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-shell footer-luxury relative overflow-hidden">
      <div className="footer-luxury__layers" aria-hidden>
        <div className="footer-luxury__ambience" />
        <div className="footer-luxury__glow" />
        <div className="footer-luxury__grain" />
        <div className="footer-luxury__waves">
          <svg
            viewBox="0 0 1440 280"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M0,120 C180,80 360,160 540,140 C720,120 900,60 1080,90 C1260,120 1380,100 1440,85 L1440,280 L0,280 Z" />
            <path
              opacity="0.65"
              d="M0,165 C220,130 400,200 620,175 C840,150 980,95 1160,115 C1280,128 1380,150 1440,138 L1440,280 L0,280 Z"
            />
          </svg>
        </div>
        <div className="footer-luxury__vignette" />
      </div>

      <div className="footer-luxury__inner">
        <div
          className={`footer-luxury__content-shell ${footerInnerMax} px-7 pb-[clamp(1.75rem,4vw,2.75rem)] pt-[clamp(2rem,5vw,3.25rem)] sm:px-10 lg:px-12`}
        >
          <div className="footer-luxury__grid-main grid grid-cols-1 justify-items-center gap-[clamp(1.75rem,4vw,2.5rem)] text-center lg:grid-cols-12 lg:items-start lg:gap-x-6 lg:gap-y-0 lg:justify-items-center">
            {/* Brand */}
            <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center lg:col-span-5">
              <div className="footer-luxury__divider mx-auto" />
              <Link
                to="/"
                className="inline-flex justify-center transition-opacity duration-[580ms] ease-out hover:opacity-[0.86]"
                data-ocid="footer.home.logo"
              >
                <img
                  src="/assets/logo/GHD HOTELS - Gold Emboss Logo.png"
                  alt="GHD Hotels"
                  className="h-[9rem] w-auto max-w-[min(100%,520px)] object-contain object-center sm:h-[10.5rem]"
                  draggable={false}
                />
              </Link>
              <p className="footer-luxury__statement mt-[clamp(1.1rem,2.5vw,1.75rem)] max-w-[28rem]">
                Designed around moments that stay with you.
              </p>
            </div>

            {/* Navigation */}
            <nav
              className="footer-luxury__nav-column mx-auto flex w-full max-w-lg flex-col items-center text-center lg:col-span-3 lg:px-4"
              aria-label="Footer"
            >
              <ul className="flex flex-col items-center gap-0">
                {primaryNav.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="footer-luxury-link"
                      data-ocid={
                        item.to === "/careers" ? "footer.careers" : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="footer-luxury__meta-row mt-10 border-t border-[rgba(37,32,25,0.055)] pt-6">
                {brandLinks.map((b) => (
                  <Link key={b.to} to={b.to} className="footer-luxury__meta">
                    {b.label}
                  </Link>
                ))}
                <Link to="/policies" className="footer-luxury__meta">
                  Policies
                </Link>
              </div>
            </nav>

            {/* Concierge contact */}
            <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center lg:col-span-4">
              <div className="footer-luxury__concierge">
                <p className="footer-luxury__concierge-title">Contact</p>
                <a
                  href={`tel:${concierge.phoneTel}`}
                  className="footer-luxury__concierge-line footer-luxury__concierge-phone"
                >
                  {concierge.phoneDisplay}
                </a>
                <a
                  href={`mailto:${concierge.email}`}
                  className="footer-luxury__concierge-line footer-luxury__concierge-email"
                >
                  {concierge.email}
                </a>
                <p className="footer-luxury__concierge-locality">
                  {concierge.locality}
                </p>
                <p className="footer-luxury__concierge-address">
                  GHD Hotels LLP · Gera Imperium Star, Patto
                </p>
                <Link
                  to="/contact"
                  className="footer-luxury__concierge-cta"
                  data-ocid="footer.contact.link"
                >
                  Enquire
                </Link>
              </div>

              <div className="footer-luxury__social">
                <a
                  href="https://www.instagram.com/ghd_hotels?igsh=dGF2aDRyMnN4MGpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram strokeWidth={1.1} size={21} aria-hidden />
                </a>
                <a
                  href="https://x.com/GHD_Hotels"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                >
                  <Twitter strokeWidth={1.1} size={21} aria-hidden />
                </a>
                <a
                  href="https://www.linkedin.com/company/ghd-hotels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin strokeWidth={1.1} size={21} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar relative z-[2] border-t border-[rgba(37,32,25,0.06)] px-7 py-5 text-center sm:px-10 lg:px-12">
          <div
            className={`${footerInnerMax} mx-auto flex flex-col items-center gap-2 text-center`}
          >
            <p className="footer-luxury__legal-copy">
              © {year} GHD Hotels. All rights reserved.
            </p>
            <p className="footer-luxury__legal-disclaimer">{footerDisclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
