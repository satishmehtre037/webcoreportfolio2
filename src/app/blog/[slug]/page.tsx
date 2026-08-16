import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog/posts";
import { SITE } from "@/lib/constants/site";

export const revalidate = 86400;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  const baseUrl = SITE.url || "https://webcorestudio.dev";
  const ogImageUrl = `${baseUrl}/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`;

  return {
    title: `${post.title} | WebCore Studio`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const baseUrl = SITE.url || "https://webcorestudio.dev";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "WebCore Studio",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/webcore-logo-mark.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };

  const faqSchema = post.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Navigation */}
      <header className="border-b border-charcoal/10 bg-ivory/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-sm font-semibold text-rust hover:underline flex items-center gap-1"
          >
            &larr; Back to Blog
          </Link>
          <Link href="/" className="text-sm font-bold font-display">
            WebCore Studio
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Article Meta */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3 text-xs font-mono text-charcoal/60">
            <span className="px-2.5 py-1 rounded-md bg-rust/10 font-semibold text-rust uppercase">
              {post.category}
            </span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
            <span>&bull;</span>
            <span>{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-display leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-charcoal/70 leading-relaxed font-body">
            {post.excerpt}
          </p>

          {/* Author Bar */}
          <div className="pt-6 border-t border-charcoal/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-rust text-ivory flex items-center justify-center font-bold text-sm">
              SM
            </div>
            <div>
              <p className="text-sm font-bold">{post.author.name}</p>
              <p className="text-xs text-charcoal/60">{post.author.role}</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-stone max-w-none space-y-6 text-charcoal/85 leading-relaxed font-body border-t border-b border-charcoal/10 py-10">
          <div className="whitespace-pre-line">{post.content}</div>
        </div>

        {/* FAQs Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-charcoal/10">
            <h2 className="text-2xl font-bold font-display mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {post.faqs.map((faq, i) => (
                <div key={i} className="bg-charcoal/5 p-6 rounded-xl space-y-2">
                  <h3 className="text-base font-bold text-charcoal">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-charcoal/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Card */}
        <section className="mt-16 bg-charcoal text-ivory rounded-2xl p-8 text-center space-y-6">
          <h3 className="text-2xl font-bold font-display">
            Ready to Build Production AI Software?
          </h3>
          <p className="text-sm text-ivory/70 max-w-lg mx-auto">
            WebCore designs and ships custom Next.js platforms, AI copilots, and business automation workflows.
          </p>
          <div className="pt-2">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-rust text-ivory font-bold hover:opacity-90 transition-opacity"
            >
              Get Started with WebCore &rarr;
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
