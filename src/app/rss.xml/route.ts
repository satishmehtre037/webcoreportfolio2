import { BLOG_POSTS } from "@/lib/blog/posts";
import { SITE } from "@/lib/constants/site";

export const revalidate = 86400; // Revalidate daily

export async function GET() {
  const baseUrl = SITE.url || "https://webcorestudio.vercel.app";

  const rssItemsXml = BLOG_POSTS.map(
    (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <dc:creator><![CDATA[${post.author.name}]]></dc:creator>
    </item>`
  ).join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>WebCore Studio — Software &amp; AI Engineering Blog</title>
    <link>${baseUrl}</link>
    <description>Handcrafted digital products, custom AI copilots, high-performance Next.js web platforms and brand systems.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
