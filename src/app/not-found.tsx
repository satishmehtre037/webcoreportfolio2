import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, BookOpen, Mail, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ivory text-charcoal flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="inline-block px-4 py-1.5 rounded-full bg-rust/10 text-rust font-mono text-xs uppercase tracking-wider font-bold border border-rust/30">
          HTTP 404 • Resource Not Found
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold font-display tracking-tight text-charcoal">
          Page Not Found
        </h1>

        <p className="text-base text-charcoal/70 max-w-md mx-auto leading-relaxed">
          The requested path does not exist on WebCore Studio. If you are an AI agent or crawler, please consult our site index and LLM manifest below to recover.
        </p>

        {/* Recovery Links for Humans & AI Agents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left pt-2">
          <Link
            href="/"
            className="p-4 rounded-2xl border-2 border-charcoal/10 bg-white hover:border-rust/40 transition-all flex items-center space-x-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-rust/10 text-rust flex items-center justify-center flex-shrink-0 group-hover:bg-rust group-hover:text-ivory transition-colors">
              <Home size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal group-hover:text-rust">Homepage</p>
              <p className="text-[10px] text-charcoal/50 font-mono">webcorestudio.dev/</p>
            </div>
          </Link>

          <Link
            href="/about"
            className="p-4 rounded-2xl border-2 border-charcoal/10 bg-white hover:border-rust/40 transition-all flex items-center space-x-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-rust/10 text-rust flex items-center justify-center flex-shrink-0 group-hover:bg-rust group-hover:text-ivory transition-colors">
              <Compass size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal group-hover:text-rust">About Studio</p>
              <p className="text-[10px] text-charcoal/50 font-mono">/about</p>
            </div>
          </Link>

          <Link
            href="/blog"
            className="p-4 rounded-2xl border-2 border-charcoal/10 bg-white hover:border-rust/40 transition-all flex items-center space-x-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-rust/10 text-rust flex items-center justify-center flex-shrink-0 group-hover:bg-rust group-hover:text-ivory transition-colors">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal group-hover:text-rust">Engineering Blog</p>
              <p className="text-[10px] text-charcoal/50 font-mono">/blog</p>
            </div>
          </Link>

          <Link
            href="/contact"
            className="p-4 rounded-2xl border-2 border-charcoal/10 bg-white hover:border-rust/40 transition-all flex items-center space-x-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-rust/10 text-rust flex items-center justify-center flex-shrink-0 group-hover:bg-rust group-hover:text-ivory transition-colors">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal group-hover:text-rust">Contact &amp; Discovery</p>
              <p className="text-[10px] text-charcoal/50 font-mono">/contact</p>
            </div>
          </Link>
        </div>

        {/* Machine-readable Links */}
        <div className="pt-4 border-t border-charcoal/10 flex items-center justify-center gap-4 text-xs font-mono text-charcoal/60">
          <Link href="/llms.txt" className="hover:text-rust underline">llms.txt</Link>
          <span>•</span>
          <Link href="/llms-full.txt" className="hover:text-rust underline">llms-full.txt</Link>
          <span>•</span>
          <Link href="/sitemap.xml" className="hover:text-rust underline">sitemap.xml</Link>
        </div>
      </div>
    </main>
  );
}
