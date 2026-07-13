"use client";

import { Float, Line, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const whoWeAre = [
  [
    "Digital Strategists",
    "We connect audience insight, channel planning and business goals before a single campaign goes live.",
  ],
  [
    "SEO Experts",
    "We build technical, local and content-led SEO systems that help brands earn qualified search demand.",
  ],
  [
    "Performance Marketers",
    "We plan Google and Meta campaigns around leads, cost control, conversion quality and repeatable ROI.",
  ],
  [
    "Creative Designers",
    "We create brand visuals, ad creatives and social assets that make people pause, trust and act.",
  ],
  [
    "Web Developers",
    "We design fast, responsive and conversion-focused websites that turn visitors into real enquiries.",
  ],
  [
    "Content Specialists",
    "We write content for search, social, ads and landing pages with clarity, authority and intent.",
  ],
];

const coreValues = [
  [
    "Transparency",
    "Clear strategy, honest timelines and readable reports keep every client close to the work.",
  ],
  [
    "Innovation",
    "We test new formats, tools and ideas without losing sight of what creates measurable growth.",
  ],
  [
    "Client Success",
    "Your growth goals shape our priorities, campaign rhythm and definition of a winning result.",
  ],
  [
    "Accountability",
    "We track what matters, explain what changed and take ownership of the next improvement.",
  ],
  [
    "Creativity",
    "Our ideas are built to be useful, memorable and strong enough to move people toward action.",
  ],
  [
    "Continuous Learning",
    "Platforms shift fast, so our team keeps improving strategy, execution and reporting every week.",
  ],
];

const whyChoose = [
  [
    "Data-Driven Strategy",
    "Every plan starts with market research, search intent, analytics and a clear conversion path.",
  ],
  [
    "ROI Focused Marketing",
    "We optimize campaigns for qualified enquiries, cost efficiency and revenue impact.",
  ],
  [
    "Dedicated Experts",
    "Specialists across SEO, ads, content, design and development work together on your account.",
  ],
  [
    "Transparent Reporting",
    "You see the numbers, the insights behind them and the action plan for the next cycle.",
  ],
  [
    "Customized Solutions",
    "No copy-paste retainers. Your industry, budget and growth stage shape the strategy.",
  ],
  [
    "Long-Term Partnership",
    "We build marketing systems that compound through testing, learning and consistent improvement.",
  ],
];

const numbers = [
  ["250", "+", "Projects Delivered"],
  ["95", "%", "Client Retention"],
  ["8", "+", "Years Experience"],
  ["15", "+", "Marketing Experts"],
  ["12", "+", "Industries Served"],
];

const industries = [
  "Manufacturing",
  "Healthcare",
  "Education",
  "Real Estate",
  "E-commerce",
  "Startups",
  "Hospitality",
  "IT Services",
];

function AboutGalaxy() {
  const group = useRef<Group>(null);
  const points = useMemo(
    () =>
      [
        [-2.15, -0.85, 0],
        [-1.05, 0.88, 0.1],
        [0.2, -0.16, 0.25],
        [1.28, 0.82, -0.1],
        [2.2, -0.66, 0.15],
      ] as [number, number, number][],
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = time * 0.12 + pointer.x * 0.22;
    group.current.rotation.x = pointer.y * 0.14;
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.8}>
        <Line points={points} color="#65bc4f" lineWidth={2} transparent opacity={0.86} />
        {points.map((point, index) => (
          <mesh key={`${point.join("-")}-${index}`} position={point}>
            <sphereGeometry args={[index === 2 ? 0.2 : 0.12, 32, 32]} />
            <meshStandardMaterial
              color={index % 2 ? "#ef3346" : "#65bc4f"}
              emissive={index % 2 ? "#ef3346" : "#00ff88"}
              emissiveIntensity={1.15}
              metalness={0.55}
              roughness={0.18}
            />
          </mesh>
        ))}
        <mesh rotation={[1.08, 0.2, 0.36]}>
          <torusGeometry args={[1.26, 0.018, 16, 150]} />
          <meshStandardMaterial color="#155b9e" emissive="#155b9e" emissiveIntensity={1.3} />
        </mesh>
        <mesh rotation={[0.36, -0.8, 0.1]}>
          <torusGeometry args={[1.72, 0.01, 16, 150]} />
          <meshStandardMaterial color="#65bc4f" emissive="#00ff88" emissiveIntensity={0.85} />
        </mesh>
      </Float>
    </group>
  );
}

function AboutWebGL() {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 44 }} dpr={[1, 1.6]}>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.42} />
      <pointLight color="#65bc4f" intensity={12} position={[3, 2, 4]} />
      <pointLight color="#ef3346" intensity={10} position={[-3, -1, 3]} />
      <pointLight color="#155b9e" intensity={12} position={[0, 4, 3]} />
      <Stars count={760} depth={42} factor={3.5} fade speed={0.45} />
      <AboutGalaxy />
    </Canvas>
  );
}

function AnimatedNumber({
  value,
  suffix,
}: {
  value: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(count, Number(value), {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return controls.stop;
  }, [count, inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  accent = "green",
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  accent?: "green" | "red" | "blue";
  tone?: "dark" | "light";
}) {
  const accentClass =
    accent === "red"
      ? "text-[#ef3346]"
      : accent === "blue"
        ? "text-[#155b9e]"
        : "text-[#65BC4F]";

  return (
    <div data-about-reveal className="mx-auto max-w-5xl text-center">
      <p className={`text-xs font-black uppercase tracking-[0.32em] ${accentClass}`}>
        {eyebrow}
      </p>
      <h2 className="mt-7 text-4xl font-black uppercase leading-[0.9] md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {copy ? (
        <p
          className={`mx-auto mt-6 max-w-3xl text-base leading-7 md:text-lg md:leading-8 ${
            tone === "light" ? "text-black/62" : "text-white/64"
          }`}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

function useAboutMotion() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

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

      gsap.fromTo(
        ".about-hero-copy > *",
        { y: 70, opacity: 0, filter: "blur(14px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
        },
      );

      gsap.to(".about-orbit", {
        rotate: 150,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-hero-bg", {
        scale: 1.18,
        opacity: 0.62,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-who-track", {
        xPercent: -58,
        ease: "none",
        scrollTrigger: {
          trigger: ".who-section",
          start: "top top",
          end: "+=170%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.fromTo(
        ".value-row",
        { x: (index: number) => (index % 2 === 0 ? -90 : 90), opacity: 0.25 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 68%",
            end: "bottom 54%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".choose-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".choose-section",
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1,
          },
        },
      );

      gsap.to(".number-track", {
        xPercent: -24,
        ease: "none",
        scrollTrigger: {
          trigger: ".numbers-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".industry-marquee", {
        xPercent: -50,
        ease: "none",
        repeat: -1,
        duration: 24,
      });
    });

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

export default function AboutPage() {
  useAboutMotion();

  return (
    <main id="top" className="relative overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <section className="about-hero relative grid min-h-screen items-center overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pt-40 lg:px-16">
        <div className="about-hero-bg absolute inset-0">
          <AboutWebGL />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.92),rgba(5,5,5,0.52)_48%,rgba(5,5,5,0.88)),radial-gradient(circle_at_72%_42%,transparent,rgba(5,5,5,0.84)_58%),linear-gradient(180deg,rgba(5,5,5,0.14),#050505)]" />
        <div className="about-orbit pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

        <div className="about-hero-copy relative z-10 max-w-7xl">
          <motion.p
            className="text-xs font-black uppercase tracking-[0.34em] text-[#65BC4F]"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            About Bigwig Media
          </motion.p>
          <motion.h1
            className="mt-7 max-w-6xl text-5xl font-black uppercase leading-[0.88] tracking-normal md:text-7xl lg:text-[7.4rem]"
            initial={{ y: 46, opacity: 0, filter: "blur(14px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            We Don&apos;t Just Market Brands. We Build Their Growth.
          </motion.h1>
          <motion.p
            className="mt-8 max-w-3xl text-lg leading-8 text-white/72 md:text-xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            Bigwig Media is a full-service digital marketing agency helping businesses grow through strategy, creativity and performance-driven marketing.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.7 }}
          >
            <a
              className="inline-flex justify-center rounded-full bg-[#65BC4F] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.45)] transition hover:-translate-y-1 hover:bg-[#7DDC62]"
              href="#contact"
              style={{ color: "#050505" }}
            >
              Book Free Consultation
            </a>
            <Link
              className="inline-flex justify-center rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:-translate-y-1 hover:border-[#65BC4F]/70 hover:bg-white/[0.08]"
              href="/#work"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="who-section relative h-screen overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(101,188,79,0.18),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(21,91,158,0.16),transparent_34%)]" />
        <div className="relative flex h-screen items-center overflow-hidden">
          <div className="about-who-track flex w-max items-stretch gap-8 px-[8vw]">
            <div className="grid h-[70vh] w-[86vw] shrink-0 content-between md:w-[54vw] lg:w-[42vw]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
                  Who We Are
                </p>
                <h2 className="mt-7 text-5xl font-black uppercase leading-[0.86] md:text-7xl">
                  One team.
                  <br />
                  Six growth disciplines.
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-8 text-white/64">
                We bring specialists together around one goal: helping your business attract the right audience, earn trust faster and turn marketing activity into growth.
              </p>
            </div>

            {whoWeAre.map(([title, text], index) => (
              <article
                key={title}
                className="group grid h-[70vh] w-[78vw] shrink-0 content-between border-l border-white/14 pl-6 md:w-[42vw] lg:w-[30vw]"
              >
                <span className="text-[8rem] font-black leading-none text-white/[0.06] transition group-hover:text-[#65BC4F]/30 md:text-[10rem]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-4xl font-black uppercase leading-none transition group-hover:text-[#65BC4F] md:text-5xl">
                    {title}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-8 text-white/62">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section relative overflow-hidden bg-white px-5 py-28 text-black md:px-10 lg:px-16">
        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-about-reveal className="lg:sticky lg:top-32 lg:h-fit">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef3346]">
              Core Values
            </p>
            <h2 className="mt-7 text-5xl font-black uppercase leading-[0.86] md:text-7xl">
              Standards that keep the work sharp.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-black/62">
              Premium marketing is not only about better ideas. It is about the discipline, honesty and pace that make those ideas work in the real world.
            </p>
          </div>

          <div className="divide-y divide-black/10">
            {coreValues.map(([title, text], index) => (
              <article
                key={title}
                className="value-row grid gap-6 py-8 md:grid-cols-[120px_1fr]"
              >
                <span className="text-5xl font-black leading-none text-[#155b9e]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-3xl font-black uppercase leading-none md:text-5xl">
                    {title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-black/62">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="choose-section relative overflow-hidden px-5 py-28 md:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(21,91,158,0.18),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(101,188,79,0.14),transparent_32%)]" />
        <div className="relative grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div data-about-reveal className="lg:sticky lg:top-32 lg:h-fit">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
              Why Choose Bigwig Media
            </p>
            <h2 className="mt-7 text-5xl font-black uppercase leading-[0.86] md:text-7xl">
              A growth partner, not a task vendor.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-white/64">
              We align SEO, ads, content, design and web development into one system with clear reporting and visible momentum.
            </p>
          </div>

          <div className="grid gap-0">
            {whyChoose.map(([title, text], index) => (
              <article key={title} className="group relative py-9">
                <span className="choose-line absolute left-0 top-0 h-px w-full bg-[#65BC4F]/70" />
                <div className="grid gap-6 md:grid-cols-[120px_1fr]">
                  <span className="text-6xl font-black leading-none text-white/[0.08] transition group-hover:text-[#65BC4F]/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-3xl font-black uppercase leading-none transition group-hover:translate-x-3 group-hover:text-[#65BC4F] md:text-5xl">
                      {title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">
                      {text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="numbers-section relative overflow-hidden bg-[#080808] py-28">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(239,51,70,0.16),transparent_34%),radial-gradient(circle_at_76%_32%,rgba(101,188,79,0.18),transparent_30%)]" />
        <div className="relative px-5 md:px-10 lg:px-16">
          <div data-about-reveal className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
              Numbers That Speak
            </p>
            <h2 className="mt-7 text-5xl font-black uppercase leading-[0.86] md:text-7xl">
              Proof that our growth systems keep moving.
            </h2>
          </div>
        </div>
        <div className="number-track relative mt-16 flex w-max gap-10 px-5 md:px-10 lg:px-16">
          {numbers.map(([value, suffix, label]) => (
            <article
              key={label}
              className="grid min-h-72 w-[72vw] shrink-0 content-between border-t border-white/15 pt-6 md:w-[38vw] lg:w-[28vw]"
            >
              <strong className="block text-7xl font-black leading-none text-[#65BC4F] md:text-8xl">
                <AnimatedNumber value={value} suffix={suffix} />
              </strong>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-white/58">
                {label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-28 md:px-10 lg:px-16">
        <SectionIntro
          eyebrow="Industries We Serve"
          title="Flexible strategy for different markets, buyers and sales cycles."
          copy="From local lead generation to national visibility, we shape campaigns around the way your customers search, compare and decide."
          accent="blue"
        />

        <div className="mt-16 overflow-hidden border-y border-white/10 py-8">
          <div className="industry-marquee flex w-max gap-5">
            {industries.concat(industries).map((industry, index) => (
              <span
                key={`${industry}-${index}`}
                className="shrink-0 rounded-full border border-white/14 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white/74 transition hover:border-[#65BC4F] hover:bg-[#65BC4F] hover:text-[#050505]"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {industries.slice(0, 4).map((industry, index) => (
            <div
              data-about-reveal
              key={industry}
              className="border-t border-white/12 pt-5"
            >
              <span className="text-xs font-black uppercase tracking-[0.22em] text-[#65BC4F]">
                Sector {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-6 text-3xl font-black uppercase leading-none">
                {industry}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-28 text-center md:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(101,188,79,0.25),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(239,51,70,0.2),transparent_28%)]" />
        <div data-about-reveal className="relative max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
            Built for serious growth
          </p>
          <h2 className="mt-8 text-5xl font-black uppercase leading-[0.86] md:text-8xl lg:text-[8.5rem]">
            Strategy First.
            <br />
            Performance Always.
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/70">
            When your brand needs sharper visibility, better leads and a digital presence that feels premium, Bigwig Media builds the system to get you there.
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex rounded-full bg-[#65BC4F] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.42)] transition hover:-translate-y-1 hover:bg-[#7DDC62]"
            style={{ color: "#050505" }}
          >
            Book Free Consultation
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
