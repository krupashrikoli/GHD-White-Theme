import { Link } from "@tanstack/react-router";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-shell border-t border-gold/25 bg-charcoal text-stone-200">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link
                to="/"
                className="inline-block group"
                data-ocid="footer.home.logo"
              >
                <img
                  src="/assets/logo/GHD HOTELS - Gold Emboss Logo.png"
                  alt="GHD Hotels"
                  className="h-[4.25rem] sm:h-[6.25rem] lg:h-28 w-auto max-w-[min(100%,360px)] object-contain object-left transition-opacity duration-300 group-hover:opacity-95"
                  draggable={false}
                />
              </Link>
            </div>
            <p
              className="font-body mt-2 mb-10 max-w-[14rem] text-justify text-sm leading-relaxed text-stone-400 sm:mb-12"
              style={{ fontFamily: "General Sans, Helvetica Neue, sans-serif" }}
            >
              Crafting extraordinary hospitality experiences across luxury,
              premium, and smart comfort segments.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ghd_hotels?igsh=dGF2aDRyMnN4MGpt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 transition-colors duration-300 hover:text-gold-light"
                aria-label="Instagram"
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://x.com/GHD_Hotels"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 transition-colors duration-300 hover:text-gold-light"
                aria-label="X / Twitter"
              >
                <SiX size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/ghd-hotels/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 transition-colors duration-300 hover:text-gold-light"
                aria-label="LinkedIn"
              >
                <SiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* About GHD */}
          <div>
            <h4
              className="eyebrow eyebrow--gold-emphasis mb-6 !text-gold-light"
              style={{ fontFamily: "General Sans, Helvetica Neue, sans-serif" }}
            >
              About GHD
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/about#who-we-are", label: "Our Story" },
                { href: "/#philosophy", label: "Philosophy" },
                { to: "/vision", label: "Our Vision" },
                { to: "/policies", label: "Policies" },
              ].map((item) => (
                <li key={item.label}>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      className="font-body text-sm text-stone-400 transition-colors duration-300 hover:text-gold-light"
                      style={{
                        fontFamily: "General Sans, Helvetica Neue, sans-serif",
                      }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className="font-body text-sm text-stone-400 transition-colors duration-300 hover:text-gold-light"
                      style={{
                        fontFamily: "General Sans, Helvetica Neue, sans-serif",
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Brands */}
          <div>
            <h4
              className="eyebrow eyebrow--gold-emphasis mb-6 !text-gold-light"
              style={{ fontFamily: "General Sans, Helvetica Neue, sans-serif" }}
            >
              Our Brands
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/samraya", label: "Samrāya — Luxury" },
                { to: "/celestra", label: "Celéstra — Premium" },
                { to: "/nivaara", label: "Nivaãra — Smart Comfort" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-body text-sm text-stone-400 transition-colors duration-300 hover:text-gold-light"
                    style={{
                      fontFamily: "General Sans, Helvetica Neue, sans-serif",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Development & Contact */}
          <div>
            <h4
              className="eyebrow eyebrow--gold-emphasis mb-6 !text-gold-light"
              style={{ fontFamily: "General Sans, Helvetica Neue, sans-serif" }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/vision#development-status", label: "Development Status" },
                { to: "/contact", label: "Contact Us" },
                { to: "/careers", label: "Careers" },
              ].map((item) => (
                <li key={item.label}>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      className="font-body text-sm text-stone-400 transition-colors duration-300 hover:text-gold-light"
                      style={{
                        fontFamily: "General Sans, Helvetica Neue, sans-serif",
                      }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className="font-body text-sm text-stone-400 transition-colors duration-300 hover:text-gold-light"
                      style={{
                        fontFamily: "General Sans, Helvetica Neue, sans-serif",
                      }}
                      data-ocid={
                        item.to === "/careers" ? "footer.careers" : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-white/10 pt-6">
              <p
                className="font-body text-left text-sm leading-relaxed text-stone-400"
                style={{
                  fontFamily: "General Sans, Helvetica Neue, sans-serif",
                }}
              >
                GHD Hotels LLP
                <br />
                625, Gera Imperium Star
                <br />
                Patto, Panjim
                <br />
                Goa – 403001, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar border-t border-white/10 bg-[#17140f] py-4 sm:py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:px-6 lg:px-10">
          <p
            className="font-body text-sm tracking-wider text-stone-500"
            style={{ fontFamily: "General Sans, Helvetica Neue, sans-serif" }}
          >
            © {year} GHD Hotels. All rights reserved.
          </p>
          <p
            className="font-body min-w-0 flex-1 text-left text-xs leading-relaxed tracking-wider text-stone-500 sm:text-right"
            style={{ fontFamily: "General Sans, Helvetica Neue, sans-serif" }}
          >
            Disclaimer: The images shown are conceptual representations based on
            brand vision and may differ from the final development.
          </p>
        </div>
      </div>
    </footer>
  );
}
