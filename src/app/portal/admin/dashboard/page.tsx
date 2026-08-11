'use client';

import React from 'react';
import Link from 'next/link';
import { usePortal } from '@/lib/portal/portal-context';
import {
  Users,
  Target,
  IndianRupee,
  Award,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Megaphone,
  PlusCircle,
  Building2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { interns, leads, commissions, leaderboard, announcements } = usePortal();

  const totalInterns = interns.filter((i) => i.role === 'intern').length;
  const totalLeads = leads.length;

  const totalRevenue = commissions.reduce((sum, c) => sum + Number(c.project_amount || 0), 0);
  const totalCommissionsPaid = commissions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + Number(c.commission_amount || 0), 0);

  const topLeaderboard = leaderboard.slice(0, 5);

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
    .slice(0, 6);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇 1st';
    if (rank === 2) return '🥈 2nd';
    if (rank === 3) return '🥉 3rd';
    return `#${rank}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
      case 'reviewing':
        return 'bg-blue-950/60 text-blue-400 border-blue-800/40';
      case 'qualified':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40';
      case 'meeting_scheduled':
        return 'bg-amber-950/60 text-amber-400 border-amber-800/40';
      case 'proposal_sent':
        return 'bg-purple-950/60 text-purple-400 border-purple-800/40';
      case 'closed_won':
        return 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-sm shadow-emerald-500/20';
      case 'closed_lost':
        return 'bg-red-950/60 text-red-400 border-red-800/40';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-indigo-300">
              Executive View
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
            Admin HQ Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Real-time pipeline monitoring, intern performance metrics, and payout audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/admin/interns"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500"
          >
            <Users className="h-4 w-4" /> Manage Interns
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Interns */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Interns</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">{totalInterns}</p>
          <p className="mt-1 text-xs text-slate-400">Active outreach representatives</p>
        </div>

        {/* Total Leads */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Submissions</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-purple-400">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-purple-300">{totalLeads}</p>
          <p className="mt-1 text-xs text-slate-400">Across all intern teams</p>
        </div>

        {/* Total Revenue Generated */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Project Revenue</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-emerald-400">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
          <p className="mt-1 text-xs text-slate-400">Closed contract volume</p>
        </div>

        {/* Commissions Paid */}
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-indigo-300">Commissions Paid</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <IndianRupee className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-amber-300">
            ₹{totalCommissionsPaid.toLocaleString('en-IN')}
          </p>
          <p className="mt-1 text-xs text-indigo-300/80">Disbursed to date</p>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            <h3 className="font-display text-lg font-bold text-white">Top Performance Leaderboard</h3>
          </div>
          <span className="text-xs text-slate-400">Ranked by Closed Won deals & commission</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3.5">Rank</th>
                  <th className="px-4 py-3.5">Intern Name</th>
                  <th className="px-4 py-3.5">Intern ID</th>
                  <th className="px-4 py-3.5">College</th>
                  <th className="px-4 py-3.5">Closed Won</th>
                  <th className="px-4 py-3.5">Total Leads</th>
                  <th className="px-4 py-3.5 text-right">Commission Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topLeaderboard.map((entry) => (
                  <tr key={entry.intern_id} className="transition hover:bg-white/5">
                    <td className="px-4 py-4 font-bold text-amber-300">
                      {getRankBadge(entry.rank)}
                    </td>
                    <td className="px-4 py-4 font-semibold text-white">{entry.name}</td>
                    <td className="px-4 py-4 font-mono text-xs text-indigo-300">{entry.intern_id}</td>
                    <td className="px-4 py-4 text-xs text-slate-300">{entry.college || '—'}</td>
                    <td className="px-4 py-4 font-bold text-emerald-400">{entry.closed_won_count}</td>
                    <td className="px-4 py-4 text-slate-300">{entry.total_leads}</td>
                    <td className="px-4 py-4 text-right font-mono font-bold text-purple-300">
                      ₹{entry.total_commission.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid: Recent Leads & Announcements Management */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Master Leads */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white">Recent Master Submissions</h3>
            <Link
              href="/portal/admin/leads"
              className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View All Master Leads <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Business</th>
                    <th className="px-4 py-3">Intern ID</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="transition hover:bg-white/5">
                      <td className="px-4 py-3.5 font-medium text-white">{lead.business_name}</td>
                      <td className="px-4 py-3.5 font-mono text-xs text-indigo-300">{lead.intern_id}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Announcements Quick Widget */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-indigo-400" />
              <h3 className="font-display text-lg font-bold text-white">Announcements</h3>
            </div>
            <Link
              href="/portal/admin/announcements"
              className="text-xs text-indigo-400 hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="rounded-xl border border-white/10 bg-zinc-900/80 p-4 shadow-md backdrop-blur-md"
              >
                <span className="text-[10px] uppercase font-bold text-indigo-300">{ann.type}</span>
                <h4 className="text-sm font-semibold text-white mt-1">{ann.title}</h4>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">{ann.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
