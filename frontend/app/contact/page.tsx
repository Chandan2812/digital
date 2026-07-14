"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const contactCards = [
  {
    title: "New Business",
    detail: "hello@bigwigmedia.in",
    href: "mailto:hello@bigwigmedia.in",
    copy: "Share your goals, market and current challenges. We will map the next practical move.",
  },
  {
    title: "Location",
    detail: "Delhi NCR / India",
    href: "https://maps.google.com/?q=Delhi%20NCR",
    copy: "We work with brands across India and global markets through remote-first campaign systems.",
  },
  {
    title: "Response Time",
    detail: "Within 24 hours",
    href: "mailto:hello@bigwigmedia.in",
    copy: "Expect a clear reply with next steps, not a generic acknowledgement.",
  },
];

const services = [
  "Website Development",
  "SEO",
  "Google Ads",
  "Meta Ads",
  "Social Media",
  "ORM",
  "Branding",
  "Email Marketing",
];

function useContactMotion() {
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
      gsap.utils.toArray<HTMLElement>("[data-contact-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 70, opacity: 0, filter: "blur(12px)" },
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

      gsap.to(".contact-orbit", {
        rotate: 145,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".service-marquee", {
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

export default function ContactPage() {
  useContactMotion();

  return (
    <main id="top" className="relative overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <section className="contact-hero relative grid min-h-[760px] items-center overflow-hidden px-5 pb-10 pt-32 md:min-h-[780px] md:px-10 md:pt-34 lg:min-h-screen lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(101,188,79,0.22),transparent_32%),radial-gradient(circle_at_82%_34%,rgba(239,51,70,0.18),transparent_30%),radial-gradient(circle_at_66%_78%,rgba(21,91,158,0.26),transparent_34%)]" />
        <div className="contact-orbit pointer-events-none absolute right-[-16vmin] top-[16%] h-[74vmin] w-[74vmin] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.98fr_0.82fr] lg:items-center">
          <div>
            <motion.p
              className="text-xs font-black uppercase tracking-[0.34em] text-[#65BC4F]"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65 }}
            >
              Contact Bigwig Media
            </motion.p>
            <motion.h1
              className="mt-6 max-w-5xl text-4xl font-black uppercase leading-[0.9] tracking-normal md:text-6xl lg:text-[5.4rem]"
              initial={{ y: 46, opacity: 0, filter: "blur(14px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Tell us where you want the business to grow.
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              Whether you need more leads, stronger search visibility, better
              ads or a high-converting website, we will help you turn the goal
              into a clear digital growth plan.
            </motion.p>
          </div>

          <motion.div
            className="border border-white/12 bg-white/[0.045] p-5 backdrop-blur-xl md:p-6"
            initial={{ y: 34, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.8 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#65BC4F]">
              Quick Contact
            </p>
            <a
              href="mailto:hello@bigwigmedia.in"
              className="mt-5 block break-all text-2xl font-black uppercase leading-none transition hover:text-[#65BC4F] md:text-3xl xl:text-4xl"
            >
              hello@bigwigmedia.in
            </a>
            <p className="mt-5 text-sm leading-6 text-white/62 md:text-base md:leading-7">
              Send your website, target market and the result you want. We will
              reply with a practical starting point.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["Audit", "Strategy", "Campaign", "Scale"].map((item) => (
                <span
                  key={item}
                  className="border border-white/10 bg-black/30 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/62"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-white py-8 text-black">
        <div className="service-marquee flex w-max gap-4 px-5">
          {services.concat(services).map((service, index) => (
            <span
              key={`${service}-${index}`}
              className="shrink-0 border border-black/10 bg-[#f5f5f5] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-black/62 transition hover:border-[#65BC4F] hover:bg-[#65BC4F] hover:text-[#050505]"
            >
              {service}
            </span>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-28 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_28%,rgba(21,91,158,0.16),transparent_30%),radial-gradient(circle_at_84%_76%,rgba(101,188,79,0.14),transparent_32%)]" />
        <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-contact-reveal>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
              Start a Conversation
            </p>
            <h2 className="mt-7 text-4xl font-black uppercase leading-[0.9] md:text-6xl lg:text-7xl">
              A short brief is enough to begin.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/64 md:text-lg md:leading-8">
              Tell us about your business, your target customer and what is not
              working right now. We will use that context to suggest the right
              first move.
            </p>
          </div>

          <form
            data-contact-reveal
            className="grid gap-4 border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl md:p-7"
            action="mailto:hello@bigwigmedia.in"
            method="post"
            encType="text/plain"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                  Name
                </span>
                <input
                  className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F]"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                  Email
                </span>
                <input
                  className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F]"
                  name="email"
                  placeholder="you@company.com"
                  required
                  type="email"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                  Phone
                </span>
                <input
                  className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F]"
                  name="phone"
                  placeholder="+91"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                  Service
                </span>
                <select
                  className="h-14 border border-white/10 bg-black/35 px-4 text-white outline-none transition focus:border-[#65BC4F]"
                  name="service"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                Project Goal
              </span>
              <textarea
                className="min-h-40 resize-y border border-white/10 bg-black/35 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#65BC4F]"
                name="message"
                placeholder="Tell us what you want to improve..."
                required
              />
            </label>
            <button
              className="mt-2 inline-flex justify-center rounded-full bg-[#65BC4F] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.42)] transition hover:-translate-y-1 hover:bg-[#7DDC62]"
              type="submit"
              style={{ color: "#050505" }}
            >
              Send Brief
            </button>
          </form>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-5 py-24 text-black md:px-10 md:py-28 lg:px-16">
        <div
          data-contact-reveal
          className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef3346]">
              Contact Details
            </p>
            <h2 className="mt-7 max-w-4xl text-4xl font-black uppercase leading-[0.9] md:text-6xl lg:text-7xl">
              Choose the fastest way to reach us.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-black/62 md:text-lg md:leading-8 lg:justify-self-end">
            From first audit to full-funnel execution, our team keeps the
            conversation clear and the next step visible.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {contactCards.map((card, index) => (
            <a
              key={card.title}
              data-contact-reveal
              href={card.href}
              className="group min-h-[320px] border border-black/10 bg-[#f7f7f7] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#65BC4F]/60 hover:shadow-2xl md:p-7"
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="text-sm font-black uppercase tracking-[0.24em] text-[#155b9e]">
                0{index + 1}
              </span>
              <h3 className="mt-10 text-3xl font-black uppercase leading-none transition group-hover:text-[#65BC4F]">
                {card.title}
              </h3>
              <p className="mt-5 text-xl font-black text-black">
                {card.detail}
              </p>
              <p className="mt-6 text-sm leading-7 text-black/62 md:text-base">
                {card.copy}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5 py-24 text-center md:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(101,188,79,0.26),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(239,51,70,0.18),transparent_28%)]" />
        <div data-contact-reveal className="relative max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
            Ready when you are
          </p>
          <h2 className="mt-8 text-5xl font-black uppercase leading-[0.86] md:text-8xl lg:text-[8rem]">
            Better leads start with a better plan.
          </h2>
          <Link
            href="mailto:hello@bigwigmedia.in"
            className="mt-10 inline-flex rounded-full bg-[#65BC4F] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.42)] transition hover:-translate-y-1 hover:bg-[#7DDC62]"
            style={{ color: "#050505" }}
          >
            Email Bigwig Media
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
