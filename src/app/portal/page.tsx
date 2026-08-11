'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePortal } from '@/lib/portal/portal-context';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Building2 } from 'lucide-react';

export default function PortalLoginPage() {
  const router = useRouter();
  const { currentUser, login, isLoading } = usePortal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && currentUser) {
      if (currentUser.role === 'admin') {
        router.push('/portal/admin/dashboard');
      } else {
        router.push('/portal/dashboard');
      }
    }
  }, [currentUser, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your registered email');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        const cleanEmail = email.trim().toLowerCase();
        if (cleanEmail === 'admin@webcorestudios.in') {
          router.push('/portal/admin/dashboard');
        } else {
          router.push('/portal/dashboard');
        }
      } else {
        setErrorMsg(res.error || 'Access Denied, contact WebCore Studios');
      }
    } catch {
      setErrorMsg('An unexpected login error occurred');
    } finally {
      setSubmitting(false);
    }
  };



  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#09090b]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#09090b] px-4 py-12">
      {/* Background Ambient Glowing Gradients */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-950/40 p-3 shadow-lg shadow-purple-900/20 backdrop-blur-xl">
            <Building2 className="h-7 w-7 text-purple-400" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            WebCore Studios
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Intern & Business Development Portal
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-lg font-semibold text-white">Portal Sign In</h2>
            <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-300">
              <ShieldCheck className="h-3.5 w-3.5" /> Secure SSL
            </span>
          </div>

          {errorMsg && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-300">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@webcorestudios.in"
                  className="w-full rounded-xl border border-white/10 bg-zinc-950/80 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <span className="text-xs text-slate-500">Default given at onboarding</span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-zinc-950/80 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-500 active:scale-[0.99] disabled:opacity-50"
            >
              {submitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>


        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} WebCore Studios — High Performance Software & AI Engineering
        </p>
      </div>
    </main>
  );
}
