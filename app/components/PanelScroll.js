"use client";

import { useEffect } from "react";

// Vertical panel snapping with proper trackpad inertia handling.
// Pattern: passive wheel listener -> accumulate deltas -> react on
// "intentional" events only (delta peaks). One gesture = one panel.
export default function PanelScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only desktop / fine pointer
    if (!window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) return;

    const track = document.getElementById("panel-track");
    if (!track) return;

    const panels = Array.from(track.querySelectorAll("[data-panel]"));
    if (panels.length === 0) return;

    let index = 0;
    let isAnimating = false;
    let lastDelta = 0;
    let lastGestureAt = 0;

    const DURATION = 1400;
    const EASING = "cubic-bezier(0.83, 0, 0.17, 1)";

    function setTransform(i, animated = true) {
      track.style.transition = animated
        ? `transform ${DURATION}ms ${EASING}`
        : "none";
      track.style.transform = `translate3d(0, -${i * 100}vh, 0)`;
    }

    function goTo(i) {
      const clamped = Math.max(0, Math.min(panels.length - 1, i));
      if (clamped === index) return;
      index = clamped;
      isAnimating = true;
      setTransform(index, true);
      window.setTimeout(() => {
        isAnimating = false;
      }, DURATION + 50);
      // update hash for nav active states
      const id = panels[index].getAttribute("data-panel");
      if (id) {
        history.replaceState(null, "", `#${id}`);
        window.dispatchEvent(new Event("hashchange"));
      }
    }

    function onWheel(e) {
      // If the cursor is over a horizontally scrollable element, let it
      // scroll naturally. Only intercept when scroll is primarily vertical.
      const strip = e.target.closest("[data-hscroll]");
      if (strip) {
        const maxScrollLeft = strip.scrollWidth - strip.clientWidth;
        const atStart = strip.scrollLeft <= 0;
        const atEnd = strip.scrollLeft >= maxScrollLeft - 1;
        const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

        // Horizontal gesture — always let it scroll the strip
        if (isHorizontal) return;

        // Vertical gesture but strip isn't at the edge — scroll strip instead
        if (!atStart && e.deltaY < 0) {
          strip.scrollLeft += e.deltaY * 2;
          e.preventDefault();
          return;
        }
        if (!atEnd && e.deltaY > 0) {
          strip.scrollLeft += e.deltaY * 2;
          e.preventDefault();
          return;
        }
        // At edge — fall through to panel navigation
      }

      e.preventDefault();
      const now = performance.now();
      const dy = e.deltaY;

      if (isAnimating) {
        lastDelta = dy;
        return;
      }

      // Treat consecutive wheel events within 200ms as one gesture.
      // Only act if this delta is the peak (i.e. trackpad inertia
      // delivering decreasing magnitudes is ignored).
      const isNewGesture = now - lastGestureAt > 200;
      const isPeak = Math.abs(dy) >= Math.abs(lastDelta);

      lastDelta = dy;

      if (!isNewGesture && !isPeak) return;
      if (Math.abs(dy) < 8) return;

      lastGestureAt = now;
      goTo(index + (dy > 0 ? 1 : -1));
    }

    let touchStartY = 0;
    function onTouchStart(e) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchEnd(e) {
      if (isAnimating) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 50) return;
      goTo(index + (dy > 0 ? 1 : -1));
    }

    function onKey(e) {
      if (isAnimating) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(index + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(panels.length - 1);
      }
    }

    function onHashLink(e) {
      const a = e.target.closest && e.target.closest("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const target = panels.findIndex(
        (p) => p.getAttribute("data-panel") === id
      );
      if (target === -1) return;
      e.preventDefault();
      goTo(target);
    }

    function onResize() {
      setTransform(index, false);
    }

    // initial position from hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      const t = panels.findIndex(
        (p) => p.getAttribute("data-panel") === initialHash
      );
      if (t !== -1) index = t;
    }
    setTransform(index, false);

    // lock body scroll
    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onHashLink);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onHashLink);
    };
  }, []);

  return null;
}
