"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Blogs", href: "#blogs" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

const serviceHighlights = [
  "Website Development",
  "SEO",
  "Social Media",
  "Performance Ads",
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/bigwigmedia/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bigwig-media-digital/",
  },
  { label: "YouTube", href: "https://www.youtube.com/@bigwigmedia" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="fixed left-4 right-4 top-4 z-50 flex items-center justify-between border border-white/10 bg-black/40 px-4 py-3 text-white backdrop-blur-2xl md:left-8 md:right-8 md:top-6 md:px-6">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Bigwig Media home"
          onClick={closeMenu}
        >
          <span className="relative flex h-11 w-28 items-center overflow-hidden rounded-full bg-white px-3 md:w-36">
            <Image
              src="/bigwig-logo.png"
              alt="Bigwig Media"
              width={160}
              height={60}
              priority
            />
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-[11px] font-bold uppercase tracking-[0.2em] text-white/64 lg:flex">
          <a
            className="transition hover:text-[#65BC4F]"
            href="#top"
            onClick={closeMenu}
          >
            Home
          </a>
          <Link
            className="transition hover:text-[#65BC4F]"
            href="/about"
            onClick={closeMenu}
          >
            About
          </Link>
          <a
            className="transition hover:text-[#65BC4F]"
            href="#services"
            onClick={closeMenu}
          >
            Services
          </a>
          <a
            className="transition hover:text-[#65BC4F]"
            href="#blogs"
            onClick={closeMenu}
          >
            Blogs
          </a>
          <a
            className="transition hover:text-[#65BC4F]"
            href="#clients"
            onClick={closeMenu}
          >
            Clients
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="magnetic hidden rounded-full border border-[#65BC4F]/70 bg-[#65BC4F] px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#050505] shadow-[0_0_24px_rgba(101,188,79,0.45)] transition hover:border-white/30 hover:bg-[#7DDC62] md:inline-flex"
            href="#contact"
            onClick={closeMenu}
            style={{ color: "#050505" }}
          >
            Start Project
          </a>
          <button
            className="magnetic flex h-11 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 transition hover:border-[#65BC4F]/70 hover:bg-[#65BC4F] hover:text-[#050505]"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className=" text-[10px] font-black uppercase tracking-[0.18em] sm:block">
              {open ? "Close" : "Menu"}
            </span>
            <span className="flex w-5 flex-col gap-1.5">
              <i
                className={`block h-px bg-current transition ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <i
                className={`block h-px bg-current transition ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <button
        className={`fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
      />

      <aside
        id="site-menu"
        className={`fixed bottom-3 right-3 top-3 z-[100] flex w-[calc(100vw-24px)] max-w-[620px] flex-col overflow-hidden border border-white/10 bg-[#070707] text-white shadow-2xl shadow-black/70 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:bottom-6 md:right-6 md:top-6 md:w-[min(620px,calc(100vw-48px))] ${
          open ? "translate-x-0" : "translate-x-[110%]"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(101,188,79,0.22),transparent_32%),radial-gradient(circle_at_84%_82%,rgba(239,51,70,0.2),transparent_34%),linear-gradient(135deg,rgba(21,91,158,0.18),transparent_38%)]" />

        <div className="relative flex shrink-0 items-center justify-between border-b border-white/10 p-4 md:p-5">
          <a
            href="#top"
            className="rounded-full bg-white px-4 py-2"
            aria-label="Bigwig Media home"
            onClick={closeMenu}
          >
            <Image
              src="/bigwig-logo.png"
              alt="Bigwig Media"
              width={130}
              height={48}
            />
          </a>
          <button
            className="h-10 w-10 rounded-full border border-white/15 bg-white text-sm font-black text-[#050505] transition hover:bg-[#65BC4F] md:h-11 md:w-11"
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            X
          </button>
        </div>

        <div
          className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 md:p-5"
          onTouchMove={(event) => event.stopPropagation()}
          onWheel={(event) => event.stopPropagation()}
        >
          <nav className="grid content-start gap-2">
            <p className="block lg:hidden mb-2 text-xs font-black uppercase tracking-[0.26em] text-[#65BC4F]">
              Menu
            </p>
            {menuLinks.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex min-h-14 items-center justify-between border border-white/10 bg-white/[0.04] px-4 py-3 text-xl font-black uppercase leading-none text-white transition hover:border-[#65BC4F]/60 hover:bg-[#65BC4F] hover:text-[#050505] sm:min-h-16 sm:text-2xl md:min-h-20 md:px-5 md:py-4 md:text-4xl lg:hidden"
                  onClick={closeMenu}
                >
                  <span>{item.label}</span>
                  <span className="text-base transition group-hover:translate-x-1">
                    -&gt;
                  </span>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex min-h-14 items-center justify-between border border-white/10 bg-white/[0.04] px-4 py-3 text-xl font-black uppercase leading-none text-white transition hover:border-[#65BC4F]/60 hover:bg-[#65BC4F] hover:text-[#050505] sm:min-h-16 sm:text-2xl md:min-h-20 md:px-5 md:py-4 md:text-4xl lg:hidden"
                  onClick={closeMenu}
                >
                  <span>{item.label}</span>
                  <span className="text-base transition group-hover:translate-x-1">
                    -&gt;
                  </span>
                </a>
              ),
            )}
          </nav>

          <div className="mt-4 grid gap-4">
            <section
              id="menu-about"
              className="hidden border border-white/10 bg-black/35 p-5 md:block"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#65BC4F]">
                About Bigwig
              </p>
              <p className="mt-4 text-sm leading-6 text-white/64">
                We build digital growth systems with websites, SEO, paid media,
                social content, ORM and reporting working as one focused engine.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {serviceHighlights.map((item) => (
                  <span
                    key={item}
                    className="border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/62"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white">
                Social Media
              </p>
              <div className="mt-4 grid gap-3 text-sm text-white/64">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between border-b border-white/10 pb-3 transition hover:text-[#65BC4F]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                    <span>-&gt;</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white">
                Contact Info
              </p>
              <a
                className="mt-4 block text-sm text-white/64 transition hover:text-[#65BC4F]"
                href="mailto:hello@bigwigmedia.in"
              >
                hello@bigwigmedia.in
              </a>
              <p className="mt-3 text-sm text-white/64">
                Delhi NCR / India / Global campaigns
              </p>
              <a
                className="mt-5 inline-flex w-full justify-center rounded-full bg-[#65BC4F] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_28px_rgba(101,188,79,0.4)] transition hover:bg-[#7DDC62]"
                href="#contact"
                onClick={closeMenu}
                style={{ color: "#050505" }}
              >
                Start Project
              </a>
            </section>
          </div>
        </div>
      </aside>
    </>
  );
}
