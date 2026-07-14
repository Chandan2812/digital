"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "@/app/components/Footer";
import HeroGalaxy from "@/app/components/HeroGalaxy";
import Navbar from "@/app/components/Navbar";

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogType {
  title: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  author?: string;
  datePublished?: string;
  content: string;
  slug: string;
  category?: string;
  faqs?: BlogFaq[];
  schemaMarkup?: string[];
}

export interface RelatedBlogType {
  title: string;
  slug: string;
  coverImage?: string;
  excerpt: string;
  datePublished?: string;
  author?: string;
  category?: string;
}

function formatDate(date?: string) {
  if (!date) return "Bigwig Media";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getReadingTime(html: string) {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function RelatedArticle({ item }: { item: RelatedBlogType }) {
  return (
    <Link
      href={`/blog/${item.slug}`}
      className="group grid gap-4 border-b border-white/10 p-5 transition hover:bg-white/[0.055] last:border-b-0 md:grid-cols-[104px_1fr]"
    >
      <div className="relative h-32 overflow-hidden bg-white/8 md:h-28">
        {item.coverImage ? (
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            sizes="104px"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full bg-[radial-gradient(circle_at_40%_35%,rgba(101,188,79,0.22),transparent_34%),#111]" />
        )}
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#65BC4F]">
          {item.category || "Blog"}
        </p>
        <h3 className="mt-3 line-clamp-2 text-lg font-black uppercase leading-none text-white transition group-hover:text-[#65BC4F]">
          {item.title}
        </h3>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
          {formatDate(item.datePublished)}
        </p>
      </div>
    </Link>
  );
}

export default function BlogClient({
  blog,
  relatedBlogs,
}: {
  blog: BlogType;
  relatedBlogs: RelatedBlogType[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const readingTime = useMemo(() => getReadingTime(blog.content), [blog.content]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-10 md:pt-40 lg:px-16">
        <div className="absolute inset-0 opacity-72">
          <HeroGalaxy />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.92),rgba(5,5,5,0.52)_48%,rgba(5,5,5,0.88)),radial-gradient(circle_at_72%_42%,transparent,rgba(5,5,5,0.84)_58%),linear-gradient(180deg,rgba(5,5,5,0.14),#050505)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/58 transition hover:text-[#65BC4F]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.34fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-[#65BC4F]">
                {blog.category || "Bigwig Insight"}
              </p>
              <h1 className="mt-7 max-w-6xl text-4xl font-black uppercase leading-[0.9] tracking-normal md:text-6xl lg:text-[5.9rem]">
                {blog.title}
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-7 text-white/70 md:text-xl md:leading-8">
                {blog.excerpt}
              </p>
            </div>

            <div className="grid gap-3 border border-white/12 bg-white/[0.045] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3 border border-white/10 bg-black/30 px-4 py-3">
                <UserRound className="h-5 w-5 text-[#65BC4F]" />
                <span className="text-sm font-bold text-white/74">
                  {blog.author || "Bigwig Team"}
                </span>
              </div>
              <div className="flex items-center gap-3 border border-white/10 bg-black/30 px-4 py-3">
                <CalendarDays className="h-5 w-5 text-[#65BC4F]" />
                <span className="text-sm font-bold text-white/74">
                  {formatDate(blog.datePublished)}
                </span>
              </div>
              <div className="flex items-center gap-3 border border-white/10 bg-black/30 px-4 py-3">
                <Clock3 className="h-5 w-5 text-[#65BC4F]" />
                <span className="text-sm font-bold text-white/74">
                  {readingTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {blog.coverImage ? (
        <section className="px-5 pb-10 md:px-10 lg:px-16">
          <div className="relative h-[320px] overflow-hidden border border-white/10 bg-white/8 md:h-[540px] lg:h-[680px]">
            <Image
              src={blog.coverImage}
              alt={blog.coverImageAlt || blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/72 via-transparent to-transparent" />
          </div>
        </section>
      ) : null}

      <section className="relative px-5 pb-24 pt-8 md:px-10 md:pb-28 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(239,51,70,0.12),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(101,188,79,0.1),transparent_30%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <article className="min-w-0">
            <div
              className="blog-content border border-white/12 bg-white/[0.035] p-6 text-white md:p-10 lg:p-12"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />

            {blog.faqs?.length ? (
              <section className="mt-8 border border-white/12 bg-white/[0.035] p-6 md:p-10">
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[#65BC4F]">
                  FAQs
                </p>
                <h2 className="mt-5 text-3xl font-black uppercase leading-none md:text-5xl">
                  Frequently asked questions.
                </h2>

                <div className="mt-8 space-y-3">
                  {blog.faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                      <div
                        key={`${faq.question}-${index}`}
                        className="border border-white/10 bg-black/25"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="flex w-full items-center justify-between gap-5 p-5 text-left"
                        >
                          <span className="text-base font-black uppercase leading-tight text-white md:text-lg">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-[#65BC4F] transition ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-all duration-300 ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-7 text-white/64 md:text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-5">
              <div className="border border-white/12 bg-white/[0.045] p-6 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#65BC4F]">
                  Need a Growth Plan?
                </p>
                <h2 className="mt-5 text-3xl font-black uppercase leading-none">
                  Turn this insight into action.
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/62">
                  Share your website, market and growth goal. We will help map
                  the next practical digital move.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#65BC4F] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#050505] transition hover:-translate-y-1 hover:bg-[#7DDC62]"
                  style={{ color: "#050505" }}
                >
                  Start a Brief
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {relatedBlogs?.length ? (
                <div className="overflow-hidden border border-white/12 bg-white/[0.035]">
                  <div className="border-b border-white/10 p-6">
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ef3346]">
                      More Articles
                    </p>
                    <h2 className="mt-3 text-2xl font-black uppercase leading-none">
                      Related reads.
                    </h2>
                  </div>
                  <div>
                    {relatedBlogs.slice(0, 4).map((item) => (
                      <RelatedArticle key={item.slug} item={item} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
