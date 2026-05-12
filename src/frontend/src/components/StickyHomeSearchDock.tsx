import type { RefObject } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  HomeSearchBar,
  readHomeSearchFromSession,
  type HomeSearchValues,
} from "./HomeSearchBar";

/** Pixels from document bottom; dock hides so footer / legal copy are not covered. */
const HIDE_NEAR_BOTTOM_PX = 200;

type StickyHomeSearchDockProps = {
  /** Element whose bottom edge triggers the dock (typically a wrapper around the hero). */
  boundaryRef: RefObject<HTMLElement | null>;
  /** When the boundary’s bottom is at or above this offset from the viewport top, show the dock (matches home: 48). */
  thresholdPx?: number;
};

/**
 * Floating booking search card — appears after scrolling past the hero, hides near page bottom.
 */
export function StickyHomeSearchDock({
  boundaryRef,
  thresholdPx = 48,
}: StickyHomeSearchDockProps) {
  const [show, setShow] = useState(false);
  const [lifted, setLifted] = useState<Partial<HomeSearchValues>>(
    readHomeSearchFromSession,
  );

  useEffect(() => {
    const update = () => {
      const el = boundaryRef.current;
      if (!el) return;
      const pastHero = el.getBoundingClientRect().bottom <= thresholdPx;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );
      const distanceToBottom =
        scrollHeight - (window.scrollY + window.innerHeight);
      const nearBottom = distanceToBottom <= HIDE_NEAR_BOTTOM_PX;
      setShow(pastHero && !nearBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [boundaryRef, thresholdPx]);

  const syncHomeSearch = useCallback((values: HomeSearchValues) => {
    setLifted(values);
  }, []);

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label="Book a stay"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] flex justify-center px-3 sm:px-4"
      style={{
        paddingBottom: "max(1rem, calc(0.5rem + env(safe-area-inset-bottom, 0px)))",
      }}
    >
      <div
        className="pointer-events-auto w-full max-w-[min(100%,34rem)] overflow-x-auto rounded-xl border border-stone-200/90 bg-white/93 px-2.5 py-2 shadow-[0_10px_40px_rgba(28,25,23,0.14),0_2px_12px_rgba(28,25,23,0.06)] backdrop-blur-xl sm:max-w-[min(100%,40rem)] sm:rounded-2xl sm:px-3 sm:py-2"
      >
        <HomeSearchBar
          embedded
          floatingDock
          initial={lifted}
          onValuesChange={syncHomeSearch}
        />
      </div>
    </div>
  );
}
