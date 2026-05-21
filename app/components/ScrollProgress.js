"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // only mount on mobile / coarse pointers — desktop uses panel scroll
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    setEnabled(mq.matches);
    const onChange = (e) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!enabled) return null;

  return <Bar />;
}

function Bar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, transparent 0%, #00bfdf 60%, #a8f0ff 100%)",
      }}
    />
  );
}
