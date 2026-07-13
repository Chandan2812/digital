"use client";

import { Float, Line, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef } from "react";
import type { Group } from "three";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  ["360", "Brand systems shaped for search, social and paid growth"],
  ["8+", "Digital channels planned as one connected acquisition engine"],
  ["24/7", "Reputation, campaign and reporting visibility for decision makers"],
];

const beliefs = [
  "Strategy should be visible in every creative, page and campaign.",
  "A website is not decoration. It is the sharpest sales asset a brand owns.",
  "Growth feels better when performance, content and trust move together.",
];

const timeline = [
  ["Discover", "We map the market, the buyer mood, search intent and the gaps blocking enquiries."],
  ["Design", "We turn the strategy into interfaces, content systems, ads and brand moments that feel memorable."],
  ["Deploy", "We launch with tracking, testing and channel discipline so every move can be measured."],
  ["Scale", "We keep improving the system with sharper pages, stronger creatives and cleaner reporting."],
];

function AboutGalaxy() {
  const group = useRef<Group>(null);
  const points = useMemo(
    () => [
      [-1.9, -0.9, 0],
      [-0.7, 0.9, 0.1],
      [0.6, -0.25, 0.2],
      [1.65, 0.82, -0.1],
      [2.15, -0.65, 0.15],
    ] as [number, number, number][],
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = time * 0.12 + pointer.x * 0.22;
    group.current.rotation.x = pointer.y * 0.12;
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
        <Line points={points} color="#65bc4f" lineWidth={2} transparent opacity={0.85} />
        {points.map((point, index) => (
          <mesh key={`${point.join("-")}-${index}`} position={point}>
            <sphereGeometry args={[index === 2 ? 0.18 : 0.12, 32, 32]} />
            <meshStandardMaterial
              color={index % 2 ? "#ef3346" : "#65bc4f"}
              emissive={index % 2 ? "#ef3346" : "#00ff88"}
              emissiveIntensity={1.1}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
        ))}
        <mesh rotation={[1.1, 0.2, 0.4]}>
          <torusGeometry args={[1.15, 0.018, 16, 140]} />
          <meshStandardMaterial color="#155b9e" emissive="#155b9e" emissiveIntensity={1.3} />
        </mesh>
      </Float>
    </group>
  );
}

function AboutWebGL() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 44 }} dpr={[1, 1.6]}>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.42} />
      <pointLight color="#65bc4f" intensity={12} position={[3, 2, 4]} />
      <pointLight color="#ef3346" intensity={10} position={[-3, -1, 3]} />
      <pointLight color="#155b9e" intensity={12} position={[0, 4, 3]} />
      <Stars count={650} depth={38} factor={3.4} fade speed={0.45} />
      <AboutGalaxy />
    </Canvas>
  );
}

function useAboutMotion() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-about-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 72, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 84%" },
          },
        );
      });

      gsap.to(".about-orbit", {
        rotate: 140,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-timeline-track", {
        xPercent: -55,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-timeline",
          start: "top top",
          end: "+=180%",
          scrub: 1,
          pin: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

export default function AboutPage() {
  useAboutMotion();

  return (
    <main id="top" className="relative overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <section className="about-hero relative grid min-h-screen items-center overflow-hidden px-5 pb-16 pt-32 md:px-10 lg:px-16">
        <div className="absolute inset-0">
          <AboutWebGL />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,transparent,rgba(5,5,5,0.86)_62%),linear-gradient(180deg,rgba(5,5,5,0.22),#050505)]" />
        <div className="about-orbit pointer-events-none absolute left-1/2 top-1/2 h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

        <div className="relative z-10 max-w-7xl">
          <motion.p
            className="text-xs font-black uppercase tracking-[0.34em] text-[#65BC4F]"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            About Bigwig Media
          </motion.p>
          <motion.h1
            className="mt-7 max-w-6xl text-6xl font-black uppercase leading-[0.86] tracking-normal md:text-8xl lg:text-[9rem]"
            initial={{ y: 46, opacity: 0, filter: "blur(14px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            We Build Digital Systems That Make Brands Easier To Choose.
          </motion.h1>
          <motion.p
            className="mt-8 max-w-3xl text-lg leading-8 text-white/68 md:text-xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            Bigwig Media connects website experience, search demand, paid media,
            social proof and reporting into one growth engine for ambitious
            businesses.
          </motion.p>
        </div>
      </section>

      <section id="about" className="relative px-5 py-24 md:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-about-reveal>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ef3346]">
              What we believe
            </p>
            <h2 className="mt-6 text-5xl font-black uppercase leading-[0.9] md:text-7xl">
              Growth is not one campaign. It is a system.
            </h2>
          </div>
          <div className="grid gap-4">
            {beliefs.map((belief, index) => (
              <div
                data-about-reveal
                key={belief}
                className="border border-white/10 bg-white/[0.04] p-6"
              >
                <span className="text-sm font-black text-[#65BC4F]">0{index + 1}</span>
                <p className="mt-8 text-2xl font-black uppercase leading-tight text-white/88">
                  {belief}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-5 py-24 text-black md:px-10 lg:px-16">
        <div className="grid gap-5 md:grid-cols-3">
          {metrics.map(([value, label]) => (
            <article
              data-about-reveal
              key={value}
              className="min-h-72 border border-black/10 bg-[#f6f6f6] p-6"
            >
              <strong className="block text-7xl font-black uppercase leading-none text-[#155b9e] md:text-8xl">
                {value}
              </strong>
              <p className="mt-10 text-xl font-black uppercase leading-tight">
                {label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-timeline relative h-screen overflow-hidden bg-[#080808]">
        <div className="flex h-screen items-center overflow-hidden">
          <div className="about-timeline-track flex w-max gap-5 px-[8vw]">
            {timeline.map(([title, text], index) => (
              <article
                key={title}
                className="grid h-[68vh] w-[82vw] shrink-0 content-between border border-white/10 bg-[#111] p-6 md:w-[58vw] lg:w-[42vw]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black uppercase tracking-[0.24em] text-white/42">
                    Phase 0{index + 1}
                  </span>
                  <span className="h-12 w-12 rounded-full bg-[#65BC4F] shadow-[0_0_34px_rgba(101,188,79,0.55)]" />
                </div>
                <div>
                  <h3 className="text-5xl font-black uppercase leading-none md:text-7xl">
                    {title}
                  </h3>
                  <p className="mt-6 max-w-xl text-base leading-7 text-white/62 md:text-lg">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-28 text-center md:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(101,188,79,0.25),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(239,51,70,0.2),transparent_28%)]" />
        <div data-about-reveal className="relative max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
            Built for serious growth
          </p>
          <h2 className="mt-8 text-6xl font-black uppercase leading-[0.84] md:text-8xl lg:text-[9rem]">
            Strategy First.
            <br />
            Performance Always.
          </h2>
          <a
            href="#contact"
            className="mt-10 inline-flex rounded-full bg-[#65BC4F] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.42)] transition hover:bg-[#7DDC62]"
            style={{ color: "#050505" }}
          >
            Start a Conversation
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
