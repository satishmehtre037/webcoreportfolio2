'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { usePortal } from '@/lib/portal/portal-context';
import {
  LayoutDashboard,
  Users,
  Target,
  Wallet,
  Megaphone,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Building2,
} from 'lucide-react';

const ADMIN_NAV_ITEMS = [
  { label: 'Overview', href: '/portal/admin/dashboard', icon: LayoutDashboard },
  { label: 'Interns Directory', href: '/portal/admin/interns', icon: Users },
  { label: 'Master Leads', href: '/portal/admin/leads', icon: Target },
  { label: 'Commission Payouts', href: '/portal/admin/commissions', icon: Wallet },
  { label: 'Announcements', href: '/portal/admin/announcements', icon: Megaphone },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, isLoading } = usePortal();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!currentUser) {
        router.push('/portal');
      } else if (currentUser.role !== 'admin') {
        router.push('/portal/dashboard');
      }
    }
  }, [currentUser, isLoading, router]);

  if (isLoading || !currentUser || currentUser.role !== 'admin') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#09090b]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#09090b]">
      {/* Desktop Admin Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-zinc-950/95 lg:flex">
        {/* Admin Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-950/50 text-indigo-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-sm font-bold text-white">WebCore Admin</h2>
            <span className="inline-block rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider text-indigo-300">
              HQ Control Center
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 p-4">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin Profile Footer */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-xl border border-white/10 bg-zinc-900/80 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs">
                HQ
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">Admin Console</p>
                <p className="truncate text-[10px] text-slate-400">admin@webcorestudios.in</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              router.push('/portal');
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
          >
            <LogOut className="h-3.5 w-3.5" />
            Admin Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950 px-4 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-900/40 text-indigo-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-sm font-bold text-white">WebCore Admin</h2>
              <span className="text-[10px] text-indigo-400 font-mono">HQ Control</span>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-white/10 p-2 text-slate-300"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="border-b border-white/10 bg-zinc-950 p-4 lg:hidden">
            <nav className="space-y-1">
              {ADMIN_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={() => {
                logout();
                router.push('/portal');
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-2 text-xs font-medium text-red-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              Admin Logout
            </button>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
