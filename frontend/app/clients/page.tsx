"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ContactPopupButton } from "../components/ContactPopup";
import Footer from "../components/Footer";
import HeroGalaxy from "../components/HeroGalaxy";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

interface Client {
  _id: string;
  name: string;
  image: string;
}

const industries = [
  "Healthcare",
  "Real Estate",
  "Education",
  "Manufacturing",
  "E-commerce",
  "Hospitality",
  "IT Services",
  "Local Brands",
];

const stories = [
  [
    "Lead Quality",
    "Sharper landing pages, search intent and campaign tracking help sales teams spend time on better enquiries.",
  ],
  [
    "Brand Trust",
    "Website design, ORM, social content and reporting work together so prospects see a credible brand everywhere.",
  ],
  [
    "Scale Systems",
    "We keep testing creatives, channels and conversion points so growth does not depend on one campaign only.",
  ],
];

function useClientsMotion() {
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
      gsap.utils.toArray<HTMLElement>("[data-client-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 64, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 84%" },
          },
        );
      });

      gsap.to(".industry-track", {
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

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useClientsMotion();

  useEffect(() => {
    const fetchClients = async () => {
      if (!API_BASE) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/client`);
        const data = await res.json();
        setClients(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [API_BASE]);

  const logoWall = useMemo(
    () => (clients.length ? clients : []),
    [clients],
  );

  return (
    <main id="top" className="relative overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <section className="clients-hero relative grid min-h-screen items-center overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pt-40 lg:px-16">
        <div className="absolute inset-0 opacity-72">
          <HeroGalaxy />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.92),rgba(5,5,5,0.52)_48%,rgba(5,5,5,0.88)),radial-gradient(circle_at_72%_42%,transparent,rgba(5,5,5,0.84)_58%),linear-gradient(180deg,rgba(5,5,5,0.14),#050505)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative z-10 max-w-7xl">
          <div>
            <motion.p
              className="text-xs font-black uppercase tracking-[0.34em] text-[#65BC4F]"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65 }}
            >
              Clients and Partnerships
            </motion.p>
            <motion.h1
              className="mt-7 max-w-6xl text-5xl font-black uppercase leading-[0.86] tracking-normal md:text-7xl lg:text-[6.8rem]"
              initial={{ y: 46, opacity: 0, filter: "blur(14px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Trusted by brands that want measurable digital growth.
            </motion.h1>
            <motion.p
              className="mt-8 max-w-3xl text-lg leading-8 text-white/70 md:text-xl"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              We build long-term partnerships through websites, SEO, ads,
              social content and reporting systems that keep every campaign
              connected to business outcomes.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.7 }}
            >
              <ContactPopupButton
                className="inline-flex justify-center rounded-full bg-[#65BC4F] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.45)] transition hover:-translate-y-1 hover:bg-[#7DDC62]"
                style={{ color: "#050505" }}
              >
                Start Your Project
              </ContactPopupButton>
              <a
                href="#client-logos"
                className="inline-flex justify-center rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:-translate-y-1 hover:border-[#65BC4F]/70 hover:bg-white/[0.08]"
              >
              View Clients
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-white py-8 text-black">
        <div className="industry-track flex w-max gap-4 px-5">
          {industries.concat(industries).map((industry, index) => (
            <span
              key={`${industry}-${index}`}
              className="max-w-[78vw] shrink-0 whitespace-normal break-words border border-black/10 bg-[#f5f5f5] px-5 py-4 text-xs font-black uppercase leading-5 tracking-[0.14em] text-black/62 transition hover:border-[#65BC4F] hover:bg-[#65BC4F] hover:text-[#050505] sm:max-w-none sm:px-7 sm:text-sm sm:tracking-[0.2em]"
            >
              {industry}
            </span>
          ))}
        </div>
      </section>

      <section
        id="client-logos"
        className="relative overflow-hidden px-5 py-24 md:px-10 md:py-28 lg:px-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(21,91,158,0.16),transparent_30%),radial-gradient(circle_at_84%_78%,rgba(101,188,79,0.14),transparent_32%)]" />
        <div className="relative">
          <div
            data-client-reveal
            className="mx-auto max-w-5xl text-center"
          >
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
              Client Logo Wall
            </p>
            <h2 className="mt-7 text-4xl font-black uppercase leading-[0.9] md:text-6xl lg:text-7xl">
              Companies that trust Bigwig Media.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/64 md:text-lg md:leading-8">
              Dynamic client logos are loaded from your backend, then presented
              inside the same premium visual system as the rest of the website.
            </p>
          </div>

          {loading ? (
            <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[210px] animate-pulse border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="grid h-full place-items-center bg-white/[0.05]">
                    <div className="h-16 w-32 bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : logoWall.length ? (
            <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {logoWall.map((client) => (
                <article
                  key={client._id}
                  data-client-reveal
                  className="group relative h-[210px] overflow-hidden border border-white/10 bg-white/[0.04] p-5 transition duration-500 hover:-translate-y-2 hover:border-[#65BC4F]/55 hover:bg-white/[0.075]"
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(101,188,79,0.2),transparent_38%)]" />
                  </div>
                  <div className="relative grid h-full place-items-center bg-white p-5">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-8 transition duration-500 group-hover:scale-110"
                    />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              data-client-reveal
              className="mx-auto mt-14 max-w-3xl border border-dashed border-white/18 bg-white/[0.04] px-6 py-16 text-center"
            >
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ef3346]">
                No clients available
              </p>
              <h3 className="mt-5 text-3xl font-black uppercase">
                Client logos will appear here once added.
              </h3>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/62">
                Add clients from your backend dashboard or check
                `NEXT_PUBLIC_API_BASE` if the API is already running.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-5 py-24 text-black md:px-10 md:py-28 lg:px-16">
        <div
          data-client-reveal
          className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef3346]">
              Why Clients Stay
            </p>
            <h2 className="mt-7 max-w-4xl text-4xl font-black uppercase leading-[0.9] md:text-6xl lg:text-7xl">
              Built on trust, numbers and long-term improvement.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-black/62 md:text-lg md:leading-8 lg:justify-self-end">
            We keep strategy, creative, media and reporting moving together, so
            clients can see what changed and why the next step matters.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {stories.map(([title, copy], index) => (
            <article
              key={title}
              data-client-reveal
              className="group min-h-[300px] border border-black/10 bg-[#f7f7f7] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#65BC4F]/60 hover:shadow-2xl md:p-7"
            >
              <span className="text-sm font-black uppercase tracking-[0.24em] text-[#155b9e]">
                0{index + 1}
              </span>
              <h3 className="mt-10 text-3xl font-black uppercase leading-none transition group-hover:text-[#65BC4F]">
                {title}
              </h3>
              <p className="mt-6 text-sm leading-7 text-black/62 md:text-base">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5 py-24 text-center md:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(101,188,79,0.26),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(239,51,70,0.18),transparent_28%)]" />
        <div data-client-reveal className="relative max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
            Your brand can be next
          </p>
          <h2 className="mt-8 text-5xl font-black uppercase leading-[0.86] md:text-8xl lg:text-[8rem]">
            Let&apos;s build a growth story worth sharing.
          </h2>
          <ContactPopupButton
            className="mt-10 inline-flex rounded-full bg-[#65BC4F] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.42)] transition hover:-translate-y-1 hover:bg-[#7DDC62]"
            style={{ color: "#050505" }}
          >
            Book Free Consultation
          </ContactPopupButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
