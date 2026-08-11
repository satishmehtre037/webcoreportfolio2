'use client';

import React from 'react';
import Link from 'next/link';
import InternShell from '../intern-shell';
import { usePortal } from '@/lib/portal/portal-context';
import {
  Target,
  IndianRupee,
  Award,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
  FileSpreadsheet,
  Megaphone,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export default function InternDashboardPage() {
  const { currentUser, leads, commissions, announcements, leaderboard } = usePortal();

  if (!currentUser) return null;

  const myLeads = leads.filter((l) => l.intern_id === currentUser.intern_id);
  const totalLeadsSubmitted = myLeads.length;

  const myCommissions = commissions.filter((c) => c.intern_id === currentUser.intern_id);
  const totalCommissionEarned = myCommissions.reduce(
    (acc, curr) => acc + Number(curr.commission_amount || 0),
    0
  );

  const pendingPayout = myCommissions
    .filter((c) => c.status === 'pending' || c.status === 'approved')
    .reduce((acc, curr) => acc + Number(curr.commission_amount || 0), 0);

  const myLeaderboardEntry = leaderboard.find((l) => l.intern_id === currentUser.intern_id);
  const currentRank = myLeaderboardEntry ? myLeaderboardEntry.rank : 'N/A';

  const recentLeads = [...myLeads]
    .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
    .slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
      case 'reviewing':
        return 'bg-blue-950/80 text-blue-300 border-blue-800/50';
      case 'qualified':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50';
      case 'meeting_scheduled':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/50';
      case 'proposal_sent':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/50';
      case 'closed_won':
        return 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-sm shadow-emerald-500/20';
      case 'closed_lost':
        return 'bg-red-950/80 text-red-400 border-red-800/50';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <InternShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-purple-500/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-purple-300">
                Intern Dashboard
              </span>
              <span className="font-mono text-xs text-slate-400">ID: {currentUser.intern_id}</span>
            </div>
            <h1 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-sm text-slate-400">
              Track your BD lead submissions, monitor real-time deal stages, and check commission payouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portal/leads/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:bg-purple-500"
            >
              <PlusCircle className="h-4 w-4" /> Submit New Lead
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Leads */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Leads Submitted
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-purple-400">
                <Target className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-white">{totalLeadsSubmitted}</p>
            <p className="mt-1 text-xs text-slate-400">Across all business categories</p>
          </div>

          {/* Total Commission Earned */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Total Commission
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <IndianRupee className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-emerald-400">
              ₹{totalCommissionEarned.toLocaleString('en-IN')}
            </p>
            <p className="mt-1 text-xs text-slate-400">Calculated from closed won deals</p>
          </div>

          {/* Pending Payout */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Pending Payout
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-amber-300">
              ₹{pendingPayout.toLocaleString('en-IN')}
            </p>
            <p className="mt-1 text-xs text-slate-400">Processing & scheduled</p>
          </div>

          {/* Leaderboard Rank */}
          <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-purple-300">
                Leaderboard Rank
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/20 text-amber-300">
                <Award className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-amber-300">
              {currentRank === 1 ? '🥇 #1' : currentRank === 2 ? '🥈 #2' : currentRank === 3 ? '🥉 #3' : `#${currentRank}`}
            </p>
            <p className="mt-1 text-xs text-purple-300/80">Out of all active interns</p>
          </div>
        </div>

        {/* Weekly Report Reminder Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/50 via-zinc-900 to-zinc-900 p-6 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/20 text-purple-300">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">Weekly Outreach Report Due</h3>
                <p className="mt-1 text-xs text-slate-300">
                  Please make sure to log your weekly outreach numbers, call volumes, and challenges faced.
                </p>
              </div>
            </div>

            <Link
              href="/portal/reports"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/20 px-4 py-2.5 text-xs font-semibold text-purple-200 transition hover:bg-purple-500/30"
            >
              Submit Weekly Report <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Grid: Announcements & Recent Submissions */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Submissions */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">Recent Lead Submissions</h3>
              <Link
                href="/portal/leads"
                className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300"
              >
                View All My Leads <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-xl">
              {recentLeads.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  You have not submitted any leads yet.{' '}
                  <Link href="/portal/leads/new" className="text-purple-400 hover:underline">
                    Submit your first lead
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-white/10 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Business Name</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">City</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {recentLeads.map((lead) => (
                        <tr key={lead.id} className="transition hover:bg-white/5">
                          <td className="px-4 py-3.5 font-medium text-white">{lead.business_name}</td>
                          <td className="px-4 py-3.5 text-xs text-slate-300">{lead.category || '—'}</td>
                          <td className="px-4 py-3.5 text-xs text-slate-300">{lead.city || '—'}</td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs capitalize ${getStatusBadge(
                                lead.status
                              )}`}
                            >
                              {lead.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right font-mono text-xs text-slate-400">
                            {new Date(lead.submitted_at).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Broadcast Announcements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-purple-400" />
              <h3 className="font-display text-lg font-bold text-white">Announcements</h3>
            </div>

            <div className="space-y-3">
              {announcements.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 text-center text-xs text-slate-500">
                  No announcements at this time.
                </div>
              ) : (
                announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="rounded-xl border border-white/10 bg-zinc-900/80 p-4 shadow-md backdrop-blur-md space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-purple-300">{ann.type}</span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {new Date(ann.created_at).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white">{ann.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{ann.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </InternShell>
  );
}
