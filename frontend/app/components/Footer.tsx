"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactPopupButton } from "./ContactPopup";
import { FormEvent, useState } from "react";

const serviceLinks = [
  ["Website Development", "/services#website-development"],
  ["Search Engine Optimization", "/services#search-engine-optimization"],
  ["Social Media Optimization", "/services#social-media-optimization"],
  ["Social Media Marketing", "/services#social-media-marketing"],
  ["Performance Marketing", "/services#performance-marketing"],
  ["Online Reputation Management", "/services#online-reputation-management"],
  [
    "Graphic Designing & Video Editing",
    "/services#graphic-designing-video-editing",
  ],
  ["Email Marketing", "/services#email-marketing"],
];

const quickLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Blog", "/blog"],
  ["Clients", "/clients"],
  ["Contact", "/contact"],
];

const socialLinks = [
  ["Instagram", "https://www.instagram.com/bigwigmedia/"],
  ["LinkedIn", "https://www.linkedin.com/company/bigwig-media-digital/"],
  ["YouTube", "https://www.youtube.com/@bigwigmedia"],
];

export default function Footer() {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscriberStatus, setSubscriberStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [subscriberMessage, setSubscriberMessage] = useState("");

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscriberStatus("loading");
    setSubscriberMessage("");

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
      const response = await fetch(`${apiBaseUrl}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: subscriberEmail.trim() }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Subscription failed");
      }

      setSubscriberStatus("success");
      setSubscriberMessage(
        result?.message || "You are subscribed successfully.",
      );
      setSubscriberEmail("");
    } catch (error) {
      setSubscriberStatus("error");
      setSubscriberMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#050505] px-5 py-10 text-white md:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(101,188,79,0.2),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(21,91,158,0.32),transparent_30%),radial-gradient(circle_at_72%_82%,rgba(239,51,70,0.2),transparent_28%)]" />

      <div className="network-earth absolute -right-40 top-16 hidden h-[520px] w-[520px] rounded-full border border-white/10 lg:block">
        <span className="absolute left-[18%] top-[35%] h-3 w-3 rounded-full bg-[#65BC4F] shadow-[0_0_24px_#00FF88]" />
        <span className="absolute left-[56%] top-[24%] h-3 w-3 rounded-full bg-[#ef3346] shadow-[0_0_24px_#ef3346]" />
        <span className="absolute left-[42%] top-[68%] h-3 w-3 rounded-full bg-white shadow-[0_0_24px_white]" />
      </div>

      <div className="relative grid gap-10 border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#65BC4F]">
            Bigwig Media Digital
          </p>
          <h2 className="mt-6 max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-normal md:text-7xl lg:text-8xl">
            Ready To Generate Better Leads?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/62 md:text-lg">
            We build websites, SEO systems, paid campaigns, social media growth,
            creative assets, email funnels and reputation strategies for brands
            that want measurable enquiries.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ContactPopupButton
              className="magnetic inline-flex justify-center rounded-full border border-[#65BC4F]/60 bg-[#65BC4F] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.48)] transition hover:bg-[#7DDC62] hover:text-[#050505]"
              style={{ color: "#050505" }}
            >
              Book a Growth Call
            </ContactPopupButton>
            <Link
              href="/services"
              className="inline-flex justify-center rounded-full border border-white/15 bg-white px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] transition hover:bg-[#65BC4F] hover:text-[#050505]"
              style={{ color: "#050505" }}
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-8 border border-[#65BC4F]/30 bg-[#65BC4F]/10 p-5 shadow-[0_0_36px_rgba(101,188,79,0.12)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#65BC4F]">
              Newsletter
            </p>
            <h3 className="mt-3 text-2xl font-black uppercase tracking-normal text-white md:text-3xl">
              Subscribe For Growth Updates
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/62">
              Get digital growth ideas, campaign tips and Bigwig updates in
              your inbox.
            </p>
            <form
              className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
              onSubmit={handleSubscribe}
            >
              <label className="sr-only" htmlFor="footer-subscriber-email">
                Email address
              </label>
              <input
                id="footer-subscriber-email"
                className="h-14 min-w-0 border border-white/10 bg-black/45 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#65BC4F]"
                name="email"
                onChange={(event) => setSubscriberEmail(event.target.value)}
                placeholder="you@company.com"
                required
                type="email"
                value={subscriberEmail}
              />
              <button
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#65BC4F] px-7 text-xs font-black uppercase tracking-[0.16em] text-[#050505] shadow-[0_0_24px_rgba(101,188,79,0.32)] transition hover:bg-[#7DDC62] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={subscriberStatus === "loading"}
                type="submit"
                style={{ color: "#050505" }}
              >
                {subscriberStatus === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {subscriberMessage ? (
              <p
                className={`mt-3 text-sm leading-5 ${
                  subscriberStatus === "success"
                    ? "text-[#65BC4F]"
                    : "text-[#ef3346]"
                }`}
                role="status"
              >
                {subscriberMessage}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white">
              Services
            </p>
            <div className="mt-5 grid gap-3 text-sm text-white/62">
              {serviceLinks.map(([label, href]) => (
                <Link
                  className="group flex items-center justify-between gap-4 transition hover:text-[#65BC4F]"
                  href={href}
                  key={label}
                >
                  <span>{label}</span>
                  <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-[#65BC4F]">
                    -&gt;
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="border border-white/10 bg-black/30 p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white">
                Navigation
              </p>
              <div className="mt-5 grid gap-3 text-sm text-white/62">
                {quickLinks.map(([label, href]) => (
                  <Link
                    className="transition hover:text-[#65BC4F]"
                    href={href}
                    key={label}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-black/30 p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white">
                Contact
              </p>
              <a
                className="mt-5 block text-sm text-white/62 transition hover:text-[#65BC4F]"
                href="mailto:hello@bigwigmedia.in"
              >
                hello@bigwigmedia.in
              </a>
              <p className="mt-3 text-sm text-white/62">
                Delhi NCR / India / Global campaigns
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex w-44 rounded-full bg-white px-4 py-2">
          <Image
            src="/bigwig-logo.png"
            alt="Bigwig Media"
            width={170}
            height={64}
          />
        </Link>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map(([label, href]) => (
            <a
              className="transition hover:text-[#65BC4F]"
              href={href}
              key={label}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ))}
        </div>
        <p>2026 Bigwig Media. All rights reserved.</p>
      </div>
    </footer>
  );
}
