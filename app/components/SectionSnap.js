"use client";

import { useEffect } from "react";

export default function SectionSnap() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let isAnimating = false;
    let touchStartY = 0;

    function getSections() {
      return Array.from(document.querySelectorAll("main > section"));
    }

    function currentIndex(sections) {
      const y = window.scrollY;
      const vh = window.innerHeight;
      // section whose top is closest to current scroll position
      let best = 0;
      let bestDist = Infinity;
      sections.forEach((s, i) => {
        const top = s.offsetTop;
        const dist = Math.abs(top - y);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      // if scrolled well past current section's top + 60% of vh, treat as next
      const cur = sections[best];
      if (cur && y > cur.offsetTop + vh * 0.6 && best < sections.length - 1) {
        best = best + 1;
      }
      return best;
    }

    function animateTo(targetY, duration = 700) {
      const startY = window.scrollY;
      const dy = targetY - startY;
      const start = performance.now();
      isAnimating = true;

      function ease(t) {
        // cubic-bezier(0.16, 1, 0.3, 1) approximation
        return 1 - Math.pow(1 - t, 4);
      }

      function step(now) {
        const t = Math.min(1, (now - start) / duration);
        window.scrollTo(0, startY + dy * ease(t));
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          // small lock-out so trailing wheel events don't cascade
          setTimeout(() => {
            isAnimating = false;
          }, 80);
        }
      }
      requestAnimationFrame(step);
    }

    function go(direction) {
      if (isAnimating) return;
      const sections = getSections();
      if (sections.length === 0) return;

      const y = window.scrollY;
      const vh = window.innerHeight;
      const idx = currentIndex(sections);
      const cur = sections[idx];
      const curTop = cur.offsetTop;
      const curBottom = curTop + cur.offsetHeight;

      if (direction > 0) {
        // scrolling down — if current section is taller than viewport
        // and we haven't reached its bottom, let native scroll continue
        if (cur.offsetHeight > vh + 8 && y + vh < curBottom - 8) {
          return; // free scroll inside tall section
        }
        const next = sections[idx + 1];
        if (next) animateTo(next.offsetTop);
      } else {
        // scrolling up — if inside tall section and not at top, free scroll
        if (cur.offsetHeight > vh + 8 && y > curTop + 8) {
          return;
        }
        const prev = sections[idx - 1];
        if (prev) {
          const prevTop = prev.offsetTop;
          // if prev is tall, land at its bottom so user sees its end
          if (prev.offsetHeight > vh + 8) {
            animateTo(prevTop + prev.offsetHeight - vh);
          } else {
            animateTo(prevTop);
          }
        }
      }
    }

    function onWheel(e) {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      // ignore tiny accidental wheel deltas (high-precision trackpads)
      if (Math.abs(e.deltaY) < 8) return;

      const sections = getSections();
      const idx = currentIndex(sections);
      const cur = sections[idx];
      if (!cur) return;
      const vh = window.innerHeight;
      const isTallSection = cur.offsetHeight > vh + 8;
      const y = window.scrollY;
      const atTop = y <= cur.offsetTop + 8;
      const atBottom = y + vh >= cur.offsetTop + cur.offsetHeight - 8;

      // inside tall section middle → let native scroll work
      if (isTallSection) {
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      e.preventDefault();
      go(e.deltaY > 0 ? 1 : -1);
    }

    function onKey(e) {
      if (isAnimating) return;
      if (e.key === "PageDown" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "PageUp" || e.key === "ArrowUp") {
        e.preventDefault();
        go(-1);
      }
    }

    function onTouchStart(e) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchEnd(e) {
      if (isAnimating) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const sections = getSections();
      const idx = currentIndex(sections);
      const cur = sections[idx];
      if (!cur) return;
      const vh = window.innerHeight;
      const isTall = cur.offsetHeight > vh + 8;
      const y = window.scrollY;
      const atTop = y <= cur.offsetTop + 8;
      const atBottom = y + vh >= cur.offsetTop + cur.offsetHeight - 8;
      if (isTall) {
        if (dy > 0 && !atBottom) return;
        if (dy < 0 && !atTop) return;
      }
      go(dy > 0 ? 1 : -1);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
