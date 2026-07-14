import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogClient, { BlogType, RelatedBlogType } from "./BlogClient";

const SITE_URL = "https://www.bigwigmedia.in";

async function getBlog(slug: string): Promise<BlogType | null> {
  if (!process.env.NEXT_PUBLIC_API_BASE) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const blogs: BlogType[] = await res.json();
  return blogs.find((blog) => blog.slug === slug) || null;
}

async function getRelatedBlogs(slug: string): Promise<RelatedBlogType[]> {
  if (!process.env.NEXT_PUBLIC_API_BASE) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/blog/related/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];

  const blogs = await res.json();
  return Array.isArray(blogs) ? blogs : [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog | Bigwig Media",
    };
  }

  const url = `${SITE_URL}/blog/${blog.slug}`;

  return {
    title: `${blog.title} | Bigwig Media`,
    description: blog.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url,
      images: blog.coverImage ? [{ url: blog.coverImage }] : undefined,
      siteName: "Bigwig Media",
      locale: "en_IN",
      publishedTime: blog.datePublished,
      authors: blog.author ? [blog.author] : ["Bigwig Media"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
  };
}

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  const relatedBlogs = await getRelatedBlogs(slug);

  return <BlogClient blog={blog} relatedBlogs={relatedBlogs} />;
}
