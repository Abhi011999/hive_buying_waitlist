import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Group Buying & Community Buying in India | HiveBuying",
  description:
    "Insights on group buying and community buying in India. Learn how buying together helps you save more on cars, bikes, electronics and more with HiveBuying.",
  alternates: { canonical: "https://www.hivebuying.com/blog" },
  openGraph: {
    title: "HiveBuying Blog | Group Buying & Community Buying in India",
    description:
      "Insights on group buying and community buying in India. Learn how buying together helps you save more with HiveBuying.",
    url: "https://www.hivebuying.com/blog",
    type: "website",
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "HiveBuying Blog",
    url: "https://www.hivebuying.com/blog",
    description:
      "Insights on group buying and community buying in India with HiveBuying.",
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `https://www.hivebuying.com/blog/${p.slug}`,
    })),
  };

  return (
    <main className="flex min-h-screen flex-col bg-background pb-20 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <section className="mx-auto w-full max-w-5xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

        <div className="mt-6 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            The HiveBuying Blog
          </h1>
          <p className="mt-3 text-base text-foreground/60 sm:text-lg">
            Stories and insights on group buying, community buying, and how
            Indians are teaming up to buy smarter and pay less.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-10 block overflow-hidden rounded-2xl border-2 border-border bg-card p-6 transition hover:border-accent hover:shadow-lg sm:p-8"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">
            Featured
          </span>
          <h2 className="mt-3 text-2xl font-bold text-foreground transition group-hover:text-accent sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-3 text-foreground/60">{featured.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 text-sm text-foreground/40">
            <span>{formatDate(featured.date)}</span>
            <span aria-hidden>•</span>
            <span>{featured.readTime}</span>
            <span className="ml-auto inline-flex items-center gap-1 font-medium text-foreground/70 transition group-hover:text-accent">
              Read article
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>

        {/* Rest grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border-2 border-border bg-card p-6 transition hover:border-accent hover:shadow-lg"
            >
              <div className="flex items-center gap-2 text-xs text-foreground/40">
                <span>{formatDate(post.date)}</span>
                <span aria-hidden>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug text-foreground transition group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-foreground/60">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition group-hover:text-accent">
                Read article
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
