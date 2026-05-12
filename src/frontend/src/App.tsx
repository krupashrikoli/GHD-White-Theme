import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef } from "react";
import { clearPersistedCheckout } from "./components/booking/bookingCheckoutPersistence";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";

/** Scroll to top on every in-app navigation (links, buttons using navigate, etc.). */
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

/** Drop checkout draft when leaving /booking for any route except /policies (same tab). */
function BookingCheckoutRoutePersistence() {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);
  useEffect(() => {
    const from = prevPath.current;
    prevPath.current = pathname;
    if (
      from === "/booking" &&
      pathname !== "/booking" &&
      pathname !== "/policies"
    ) {
      clearPersistedCheckout();
    }
  }, [pathname]);
  return null;
}

const AboutPage = lazyRouteComponent(
  () => import("./pages/AboutPage"),
  "AboutPage",
);
const BookingPage = lazyRouteComponent(
  () => import("./pages/BookingPage"),
  "BookingPage",
);
const CareersPage = lazyRouteComponent(
  () => import("./pages/CareersPage"),
  "CareersPage",
);
const CelestraPage = lazyRouteComponent(
  () => import("./pages/CelestraPage"),
  "CelestraPage",
);
const ContactPage = lazyRouteComponent(
  () => import("./pages/ContactPage"),
  "ContactPage",
);
const NivaaraPage = lazyRouteComponent(
  () => import("./pages/NivaaraPage"),
  "NivaaraPage",
);
const PoliciesPage = lazyRouteComponent(
  () => import("./pages/PoliciesPage"),
  "PoliciesPage",
);
const SamrayaPage = lazyRouteComponent(
  () => import("./pages/SamrayaPage"),
  "SamrayaPage",
);
const VisionPage = lazyRouteComponent(
  () => import("./pages/VisionPage"),
  "VisionPage",
);

// ── Root Layout ─────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <ScrollRestoration />
      <ScrollToTop />
      <BookingCheckoutRoutePersistence />
      <Outlet />
    </>
  ),
});

// ── Page Routes ──────────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const celestraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/celestra",
  component: CelestraPage,
});

const samrayaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/samraya",
  component: SamrayaPage,
});

const nivaaraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nivaara",
  component: NivaaraPage,
});

const visionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vision",
  component: VisionPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking",
  component: BookingPage,
  validateSearch: (raw: Record<string, unknown>) => ({
    hotelId: String(raw.hotelId ?? ""),
    checkIn: String(raw.checkIn ?? ""),
    checkOut: String(raw.checkOut ?? ""),
    adults: String(raw.adults ?? ""),
    children: String(raw.children ?? ""),
  }),
});

const policiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/policies",
  component: PoliciesPage,
});

const careersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/careers",
  component: CareersPage,
});

// ── Router ───────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  celestraRoute,
  samrayaRoute,
  nivaaraRoute,
  visionRoute,
  contactRoute,
  bookingRoute,
  policiesRoute,
  careersRoute,
]);

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="flex min-h-[50vh] items-center justify-center bg-cream">
      <p
        className="text-sm font-light tracking-[0.2em] text-charcoal/45 uppercase"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        Loading
      </p>
    </div>
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App ──────────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
