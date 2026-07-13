"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import BigwigWebGL from "./components/BigwigWebGL";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

const typingWords = [
  "SEO That Drives Organic Growth",
  "Websites That Convert Visitors",
  "Google & Meta Ads That Generate Leads",
  "Social Media That Builds Brands",
  "Data-Driven Marketing Strategies",
  "Growth Backed By Analytics",
];
const services = [
  [
    "Website Development",
    "Fast, responsive and conversion-focused websites for brands that need leads, trust and measurable growth.",
    "#155b9e",
    "https://www.bigwigmediadigital.com/services/website-development-company-in-delhi",
  ],
  [
    "Search Engine Optimization",
    "Technical SEO, content planning and ranking strategy built to increase qualified organic traffic.",
    "#65BC4F",
    "https://www.bigwigmediadigital.com/services/search-engine-optimization",
  ],
  [
    "Social Media Optimization",
    "Profile systems, creative calendars and platform hygiene that make your brand look active and credible.",
    "#ef3346",
    "https://www.bigwigmediadigital.com/services/social-media-optimization",
  ],
  [
    "Social Media Marketing",
    "Campaigns, creatives and paid social funnels designed to turn attention into enquiries.",
    "#65BC4F",
    "https://www.bigwigmediadigital.com/services/social-media-marketing",
  ],
  [
    "Performance Marketing",
    "ROI-led ads across Google, Meta and high-intent channels with tracking, testing and reporting.",
    "#155b9e",
    "https://www.bigwigmediadigital.com/services/performance-marketing",
  ],
  [
    "Online Reputation Management",
    "Search, review and sentiment control for brands that need trust before the first conversation.",
    "#ffffff",
    "https://www.bigwigmediadigital.com/services/online-reputation-management",
  ],
  [
    "Graphic Designing & Video Editing",
    "Premium visual assets, ad creatives, reels and brand content that improve recall and click-through.",
    "#ef3346",
    "https://www.bigwigmediadigital.com/services/graphic-designing",
  ],
  [
    "Email Marketing",
    "Automated campaigns, newsletters and nurture flows that bring prospects back into your pipeline.",
    "#65BC4F",
    "https://www.bigwigmediadigital.com/services/email-marketing",
  ],
];
const projects = [
  {
    title: "Website Development",
    description:
      "High-converting, fast and responsive websites designed to generate more enquiries.",
  },
  {
    title: "Search Engine Optimization",
    description:
      "Improve Google rankings, organic traffic and long-term online visibility.",
  },
  {
    title: "Performance Marketing",
    description:
      "Google Ads and Meta campaigns focused on maximizing ROI and lead generation.",
  },
  {
    title: "Social Media Marketing",
    description:
      "Creative campaigns that increase engagement, brand awareness and customer acquisition.",
  },
  {
    title: "Online Reputation Management",
    description:
      "Build trust by improving reviews, brand perception and search visibility.",
  },
  {
    title: "Brand Strategy",
    description:
      "Create a consistent brand identity that connects with your target audience.",
  },
];
const faqs = [
  [
    "What digital marketing services does Bigwig Media offer?",
    "We provide complete digital marketing solutions including Website Development, Search Engine Optimization (SEO), Google Ads, Meta Ads, Social Media Marketing, Online Reputation Management, Branding, Content Marketing and Email Marketing.",
  ],
  [
    "How do you create a marketing strategy for my business?",
    "We begin by understanding your business, competitors, target audience and goals. Based on this research, we build a customized strategy designed to generate qualified leads, increase visibility and maximize return on investment.",
  ],
  [
    "How long does it take to see results?",
    "Paid advertising can start generating leads within days, while SEO typically shows measurable improvements within 3 to 6 months. Every business and industry has different timelines, and we provide transparent progress reports throughout the campaign.",
  ],
  [
    "Will I receive regular reports on campaign performance?",
    "Yes. We provide detailed performance reports with key metrics such as website traffic, leads, conversions, keyword rankings and campaign performance so you always know how your marketing investment is performing.",
  ],
  [
    "Do you work with businesses from different industries?",
    "Yes. We work with startups, local businesses, manufacturers, healthcare, education, real estate, e-commerce and service-based companies. Every strategy is customized to fit your industry and business goals.",
  ],
  [
    "Why should I choose Bigwig Media over other agencies?",
    "We focus on measurable business growth rather than vanity metrics. Our team combines strategy, creativity, technology and performance marketing to help businesses generate more qualified leads, improve online visibility and achieve sustainable long-term growth.",
  ],
];

const stats = [
  {
    value: "250+",
    label: "Projects Delivered",
  },
  {
    value: "95%",
    label: "Client Retention",
  },
  {
    value: "12+",
    label: "Industries Served",
  },
  {
    value: "8+",
    label: "Years Experience",
  },
  {
    value: "15+",
    label: "Marketing Experts",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

const features = [
  {
    title: "SEO Strategy",
    desc: "Rank higher and attract qualified organic traffic.",
  },
  {
    title: "Performance Ads",
    desc: "Google & Meta campaigns focused on measurable ROI.",
  },
  {
    title: "Creative Content",
    desc: "Content that builds trust and converts visitors.",
  },
  {
    title: "Data Analytics",
    desc: "Track every click, lead and marketing performance.",
  },
];

const testimonials = [
  {
    role: "Manufacturing Company",
    quote:
      "Bigwig Media completely transformed our online presence. Our new website and SEO strategy brought us more qualified enquiries than ever before.",
  },
  {
    role: "Healthcare Brand",
    quote:
      "Their Google Ads and social media campaigns consistently generated high-quality leads while keeping our advertising budget efficient.",
  },
  {
    role: "E-commerce Business",
    quote:
      "From branding to performance marketing, the team delivered measurable growth with clear reporting and excellent communication throughout the project.",
  },
];

function useCinematicMotion() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 90, opacity: 0, rotateX: -18, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          },
        );
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".hero-scene",
            start: "top top",
            end: "+=160%",
            scrub: 1,
            pin: true,
          },
        })
        .to(
          ".hero-title",
          { y: -160, scale: 0.72, opacity: 0, filter: "blur(18px)" },
          0,
        )
        .to(".hero-webgl", { scale: 1.42, opacity: 0.55 }, 0)
        .to(".hero-orbit", { rotate: 110, scale: 1.4 }, 0)
        .to(".hero-next-signal", { y: 0, opacity: 1, scale: 1 }, 0.35);

      gsap.fromTo(
        ".story-letter",
        { opacity: 0, rotateX: -90, y: 80 },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          stagger: 0.018,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".story-scene",
            start: "top 58%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      );

      gsap.to(".services-track", {
        xPercent: -82,
        ease: "none",
        scrollTrigger: {
          trigger: ".services-scene",
          start: "top top",
          end: "+=420%",
          scrub: 1,
          pin: true,
        },
      });

      gsap.to(".portfolio-screen-inner", {
        yPercent: -68,
        ease: "none",
        scrollTrigger: {
          trigger: ".portfolio-scene",
          start: "top top",
          end: "+=240%",
          scrub: 1,
          pin: true,
        },
      });

      gsap.to(".globe-line", {
        strokeDashoffset: 0,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".results-scene",
          start: "top 65%",
          end: "bottom 70%",
          scrub: 1,
        },
      });
    });

    const magneticItems = document.querySelectorAll<HTMLElement>(".magnetic");
    const move = (event: MouseEvent) => {
      const cursor = document.querySelector<HTMLElement>(".custom-cursor");
      if (cursor) {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const magneticHandlers: Array<() => void> = [];
    magneticItems.forEach((item) => {
      const onMove = (event: MouseEvent) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      };
      const onLeave = () => {
        item.style.transform = "translate(0, 0)";
      };
      item.addEventListener("mousemove", onMove);
      item.addEventListener("mouseleave", onLeave);
      magneticHandlers.push(() => {
        item.removeEventListener("mousemove", onMove);
        item.removeEventListener("mouseleave", onLeave);
      });
    });

    window.addEventListener("mousemove", move);

    return () => {
      cancelAnimationFrame(rafId);
      magneticHandlers.forEach((cleanup) => cleanup());
      window.removeEventListener("mousemove", move);
      ctx.revert();
      lenis.destroy();
    };
  }, []);
}

function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#050505] text-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-center">
            <motion.div
              className="mx-auto mb-8 h-28 w-28 rounded-[36px] border border-white/15 bg-white p-5"
              animate={{
                borderRadius: ["36px", "999px", "36px"],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/bigwig-logo.png"
                alt=""
                width={160}
                height={60}
                className="h-full w-full object-contain"
              />
            </motion.div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#65BC4F]">
              Loading Bigwig Media
            </p>
            <motion.div className="mt-6 h-1 w-72 overflow-hidden bg-white/10">
              <motion.span
                className="block h-full bg-[#65BC4F]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TypingLine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % typingWords.length);
    }, 1050);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex min-h-8 items-center text-[#65BC4F]">
      {typingWords[index]}
      <span className="ml-2 inline-block h-6 w-px animate-pulse bg-[#65BC4F]" />
    </span>
  );
}

export default function Home() {
  useCinematicMotion();
  const story = useMemo(
    () => "WE DON'T SELL MARKETING. WE BUILD BUSINESS GROWTH.",
    [],
  );
  const storyLetters = story.split("");

  return (
    <main className="relative bg-[#050505] text-white">
      <Loader />
      <div className="custom-cursor pointer-events-none fixed left-0 top-0 z-[90] hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#65BC4F] mix-blend-difference transition-[width,height] duration-200 md:block" />
      <Navbar />

      <section
        id="top"
        className="hero-scene relative min-h-[720px] overflow-hidden md:min-h-screen"
      >
        <div className="hero-webgl absolute inset-0">
          <BigwigWebGL />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent,rgba(5,5,5,0.82)_70%),linear-gradient(180deg,rgba(5,5,5,0.1),#050505)]" />
        <div className="hero-orbit absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="hero-title relative z-10 grid min-h-[720px] place-items-center px-5 py-16 text-center md:min-h-screen md:pt-40">
          <div>
            <p className="mb-6 text-xs font-black uppercase tracking-[0.35em] text-[#65BC4F]">
              BIGWIG MEDIA • DIGITAL GROWTH PARTNER
            </p>

            <h1 className="mx-auto max-w-7xl text-5xl font-black uppercase leading-[0.86] tracking-normal md:text-6xl lg:text-[6rem]">
              DISCOVER HOW WE TURN
              <br />
              IDEAS INTO CUSTOMERS,
              <br />
              AND STRATEGIES INTO GROWTH.
            </h1>

            <p className="mt-8 text-lg font-bold uppercase tracking-[0.18em] text-[#65BC4F]">
              <TypingLine />
            </p>
          </div>
        </div>
        <div className="hero-next-signal absolute inset-x-0 bottom-12 z-10 translate-y-16 scale-95 px-5 text-center opacity-0">
          <p className="mx-auto max-w-5xl text-3xl font-black uppercase leading-[0.9] md:text-6xl">
            SEE HOW WE PLAN,
            <br />
            EXECUTE &
            <br />
            SCALE DIGITAL GROWTH.
          </p>
        </div>
      </section>

      <section
        id="story"
        className="story-scene relative min-h-screen overflow-hidden px-5 py-32 md:px-10 lg:px-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(239,51,70,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(101,188,79,0.16),transparent_32%)]" />

        <p
          data-reveal
          className="relative text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]"
        >
          OUR PHILOSOPHY
        </p>

        <h2 className="relative mt-10 max-w-7xl text-6xl font-black uppercase leading-[0.88] tracking-normal md:text-7xl lg:text-[7rem]">
          {storyLetters.map((letter, index) => (
            <span
              className="story-letter inline-block origin-bottom"
              key={`${letter}-${index}`}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </h2>

        <p
          data-reveal
          className="relative mt-16 max-w-4xl text-lg leading-9 text-white/70 md:text-2xl"
        >
          Every successful business needs more than just traffic or followers.
          It needs a strategy that attracts the right audience, builds trust,
          converts visitors into customers, and creates sustainable growth.
          That&apos;s exactly what we build.
        </p>
      </section>

      <section
        id="about"
        className="relative min-h-screen overflow-hidden bg-[#0a0a0a] px-5 py-28 md:px-10 lg:px-16"
      >
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(21,91,158,0.18),transparent_38%),radial-gradient(circle_at_72%_30%,rgba(239,51,70,0.2),transparent_28%)]" />
        <div className="relative grid min-h-[70vh] items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
              WHY BIGWIG MEDIA
            </p>

            <h2 className="mt-8 text-5xl font-black uppercase leading-[0.9] md:text-7xl">
              EVERY CAMPAIGN.
              <br />
              EVERY CLICK.
              <br />
              EVERY RESULT.
            </h2>
          </div>
          <div
            data-reveal
            className="relative min-h-[520px] border border-white/10 bg-black/40 p-5 shadow-2xl shadow-black/50"
          >
            <div className="absolute inset-5 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_25%_65%,rgba(101,188,79,0.32),transparent_22%),radial-gradient(circle_at_76%_35%,rgba(239,51,70,0.28),transparent_20%)]" />
            <div className="relative grid h-full grid-cols-2 gap-4">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col justify-end border border-white/10 bg-white/[0.03] p-5"
                >
                  <h3 className="text-2xl font-black uppercase">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="services-scene relative h-screen overflow-hidden bg-[#050505]"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="services-track flex w-max gap-5 px-[8vw]">
            {services.map(([title, text, color, href], index) => (
              <a
                key={title}
                href={href}
                className="group grid h-[76vh] w-[88vw] shrink-0 content-between overflow-hidden border border-white/10 bg-[#111111] p-6 transition hover:border-[#65BC4F]/50 md:w-[70vw] md:p-8 lg:w-[58vw] xl:w-[52vw]"
                style={{ boxShadow: `inset 0 0 140px ${color}22` }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-black uppercase tracking-[0.24em] text-white/45">
                    0{index + 1}
                  </span>
                  <span
                    className="h-16 w-16 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
                <div>
                  <h3 className="max-w-[15ch] text-[clamp(2.2rem,5vw,4.9rem)] font-black uppercase leading-[0.92] tracking-normal [overflow-wrap:normal] [word-break:normal] md:max-w-[16ch] xl:text-[4rem]">
                    {title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-white/62 md:text-lg">
                    {text}
                  </p>
                  <span className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#65BC4F] transition group-hover:border-[#65BC4F]/70 group-hover:bg-[#65BC4F] group-hover:text-[#050505]">
                    View Service
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="work"
        className="portfolio-scene relative h-screen overflow-hidden bg-white px-5 py-24 text-black md:px-10 lg:px-16"
      >
        <div className="grid h-full items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div data-reveal>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#155b9e]">
              OUR EXPERTISE
            </p>

            <h2 className="mt-8 text-5xl font-black uppercase leading-[0.9] md:text-7xl">
              EVERYTHING YOUR
              <br />
              BUSINESS NEEDS
              <br />
              TO GROW ONLINE.
            </h2>
          </div>
          <div className="mx-auto w-full max-w-4xl">
            <div className="rounded-[34px] border-[14px] border-[#111] bg-[#050505] p-4 shadow-2xl">
              <div className="h-[460px] overflow-hidden rounded-[18px] bg-[#0a0a0a]">
                <div className="portfolio-screen-inner grid gap-4 p-5">
                  {projects.concat(projects).map((project, index) => (
                    <div
                      key={`${project.title}-${index}`}
                      className="min-h-64 border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(101,188,79,0.22),transparent_30%),linear-gradient(135deg,#101010,#050505)] p-6 text-white"
                    >
                      <span className="text-xs font-black uppercase tracking-[0.24em] text-[#65BC4F]">
                        Our Expertise
                      </span>

                      <h3 className="mt-10 text-5xl font-black uppercase leading-none">
                        {project.title}
                      </h3>

                      <p className="mt-4 text-white/55">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-auto h-6 w-[82%] rounded-b-[40px] bg-[#111]" />
          </div>
        </div>
      </section>

      <section
        id="results"
        className="results-scene relative overflow-hidden bg-[#050505] px-5 py-28 md:px-10 lg:px-16"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
              RESULTS THAT MATTER
            </p>

            <h2 className="mt-8 text-5xl font-black uppercase leading-[0.9] md:text-7xl">
              DIGITAL STRATEGIES
              <br />
              THAT CREATE
              <br />
              REAL BUSINESS GROWTH.
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-[#65BC4F]/40 hover:bg-white/[0.08]"
                >
                  <strong className="block text-4xl font-black text-[#65BC4F]">
                    {item.value}
                  </strong>

                  <span className="mt-3 block text-sm uppercase tracking-[0.18em] text-white/55">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[620px] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(21,91,158,0.24),transparent_58%)]">
            <svg
              viewBox="0 0 600 600"
              className="absolute inset-0 h-full w-full"
            >
              {[
                "M130 260 C230 120 410 120 480 250",
                "M140 370 C260 470 400 470 505 335",
                "M300 95 C360 220 350 410 275 515",
              ].map((line) => (
                <path
                  key={line}
                  className="globe-line"
                  d={line}
                  fill="none"
                  stroke="#65BC4F"
                  strokeWidth="2"
                  strokeDasharray="700"
                  strokeDashoffset="700"
                />
              ))}
            </svg>
            {[
              "left-[18%] top-[42%]",
              "left-[58%] top-[28%]",
              "left-[70%] top-[62%]",
              "left-[38%] top-[72%]",
            ].map((pos) => (
              <span
                key={pos}
                className={`absolute ${pos} h-4 w-4 rounded-full bg-[#65BC4F] shadow-[0_0_30px_#00FF88]`}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="clients"
        className="overflow-hidden bg-white px-5 py-28 text-black md:px-10 lg:px-16"
      >
        <div data-reveal className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef3346]">
            Testimonials
          </p>
          <h2 className="mt-8 text-5xl font-black uppercase leading-[0.9] md:text-8xl">
            Bigwig helped us turn traffic into qualified enquiries.
          </h2>
        </div>
        <div className="testimonial-wheel mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.role}
              className="min-h-72 border border-black/10 bg-[#f7f7f7] p-6 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#155b9e]">
                {item.role}
              </span>

              <p className="mt-10 text-xl font-bold leading-9 text-black">
                &quot;{item.quote}&quot;
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="faqs"
        className="relative overflow-hidden px-5 py-28 md:px-10 lg:px-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(101,188,79,0.08),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(21,91,158,0.08),transparent_30%)]" />

        <div className="relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
              Frequently Asked Questions
            </p>

            <h2 className="mt-8 text-5xl font-black uppercase leading-[0.9] md:text-7xl">
              EVERYTHING YOU
              <br />
              NEED TO KNOW
              <br />
              BEFORE WORKING
              <br />
              WITH US.
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-white/65">
              Choosing the right digital marketing partner is an important
              decision. Here are answers to the questions businesses ask us
              before starting their growth journey with Bigwig Media.
            </p>
          </div>

          <div className="grid gap-5">
            {faqs.map(([q, a]) => (
              <details
                key={q}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 open:border-[#65BC4F]/40 open:bg-white/[0.08]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-6">
                  <span className="pr-6 text-xl font-black uppercase leading-8 md:text-2xl">
                    {q}
                  </span>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-xl text-[#65BC4F] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="px-6 pb-6">
                  <div className="mb-5 h-px w-full bg-white/10" />

                  <p className="text-base leading-8 text-white/70">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative grid min-h-screen place-items-center overflow-hidden px-5 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(101,188,79,0.26),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(239,51,70,0.2),transparent_28%)]" />

        <div data-reveal className="relative max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
            LET&apos;S GROW YOUR BUSINESS
          </p>

          <h2 className="mt-8 text-6xl font-black uppercase leading-[0.82] md:text-[9rem]">
            READY TO
            <br />
            GROW
            <br />
            TOGETHER?
          </h2>

          <p className="mx-auto mt-10 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
            Whether you&apos;re launching a new business or looking to scale
            your existing brand, our team is ready to build a digital marketing
            strategy that delivers measurable growth, qualified leads and
            long-term success.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <button className="rounded-full bg-[#65BC4F] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:scale-105 hover:bg-white">
              Book Free Consultation
            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] transition hover:border-[#65BC4F] hover:bg-white/10">
              Get Free Marketing Audit
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
