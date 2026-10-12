"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[3px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-gold-deep to-gold"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
