'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { usePortal } from '@/lib/portal/portal-context';
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  IndianRupee,
  FileSpreadsheet,
  FolderGit2,
  LogOut,
  Menu,
  X,
  Lock,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';

const INTERN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
  { label: 'Submit Lead', href: '/portal/leads/new', icon: PlusCircle },
  { label: 'My Leads', href: '/portal/leads', icon: ListOrdered },
  { label: 'Commission', href: '/portal/commission', icon: IndianRupee },
  { label: 'Weekly Report', href: '/portal/reports', icon: FileSpreadsheet },
  { label: 'Documents & Scripts', href: '/portal/documents', icon: FolderGit2 },
];

export default function InternShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, isLoading, updatePassword } = usePortal();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [savingPass, setSavingPass] = useState(false);

  const mustChangePass =
    currentUser?.role === 'intern' &&
    (currentUser.must_change_password === true ||
      currentUser.password === 'webcore123' ||
      !currentUser.password);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      setPassError('Please enter a new password');
      return;
    }

    if (newPassword.length < 6) {
      setPassError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('Passwords do not match');
      return;
    }

    if (newPassword === 'webcore123') {
      setPassError('Please choose a different password than the default one');
      return;
    }

    setSavingPass(true);
    setPassError('');

    try {
      const res = await updatePassword(newPassword.trim());
      if (!res.success) {
        setPassError(res.error || 'Failed to update password');
      }
    } catch {
      setPassError('Failed to update password');
    } finally {
      setSavingPass(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (!currentUser) {
        router.push('/portal');
      } else if (currentUser.role === 'admin') {
        router.push('/portal/admin/dashboard');
      }
    }
  }, [currentUser, isLoading, router]);

  if (isLoading || !currentUser || currentUser.role === 'admin') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#09090b]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#09090b]">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-zinc-950/95 lg:flex">
        {/* WebCore Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white font-bold font-display text-base shadow-lg shadow-purple-900/30">
            WC
          </div>
          <div>
            <h2 className="font-display text-sm font-bold text-white tracking-wide">WebCore Studios</h2>
            <span className="text-[10px] font-mono text-purple-400">Intern Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 p-4">
          {INTERN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-xl border border-white/10 bg-zinc-900/80 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-900/50 text-purple-300 font-bold text-xs">
                {currentUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">{currentUser.name}</p>
                <p className="truncate font-mono text-[10px] text-purple-400">{currentUser.intern_id}</p>
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
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950 px-4 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-bold font-display text-xs">
              WC
            </div>
            <div>
              <h2 className="font-display text-sm font-bold text-white">WebCore Portal</h2>
              <span className="text-[10px] font-mono text-purple-400">{currentUser.intern_id}</span>
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
              {INTERN_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive ? 'bg-purple-600/20 text-purple-300' : 'text-slate-400 hover:text-slate-200'
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
              Sign Out
            </button>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>

      {/* Mandatory Password Change Modal Overlay */}
      {mustChangePass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-purple-500/30 bg-zinc-900 p-6 shadow-2xl shadow-purple-950/50 space-y-6">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-950/50 text-purple-400">
                <KeyRound className="h-6 w-6" />
              </div>
              <h2 className="font-display text-xl font-bold text-white">Compulsory Password Setup</h2>
              <p className="mt-1 text-xs text-slate-400">
                For security reasons, you must set a private password before accessing your WebCore Intern account.
              </p>
            </div>

            {passError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  New Password *
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={savingPass}
                className="w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-500 active:scale-[0.99] disabled:opacity-50"
              >
                {savingPass ? 'Updating Security Credentials...' : 'Save New Password & Enter Portal'}
              </button>
            </form>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push('/portal');
                }}
                className="text-xs text-slate-500 hover:text-slate-400 underline"
              >
                Sign out instead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
