"use client";

import { ArrowUpRight, CalendarDays, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface Blog {
  _id?: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  datePublished?: string;
  author?: string;
  category?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const BLOGS_PER_PAGE = 9;

function formatDate(date?: string) {
  if (!date) return "Bigwig Media";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function BlogSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="min-h-[520px] animate-pulse border border-white/10 bg-white/[0.04]"
        >
          <div className="h-64 bg-white/10" />
          <div className="space-y-5 p-6">
            <div className="h-3 w-24 bg-[#65BC4F]/30" />
            <div className="h-8 w-4/5 bg-white/10" />
            <div className="space-y-3">
              <div className="h-4 bg-white/10" />
              <div className="h-4 w-11/12 bg-white/10" />
              <div className="h-4 w-2/3 bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={`group relative flex min-h-[520px] flex-col overflow-hidden border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-2 hover:border-[#65BC4F]/55 hover:bg-white/[0.06] ${
        index === 0 ? "xl:col-span-2" : ""
      }`}
    >
      <div className="relative h-64 overflow-hidden bg-white/8">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_35%_35%,rgba(101,188,79,0.22),transparent_34%),radial-gradient(circle_at_78%_68%,rgba(21,91,158,0.22),transparent_34%),#101010]">
            <span className="text-xs font-black uppercase tracking-[0.28em] text-white/48">
              Bigwig Insight
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80" />
        <div className="absolute left-5 top-5 border border-white/12 bg-black/45 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/74 backdrop-blur">
          {blog.category || "Blog"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/48">
          <CalendarDays className="h-4 w-4 text-[#65BC4F]" />
          {formatDate(blog.datePublished)}
        </div>

        <h2 className="mt-7 max-w-2xl text-2xl font-black uppercase leading-[0.95] text-white transition group-hover:text-[#65BC4F] md:text-3xl">
          {blog.title}
        </h2>

        <p className="mt-5 line-clamp-4 text-sm leading-7 text-white/62 md:text-base">
          {blog.excerpt}
        </p>

        <div className="mt-auto flex items-end justify-between gap-5 pt-10">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-white/42">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#65BC4F] text-[#050505] transition group-hover:scale-110">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!API_BASE) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/blog/viewblog`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setBlogs(data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return blogs;

    return blogs.filter((blog) =>
      [blog.title, blog.excerpt, blog.category, blog.author]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery)),
    );
  }, [blogs, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedBlogs = filteredBlogs.slice(
    (safeCurrentPage - 1) * BLOGS_PER_PAGE,
    safeCurrentPage * BLOGS_PER_PAGE,
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <section className="relative grid min-h-[760px] items-end overflow-hidden px-5 pb-16 pt-36 md:px-10 lg:min-h-screen lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(101,188,79,0.24),transparent_32%),radial-gradient(circle_at_78%_28%,rgba(239,51,70,0.18),transparent_30%),radial-gradient(circle_at_66%_78%,rgba(21,91,158,0.24),transparent_34%)]" />
        <div className="pointer-events-none absolute right-[-18vmin] top-[14%] h-[72vmin] w-[72vmin] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.52fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-[#65BC4F]">
              Bigwig Media Blog
            </p>
            <h1 className="mt-7 max-w-6xl text-5xl font-black uppercase leading-[0.88] tracking-normal md:text-7xl lg:text-[7.4rem]">
              Ideas for sharper digital growth.
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-7 text-white/70 md:text-xl md:leading-8">
              Strategy notes, SEO thinking, advertising lessons and web
              conversion ideas for brands that want clearer marketing momentum.
            </p>
          </div>

          <div className="border border-white/12 bg-white/[0.045] p-5 backdrop-blur-xl md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#65BC4F]">
              Explore Articles
            </p>
            <label className="mt-5 flex h-14 items-center gap-3 border border-white/10 bg-black/35 px-4 transition focus-within:border-[#65BC4F]">
              <Search className="h-5 w-5 text-white/42" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCurrentPage(1);
                }}
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/34"
                placeholder="Search insights"
              />
            </label>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="border border-white/10 bg-black/30 px-4 py-3">
                <span className="block text-2xl font-black">{blogs.length}</span>
                <span className="text-xs font-black uppercase tracking-[0.16em] text-white/48">
                  Articles
                </span>
              </div>
              <Link
                href="/contact"
                className="flex items-center justify-center border border-[#65BC4F]/45 bg-[#65BC4F] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-[#050505] transition hover:bg-[#7DDC62]"
                style={{ color: "#050505" }}
              >
                Start Brief
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 md:px-10 md:py-28 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_28%,rgba(21,91,158,0.14),transparent_30%),radial-gradient(circle_at_86%_76%,rgba(101,188,79,0.12),transparent_32%)]" />
        <div className="relative">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ef3346]">
                Latest Thinking
              </p>
              <h2 className="mt-6 text-4xl font-black uppercase leading-[0.9] md:text-6xl">
                Practical reads for modern teams.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 md:text-lg md:leading-8 lg:justify-self-end">
              Browse the newest posts from our team, built around search demand,
              paid media quality, stronger content and conversion-led websites.
            </p>
          </div>

          {loading ? <BlogSkeleton /> : null}

          {!loading && filteredBlogs.length === 0 ? (
            <div className="border border-white/12 bg-white/[0.04] p-8 text-center md:p-12">
              <h2 className="text-3xl font-black uppercase text-white">
                No articles found.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/62 md:text-base">
                Try another search or check back soon for new growth insights
                from the Bigwig Media team.
              </p>
            </div>
          ) : null}

          {!loading && filteredBlogs.length > 0 ? (
            <>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {paginatedBlogs.map((blog, index) => (
                  <BlogCard
                    key={blog._id || blog.slug}
                    blog={blog}
                    index={(currentPage - 1) * BLOGS_PER_PAGE + index}
                  />
                ))}
              </div>

              {totalPages > 1 ? (
                <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    className="h-12 border border-white/14 px-6 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-[#65BC4F] hover:text-[#65BC4F] disabled:pointer-events-none disabled:opacity-35"
                  >
                    Previous
                  </button>
                  <span className="flex h-12 min-w-12 items-center justify-center bg-[#65BC4F] px-4 text-sm font-black text-[#050505]">
                    {safeCurrentPage} / {totalPages}
                  </span>
                  <button
                    disabled={safeCurrentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    className="h-12 border border-white/14 px-6 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:border-[#65BC4F] hover:text-[#65BC4F] disabled:pointer-events-none disabled:opacity-35"
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}
