import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog/posts";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Software Development & AI Insights Blog | WebCore Studio",
  description:
    "Engineering insights, Next.js performance guides, AI software architecture, and business automation strategies for ambitious companies.",
  alternates: {
    canonical: `${SITE.url}/blog`,
  },
  openGraph: {
    title: "Software & AI Insights Blog | WebCore Studio",
    description:
      "Engineering insights, Next.js performance guides, and enterprise AI automation strategies.",
    url: `${SITE.url}/blog`,
    type: "website",
  },
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      {/* Header Bar */}
      <header className="border-b border-charcoal/10 bg-ivory/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold font-display tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="w-8 h-8 rounded-lg bg-rust flex items-center justify-center text-ivory text-sm">
              W
            </span>
            <span>WebCore Studio</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-rust transition-colors">
              Home
            </Link>
            <Link href="/#services" className="hover:text-rust transition-colors">
              Services
            </Link>
            <Link href="/locations/india" className="hover:text-rust transition-colors">
              India
            </Link>
            <Link href="/#contact" className="hover:text-rust transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rust/30 bg-rust/5 text-rust text-xs font-mono font-semibold uppercase tracking-wider">
            SEO &amp; Engineering Journal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-charcoal">
            AI Software &amp; Next.js Insights
          </h1>
          <p className="text-lg text-charcoal/70 max-w-2xl font-body">
            Deep-dive guides on AI software development, high-performance Next.js 15 architectures, and automated customer workflows.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between border border-charcoal/10 rounded-2xl p-8 bg-ivory hover:border-rust/40 transition-all shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-charcoal/50">
                  <span className="px-2.5 py-1 rounded-md bg-charcoal/5 font-medium text-rust">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold font-display leading-snug group-hover:text-rust transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm text-charcoal/70 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-charcoal/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rust/10 flex items-center justify-center font-bold text-xs text-rust">
                    SM
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal">
                      {post.author.name}
                    </p>
                    <p className="text-[10px] text-charcoal/50">{post.date}</p>
                  </div>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-rust flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Read Article &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
