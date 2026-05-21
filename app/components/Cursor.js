"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onImage, setOnImage] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);

    // direct transform — no React state for position, no lag
    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let rafId = null;

    const animate = () => {
      const dx = target.x - ring.x;
      const dy = target.y - ring.y;
      ring.x += dx * 0.18;
      ring.y += dy * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 16}px, ${ring.y - 16}px, 0)`;
      }
      // stop the loop once we're close enough — saves CPU when idle
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(animate);
    };

    const move = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x - 4}px, ${target.y - 4}px, 0)`;
      }
      // restart loop only if it stopped
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const over = (e) => {
      if (e.target.closest && e.target.closest("a, button, [data-cursor='hover']")) {
        setHovering(true);
      }
      if (e.target.closest && e.target.closest("img, figure")) {
        setOnImage(true);
      }
    };
    const out = (e) => {
      if (e.target.closest && e.target.closest("a, button, [data-cursor='hover']")) {
        setHovering(false);
      }
      if (e.target.closest && e.target.closest("img, figure")) {
        setOnImage(false);
      }
    };
    const leave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const enter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* small dot — white on dark, black on images */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] w-2 h-2 rounded-full transition-[opacity,background-color] duration-200"
        style={{ willChange: "transform", backgroundColor: onImage ? "#000" : "#fff" }}
      />
      {/* trailing ring — grows on hover */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99] rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          marginLeft: hovering ? -12 : 0,
          marginTop: hovering ? -12 : 0,
          borderColor: hovering ? "#00bfdf" : "rgba(250, 250, 250, 0.3)",
          backgroundColor: hovering ? "rgba(0, 191, 223, 0.1)" : "transparent",
          willChange: "transform, width, height",
        }}
      />
    </>
  );
}
