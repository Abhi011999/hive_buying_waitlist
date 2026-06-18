import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Blog | HiveBuying" };

  const url = `https://www.hivebuying.com/blog/${post.slug}`;
  return {
    title: `${post.title} | HiveBuying`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.hivebuying.com/blog/${post.slug}`,
    },
    author: { "@type": "Organization", name: "HiveBuying" },
    publisher: {
      "@type": "Organization",
      name: "HiveBuying",
      url: "https://www.hivebuying.com",
    },
  };

  return (
    <main className="flex min-h-screen flex-col bg-background pb-20 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <article className="mx-auto w-full max-w-3xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <header className="mt-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-foreground/40">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="prose prose-sm sm:prose-base dark:prose-invert mt-8 max-w-none">
          {post.paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-foreground/80 sm:text-lg"
            >
              {para}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border-2 border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Ready to buy together and pay less?
          </h2>
          <p className="mt-2 text-foreground/60">
            Explore products, join a group with buyers who want the same thing,
            and unlock better prices through collective demand.
          </p>
          <Link
            href="/explore"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Start Exploring
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14 border-t border-border pt-10">
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              Keep reading
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 transition hover:border-accent hover:shadow-md"
                >
                  <h3 className="text-sm font-semibold leading-snug text-foreground transition group-hover:text-accent">
                    {r.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground/50 transition group-hover:text-accent">
                    Read
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}
