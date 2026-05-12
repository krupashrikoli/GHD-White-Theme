import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const bookingSearchDefaults = {
  hotelId: "nivaara-nerul",
  checkIn: "",
  checkOut: "",
  adults: "2",
  children: "0",
} as const;

const navLinks = [
  { to: "/", label: "Home", ocid: "nav.home.link" },
  { to: "/about", label: "Our Story", ocid: "nav.about.link" },
  // Brand order: Nivaãra → Celéstra → Samrāya
  { to: "/nivaara", label: "Nivaãra", ocid: "nav.nivaara.link" },
  { to: "/celestra", label: "Celéstra", ocid: "nav.celestra.link" },
  { to: "/samraya", label: "Samrāya", ocid: "nav.samraya.link" },
  { to: "/vision", label: "Development Vision", ocid: "nav.vision.link" },
  { to: "/contact", label: "Contact", ocid: "nav.contact.link" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change — intentionally only runs when path changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: we only want to close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-500 ${
          scrolled ? "nav-solid" : "nav-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 overflow-visible px-3 sm:h-[3.75rem] sm:px-4 lg:max-w-6xl lg:px-5">
          {/* Logo — left aligned; taller than bar so it reads larger without changing bar height */}
          <Link
            to="/"
            className="group relative z-[1] flex h-full min-h-0 shrink-0 items-center py-0"
            data-ocid="nav.home.link"
          >
            <img
              src="/assets/logo/GHD HOTELS - Gold Emboss Logo.png"
              alt="GHD Hotels"
              className="block h-[5rem] w-auto origin-left object-contain object-left transition-opacity duration-300 group-hover:opacity-95 sm:h-[4.875rem] lg:h-[5.125rem]"
              draggable={false}
            />
          </Link>

          {/* Desktop: nav links + Book now */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
            <ul className="flex items-center gap-3 lg:gap-4 xl:gap-5">
              {navLinks.map((link) => {
                const isActive = currentPath === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      data-ocid={link.ocid}
                      className={`relative nav-link group font-body text-xs font-semibold uppercase tracking-[0.15em] text-stone-700 transition-[font-weight] duration-200 pb-0.5 hover:font-bold`}
                      style={{
                        fontFamily: "General Sans, Helvetica Neue, sans-serif",
                        fontSize: "0.75rem",
                      }}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/booking"
              search={bookingSearchDefaults}
              className="btn-gold-filled !min-h-0 flex h-9 shrink-0 items-center justify-center px-3 py-0 text-[0.65rem] font-semibold tracking-[0.14em] sm:px-4"
              data-ocid="nav.book.link"
            >
              Book now
            </Link>
          </div>

          {/* Mobile: menu toggle + Book now */}
          <div className="flex items-center gap-1 lg:hidden">
            <Link
              to="/booking"
              search={bookingSearchDefaults}
              className="btn-gold-filled !min-h-0 flex h-9 items-center justify-center px-3 py-0 text-[0.6rem] font-semibold tracking-[0.12em]"
              data-ocid="nav.book.link.mobile"
            >
              Book now
            </Link>
            <button
              type="button"
              className="p-2 text-stone-700 transition-opacity duration-200 hover:opacity-70"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile.toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-menu lg:hidden">
          <button
            type="button"
            className="absolute top-6 right-6 p-2 text-charcoal transition-opacity duration-200 hover:opacity-70"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <div className="gold-divider mb-4" />

          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={link.ocid}
                  onClick={() => setMobileOpen(false)}
                  className={`font-display text-xl tracking-widest transition-[font-weight] duration-200 ${
                    isActive
                      ? "font-bold text-gold"
                      : "font-normal text-stone-600 hover:font-bold"
                  }`}
                  style={{ fontFamily: "Instrument Serif, Georgia, serif" }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/booking"
              search={bookingSearchDefaults}
              className="btn-gold-filled mt-2 px-8 py-3 text-[0.7rem] tracking-[0.14em]"
              data-ocid="nav.book.link.overlay"
              onClick={() => setMobileOpen(false)}
            >
              Book now
            </Link>
          </nav>

          <div className="gold-divider mt-4" />
        </div>
      )}
    </>
  );
}
