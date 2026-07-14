"use client";

import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Mail,
  Megaphone,
  Palette,
  Search,
  ShieldCheck,
  Share2,
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const services = [
  {
    id: "website-development",
    title: "Website Development",
    icon: Code2,
    color: "#155b9e",
    summary:
      "Fast, responsive and conversion-focused websites built to turn traffic into qualified enquiries.",
    points: ["UI/UX design", "Next.js development", "Landing pages", "Conversion tracking"],
  },
  {
    id: "search-engine-optimization",
    title: "Search Engine Optimization",
    icon: Search,
    color: "#65BC4F",
    summary:
      "Technical SEO, content strategy and ranking systems that improve qualified organic traffic.",
    points: ["Technical audits", "Keyword strategy", "On-page SEO", "Content planning"],
  },
  {
    id: "social-media-optimization",
    title: "Social Media Optimization",
    icon: Share2,
    color: "#ef3346",
    summary:
      "Profile systems, platform hygiene and content calendars that make your brand look active and credible.",
    points: ["Profile setup", "Creative calendars", "Content hygiene", "Brand consistency"],
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    icon: Megaphone,
    color: "#65BC4F",
    summary:
      "Campaigns, creatives and paid social funnels designed to convert attention into enquiries.",
    points: ["Meta campaigns", "Creative testing", "Audience planning", "Lead generation"],
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    icon: BarChart3,
    color: "#155b9e",
    summary:
      "ROI-led Google and Meta advertising with tracking, testing and reporting built around business outcomes.",
    points: ["Google Ads", "Meta Ads", "Remarketing", "ROI reporting"],
  },
  {
    id: "online-reputation-management",
    title: "Online Reputation Management",
    icon: ShieldCheck,
    color: "#ffffff",
    summary:
      "Search, review and sentiment control for brands that need trust before the first conversation.",
    points: ["Review strategy", "Brand monitoring", "Search cleanup", "Trust building"],
  },
  {
    id: "graphic-designing-video-editing",
    title: "Graphic Designing & Video Editing",
    icon: Palette,
    color: "#ef3346",
    summary:
      "Premium visual assets, ad creatives, reels and brand content that improve recall and click-through.",
    points: ["Ad creatives", "Reels editing", "Brand graphics", "Motion assets"],
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    icon: Mail,
    color: "#65BC4F",
    summary:
      "Automated campaigns, newsletters and nurture flows that bring prospects back into your pipeline.",
    points: ["Email flows", "Newsletters", "Lead nurturing", "Campaign copy"],
  },
];

const process = [
  ["Audit", "We review your website, channels, competitors and current conversion path."],
  ["Strategy", "We choose the right service mix, timeline, content plan and measurement setup."],
  ["Execution", "Specialists build, launch, track and improve the work across channels."],
  ["Scale", "Reports turn into decisions, tests and stronger campaigns every month."],
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <section className="relative grid min-h-[760px] items-end overflow-hidden px-5 pb-16 pt-36 md:px-10 lg:min-h-screen lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(101,188,79,0.24),transparent_32%),radial-gradient(circle_at_78%_30%,rgba(21,91,158,0.24),transparent_34%),radial-gradient(circle_at_62%_82%,rgba(239,51,70,0.17),transparent_30%)]" />
        <div className="pointer-events-none absolute right-[-18vmin] top-[16%] h-[72vmin] w-[72vmin] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.44fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-[#65BC4F]">
              Bigwig Media Services
            </p>
            <h1 className="mt-7 max-w-6xl text-5xl font-black uppercase leading-[0.88] tracking-normal md:text-7xl lg:text-[7.2rem]">
              Everything your brand needs to grow online.
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-7 text-white/70 md:text-xl md:leading-8">
              Websites, SEO, paid campaigns, social media, creative, reputation
              and email systems planned together around measurable business
              growth.
            </p>
          </div>

          <div className="border border-white/12 bg-white/[0.045] p-5 backdrop-blur-xl md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#65BC4F]">
              Service Stack
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {services.slice(0, 4).map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="border border-white/10 bg-black/30 px-4 py-3 text-xs font-black uppercase leading-5 tracking-[0.14em] text-white/62 transition hover:border-[#65BC4F] hover:text-[#65BC4F]"
                >
                  {service.title}
                </a>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#65BC4F] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] transition hover:bg-[#7DDC62]"
              style={{ color: "#050505" }}
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 md:px-10 md:py-28 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_28%,rgba(21,91,158,0.14),transparent_30%),radial-gradient(circle_at_86%_76%,rgba(101,188,79,0.12),transparent_32%)]" />
        <div className="relative">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef3346]">
                What We Do
              </p>
              <h2 className="mt-6 text-4xl font-black uppercase leading-[0.9] md:text-6xl">
                Complete digital services in one place.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 md:text-lg md:leading-8 lg:justify-self-end">
              Choose one service or combine them into a full growth system. Each
              card below shows what our team can handle for your brand.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="group scroll-mt-32 border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#65BC4F]/55 hover:bg-white/[0.07]"
                  style={{ boxShadow: `inset 0 0 120px ${service.color}18` }}
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="text-sm font-black uppercase tracking-[0.22em] text-white/42">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-[#050505]"
                      style={{ backgroundColor: service.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>

                  <h3 className="mt-12 text-2xl font-black uppercase leading-none transition group-hover:text-[#65BC4F]">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-white/62">
                    {service.summary}
                  </p>

                  <div className="mt-8 grid gap-2">
                    {service.points.map((point) => (
                      <span
                        key={point}
                        className="border border-white/10 bg-black/25 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/54"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-5 py-24 text-black md:px-10 md:py-28 lg:px-16">
        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#155b9e]">
              How We Work
            </p>
            <h2 className="mt-7 max-w-4xl text-4xl font-black uppercase leading-[0.9] md:text-6xl lg:text-7xl">
              Clear process from first audit to scale.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-black/62 md:text-lg md:leading-8 lg:justify-self-end">
            Every service is connected to strategy and reporting, so the work
            stays visible and decisions stay practical.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {process.map(([title, copy], index) => (
            <article
              key={title}
              className="min-h-[280px] border border-black/10 bg-[#f7f7f7] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#65BC4F]/60 hover:shadow-2xl md:p-7"
            >
              <span className="text-sm font-black uppercase tracking-[0.24em] text-[#ef3346]">
                0{index + 1}
              </span>
              <h3 className="mt-10 text-3xl font-black uppercase leading-none">
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
        <div className="relative max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
            Ready to choose your growth mix?
          </p>
          <h2 className="mt-8 text-5xl font-black uppercase leading-[0.86] md:text-8xl lg:text-[8rem]">
            Let&apos;s build the right service plan.
          </h2>
          <Link
            href="/contact"
            className="mt-10 inline-flex rounded-full bg-[#65BC4F] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] shadow-[0_0_30px_rgba(101,188,79,0.42)] transition hover:-translate-y-1 hover:bg-[#7DDC62]"
            style={{ color: "#050505" }}
          >
            Book Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
