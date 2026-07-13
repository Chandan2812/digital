"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        root.style.setProperty("--scroll", progress.toFixed(4));
        root.style.setProperty("--scroll-y", `${window.scrollY}px`);

        document.querySelectorAll<HTMLElement>("[data-motion]").forEach((item) => {
          const rect = item.getBoundingClientRect();
          const range = window.innerHeight + rect.height;
          const localProgress = (window.innerHeight - rect.top) / range;
          const clamped = Math.min(1, Math.max(0, localProgress));
          const centered = clamped - 0.5;
          item.style.setProperty("--progress", clamped.toFixed(4));
          item.style.setProperty("--move-x", `${centered * 120}px`);
          item.style.setProperty("--move-y", `${(1 - clamped) * 90}px`);
          item.style.setProperty("--tilt", `${centered * -10}deg`);
          item.style.setProperty("--zoom", `${1 + clamped * 0.08}`);
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
