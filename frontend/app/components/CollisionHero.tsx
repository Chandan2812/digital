"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

type SliceStyle = CSSProperties & {
  "--slice-top": string;
  "--slice-bottom": string;
};

const SLICES = [
  { top: 0, bottom: 86, x: -8, y: -1, rotation: -0.42 },
  { top: 14, bottom: 72, x: 7, y: 2, rotation: 0.34 },
  { top: 28, bottom: 58, x: -5, y: -2, rotation: -0.24 },
  { top: 42, bottom: 44, x: 10, y: 1, rotation: 0.46 },
  { top: 56, bottom: 30, x: -9, y: 2, rotation: -0.38 },
  { top: 70, bottom: 16, x: 6, y: -1, rotation: 0.28 },
  { top: 84, bottom: 0, x: -4, y: 1, rotation: -0.18 },
] as const;

const PARTICLES = [
  { x: -236, y: -48, rotation: -16, size: 4 },
  { x: -184, y: 66, rotation: 12, size: 3 },
  { x: -118, y: -108, rotation: -8, size: 2 },
  { x: -68, y: 118, rotation: 18, size: 3 },
  { x: -18, y: -142, rotation: -4, size: 2 },
  { x: 42, y: 132, rotation: 8, size: 4 },
  { x: 96, y: -110, rotation: -14, size: 2 },
  { x: 158, y: 92, rotation: 16, size: 3 },
  { x: 222, y: -58, rotation: -12, size: 4 },
  { x: 282, y: 30, rotation: 10, size: 2 },
  { x: -304, y: 22, rotation: -10, size: 2 },
  { x: 18, y: 176, rotation: 5, size: 2 },
  { x: -18, y: -184, rotation: -5, size: 2 },
  { x: 126, y: -164, rotation: -15, size: 3 },
] as const;

function collisionDistance(element: HTMLElement) {
  return window.innerWidth / 2 + element.getBoundingClientRect().width + 120;
}

export default function CollisionHero() {
  const sceneRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const leftTravelRef = useRef<HTMLDivElement>(null);
  const rightTravelRef = useRef<HTMLDivElement>(null);
  const leftMassRef = useRef<HTMLDivElement>(null);
  const rightMassRef = useRef<HTMLDivElement>(null);
  const leftBaseRef = useRef<HTMLSpanElement>(null);
  const rightBaseRef = useRef<HTMLSpanElement>(null);
  const leftSliceStackRef = useRef<HTMLSpanElement>(null);
  const rightSliceStackRef = useRef<HTMLSpanElement>(null);
  const leftSlicesRef = useRef<HTMLSpanElement[]>([]);
  const rightSlicesRef = useRef<HTMLSpanElement[]>([]);
  const particleRefs = useRef<HTMLSpanElement[]>([]);
  const flashRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const leftTravel = leftTravelRef.current;
    const rightTravel = rightTravelRef.current;
    const leftMass = leftMassRef.current;
    const rightMass = rightMassRef.current;
    const leftBase = leftBaseRef.current;
    const rightBase = rightBaseRef.current;
    const leftSliceStack = leftSliceStackRef.current;
    const rightSliceStack = rightSliceStackRef.current;
    const flash = flashRef.current;
    const shockwave = shockwaveRef.current;
    const intro = introRef.current;
    const content = contentRef.current;

    if (
      !scene ||
      !camera ||
      !leftTravel ||
      !rightTravel ||
      !leftMass ||
      !rightMass ||
      !leftBase ||
      !rightBase ||
      !leftSliceStack ||
      !rightSliceStack ||
      !flash ||
      !shockwave ||
      !intro ||
      !content ||
      window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, CustomEase);

    const leftSlices = leftSlicesRef.current.filter(
      (slice): slice is HTMLSpanElement => Boolean(slice),
    );
    const rightSlices = rightSlicesRef.current.filter(
      (slice): slice is HTMLSpanElement => Boolean(slice),
    );
    const particles = particleRefs.current.filter(
      (particle): particle is HTMLSpanElement => Boolean(particle),
    );
    const splitTargets = [leftBase, rightBase];
    let split: SplitType | undefined;
    let timeline: gsap.core.Timeline | undefined;
    let refreshFrame = 0;
    let disposed = false;

    const context = gsap.context(() => {
      split = new SplitType(splitTargets, {
        types: "chars",
        tagName: "span",
        charClass: "collision-char",
      });

      const leftChars = Array.from(
        leftBase.querySelectorAll<HTMLElement>(".collision-char"),
      );
      const rightChars = Array.from(
        rightBase.querySelectorAll<HTMLElement>(".collision-char"),
      );
      const allChars = [...leftChars, ...rightChars];
      const allSlices = [...leftSlices, ...rightSlices];
      const allMasses = [leftMass, rightMass];
      const allTravels = [leftTravel, rightTravel];

      CustomEase.create("collision-drive", "0.48, 0.02, 0.72, 0.58");

      timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 2.8, 1960)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .set(allTravels, { force3D: true, willChange: "transform" }, 0)
        .set(allMasses, {
          force3D: true,
          transformPerspective: 1200,
          willChange: "transform",
        }, 0)
        .set(leftTravel, { x: () => -collisionDistance(leftTravel) }, 0)
        .set(rightTravel, { x: () => collisionDistance(rightTravel) }, 0)
        .set(leftMass, {
          autoAlpha: 1,
          scaleX: 1,
          scaleY: 1,
          rotationY: 8,
          rotation: -0.85,
          skewY: 1.1,
          filter: "blur(0px)",
          transformOrigin: "100% 50%",
        }, 0)
        .set(rightMass, {
          autoAlpha: 1,
          scaleX: 1,
          scaleY: 1,
          rotationY: -8,
          rotation: 0.85,
          skewY: -1.1,
          filter: "blur(0px)",
          transformOrigin: "0% 50%",
        }, 0)
        .set([leftBase, rightBase], { autoAlpha: 1 }, 0)
        .set([leftSliceStack, rightSliceStack], { autoAlpha: 0 }, 0)
        .set(allSlices, { x: 0, y: 0, rotation: 0 }, 0)
        .set(allChars, { x: 0, y: 0, rotation: 0 }, 0)
        .set(camera, { x: 0, y: 0, rotation: 0, force3D: true }, 0)
        .set(flash, { autoAlpha: 0, scaleX: 0.2, scaleY: 0.2 }, 0)
        .set(shockwave, { autoAlpha: 0, scale: 0.16 }, 0)
        .set(particles, { autoAlpha: 0, x: 0, y: 0, scale: 0.2 }, 0)
        .set(content, { autoAlpha: 0, y: 18 }, 0)
        .to(leftTravel, {
          x: 0,
          duration: 1.88,
          ease: "collision-drive",
        }, 0)
        .to(rightTravel, {
          x: 0,
          duration: 1.88,
          ease: "collision-drive",
        }, 0)
        .to(allMasses, {
          rotationY: 0,
          rotation: 0,
          skewY: 0,
          duration: 1.88,
          ease: "collision-drive",
        }, 0)
        .to(intro, {
          autoAlpha: 0,
          y: -22,
          scale: 0.985,
          duration: 0.52,
          ease: "power3.inOut",
        }, 0.18)
        .addLabel("impact", 1.88)
        .to(leftTravel, { x: 12, duration: 0.105, ease: "power2.in" }, "impact")
        .to(rightTravel, { x: -12, duration: 0.105, ease: "power2.in" }, "impact")
        .to(allMasses, {
          scaleX: 0.86,
          scaleY: 1.09,
          filter: "blur(3px)",
          duration: 0.105,
          ease: "power2.in",
        }, "impact")
        .to(leftChars, {
          x: (index) => [-3, 2, -2, 3, -1][index % 5],
          y: (index) => [1, -2, 2, -1, 1][index % 5],
          rotation: (index) => [-1.5, 1.2, -0.8, 1.4, -0.6][index % 5],
          duration: 0.105,
          ease: "power2.out",
        }, "impact")
        .to(rightChars, {
          x: (index) => [3, -2, 2, -3, 1][index % 5],
          y: (index) => [-1, 2, -2, 1, -1][index % 5],
          rotation: (index) => [1.5, -1.2, 0.8, -1.4, 0.6][index % 5],
          duration: 0.105,
          ease: "power2.out",
        }, "impact")
        .to(flash, {
          autoAlpha: 1,
          scaleX: 1,
          scaleY: 1,
          duration: 0.035,
          ease: "sine.out",
        }, "impact")
        .to(flash, {
          autoAlpha: 0,
          scaleX: 1.45,
          scaleY: 1.8,
          duration: 0.22,
          ease: "power2.out",
        }, "impact+=0.035")
        .set(shockwave, { autoAlpha: 0.78, scale: 0.16 }, "impact")
        .to(shockwave, {
          autoAlpha: 0,
          scale: 2,
          duration: 0.46,
          ease: "power2.out",
        }, "impact")
        .to(camera, { x: -3, y: 2, rotation: -0.1, duration: 0.055, ease: "sine.out" }, "impact")
        .to(camera, { x: 4, y: -2, rotation: 0.12, duration: 0.065, ease: "sine.inOut" }, "impact+=0.055")
        .to(camera, { x: -2, y: 1, rotation: -0.05, duration: 0.075, ease: "sine.inOut" }, "impact+=0.12")
        .to(camera, { x: 0, y: 0, rotation: 0, duration: 0.13, ease: "power2.out" }, "impact+=0.195")
        .to([leftSliceStack, rightSliceStack], { autoAlpha: 1, duration: 0.055, ease: "sine.out" }, "impact+=0.018")
        .to([leftBase, rightBase], { autoAlpha: 0, duration: 0.055, ease: "sine.in" }, "impact+=0.018")
        .to(leftSlices, {
          x: (index) => SLICES[index].x,
          y: (index) => SLICES[index].y,
          rotation: (index) => SLICES[index].rotation,
          duration: 0.16,
          ease: "power2.out",
        }, "impact+=0.07")
        .to(rightSlices, {
          x: (index) => -SLICES[index].x,
          y: (index) => SLICES[index].y,
          rotation: (index) => -SLICES[index].rotation,
          duration: 0.16,
          ease: "power2.out",
        }, "impact+=0.07")
        .to(leftTravel, { x: -8, duration: 0.2, ease: "power3.out" }, "impact+=0.105")
        .to(rightTravel, { x: 8, duration: 0.2, ease: "power3.out" }, "impact+=0.105")
        .to(allMasses, {
          scaleX: 1.025,
          scaleY: 0.985,
          filter: "blur(0.45px)",
          duration: 0.2,
          ease: "power3.out",
        }, "impact+=0.105")
        .to(allSlices, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: "power3.out",
        }, "impact+=0.18")
        .to(allChars, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.26,
          ease: "power3.out",
        }, "impact+=0.17")
        .to(leftTravel, { x: 2, duration: 0.18, ease: "back.out(1.35)" }, "impact+=0.3")
        .to(rightTravel, { x: -2, duration: 0.18, ease: "back.out(1.35)" }, "impact+=0.3")
        .to(allMasses, {
          scaleX: 0.994,
          scaleY: 1.006,
          filter: "blur(0px)",
          duration: 0.16,
          ease: "power2.out",
        }, "impact+=0.3")
        .to(leftTravel, { x: 0, duration: 0.18, ease: "sine.out" }, "impact+=0.48")
        .to(rightTravel, { x: 0, duration: 0.18, ease: "sine.out" }, "impact+=0.48")
        .to(allMasses, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.24,
          ease: "elastic.out(1, 0.72)",
        }, "impact+=0.46")
        .to([leftBase, rightBase], { autoAlpha: 1, duration: 0.075, ease: "sine.out" }, "impact+=0.52")
        .to([leftSliceStack, rightSliceStack], { autoAlpha: 0, duration: 0.075, ease: "sine.in" }, "impact+=0.52")
        .to(content, {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          ease: "power3.out",
        }, "impact+=0.68");

      PARTICLES.forEach((particle, index) => {
        const particleElement = particles[index];
        if (!particleElement) return;

        timeline
          ?.to(particleElement, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.03,
            ease: "sine.out",
          }, "impact+=0.022")
          .to(particleElement, {
            x: particle.x,
            y: particle.y,
            rotation: particle.rotation,
            scale: 0.1,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power3.out",
          }, "impact+=0.04");
      });
    }, scene);

    const scheduleRefresh = () => {
      if (disposed) return;
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        timeline?.invalidate();
        ScrollTrigger.refresh();
      });
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(scheduleRefresh);

    resizeObserver?.observe(leftBase);
    resizeObserver?.observe(rightBase);
    window.addEventListener("resize", scheduleRefresh, { passive: true });
    void document.fonts?.ready.then(scheduleRefresh);
    scheduleRefresh();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("resize", scheduleRefresh);
      resizeObserver?.disconnect();
      context.revert();
      split?.revert();
    };
  }, []);

  return (
    <section id="closing-collision" ref={sceneRef} className="collision-hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        Let&apos;s Build with Bigwig Media
      </h1>

      <div className="collision-hero__grid" aria-hidden="true" />
      <div className="collision-hero__halo collision-hero__halo--blue" aria-hidden="true" />
      <div className="collision-hero__halo collision-hero__halo--red" aria-hidden="true" />
      <div className="collision-hero__grain" aria-hidden="true" />

      <div ref={cameraRef} className="collision-hero__camera" aria-hidden="true">
        <div className="collision-word collision-word--left">
          <div className="collision-word__anchor">
            <div ref={leftTravelRef} className="collision-word__travel">
              <div ref={leftMassRef} className="collision-word__mass">
                <span ref={leftBaseRef} className="collision-word__base">
                  Let&apos;s
                </span>
                <span ref={leftSliceStackRef} className="collision-word__slices">
                  {SLICES.map((slice, index) => (
                    <span
                      key={`left-slice-${slice.top}`}
                      ref={(node) => {
                        if (node) leftSlicesRef.current[index] = node;
                      }}
                      className="collision-word__slice"
                      style={{
                        "--slice-top": `${slice.top}%`,
                        "--slice-bottom": `${slice.bottom}%`,
                      } as SliceStyle}
                    >
                      <span className="collision-word__slice-text">
                        Let&apos;s
                      </span>
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="collision-word collision-word--right">
          <div className="collision-word__anchor">
            <div ref={rightTravelRef} className="collision-word__travel">
              <div ref={rightMassRef} className="collision-word__mass">
                <span ref={rightBaseRef} className="collision-word__base">
                  Build
                </span>
                <span ref={rightSliceStackRef} className="collision-word__slices">
                  {SLICES.map((slice, index) => (
                    <span
                      key={`right-slice-${slice.top}`}
                      ref={(node) => {
                        if (node) rightSlicesRef.current[index] = node;
                      }}
                      className="collision-word__slice"
                      style={{
                        "--slice-top": `${slice.top}%`,
                        "--slice-bottom": `${slice.bottom}%`,
                      } as SliceStyle}
                    >
                      <span className="collision-word__slice-text">
                        Build
                      </span>
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div ref={flashRef} className="collision-impact-flash" />
        <div ref={shockwaveRef} className="collision-shockwave" />
        <div className="collision-particles">
          {PARTICLES.map((particle, index) => (
            <span
              key={`particle-${particle.x}-${particle.y}`}
              ref={(node) => {
                if (node) particleRefs.current[index] = node;
              }}
              className="collision-particle"
              style={{ "--particle-size": `${particle.size}px` } as CSSProperties}
            />
          ))}
        </div>
      </div>

      <div ref={introRef} className="collision-hero__intro">
        <p className="collision-hero__intro-kicker">BIGWIG MEDIA / GROWTH PARTNER</p>
        <h2>
          Make your next move
          <em>impossible to ignore.</em>
        </h2>
        <p className="collision-hero__intro-copy">
          We turn ambitious brands into digital experiences that earn attention and drive momentum.
        </p>
       
        <div className="collision-hero__scroll-cue" aria-hidden="true">
          <span className="collision-hero__scroll-line" />
          Scroll to begin
        </div>
      </div>

      <div ref={contentRef} className="collision-hero__content">
        <p className="collision-hero__eyebrow">DIGITAL GROWTH, BUILT TO LAST</p>
        <p className="collision-hero__copy">
          Strategy, search, creative, and performance systems engineered to move brands forward.
        </p>
        <Link href="#contact" className="collision-hero__cta">
          Start a project <span aria-hidden="true">{"\u2197"}</span>
        </Link>
      </div>
    </section>
  );
}

