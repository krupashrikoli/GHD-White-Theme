import type { RefObject } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  HomeSearchBar,
  readHomeSearchFromSession,
  type HomeSearchValues,
} from "./HomeSearchBar";

type StickyHomeSearchDockProps = {
  /** Element whose bottom edge triggers the dock (typically a wrapper around the hero). */
  boundaryRef: RefObject<HTMLElement | null>;
  /** When the boundary’s bottom is at or above this offset from the viewport top, show the dock (matches home: 48). */
  thresholdPx?: number;
};

/**
 * Bottom fixed booking search — same behavior as the home page after scrolling past the hero.
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
      setShow(el.getBoundingClientRect().bottom <= thresholdPx);
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
      className="fixed inset-x-0 bottom-0 z-[110] border-t border-stone-300/70 bg-white/80 px-2 py-2 shadow-[0_-8px_32px_rgba(28,25,23,0.07)] backdrop-blur-xl sm:px-4"
      style={{
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <HomeSearchBar
          embedded
          initial={lifted}
          onValuesChange={syncHomeSearch}
        />
      </div>
    </div>
  );
}
