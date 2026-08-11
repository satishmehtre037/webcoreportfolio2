'use client';

import React from 'react';
import InternShell from '../intern-shell';
import { usePortal } from '@/lib/portal/portal-context';
import { IndianRupee, TrendingUp, CheckCircle2, Clock, Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function CommissionPage() {
  const { currentUser, commissions, getInternCommissionRate } = usePortal();

  if (!currentUser) return null;

  const myCommissions = commissions.filter((c) => c.intern_id === currentUser.intern_id);

  const currentRate = getInternCommissionRate(currentUser.intern_id);

  const totalEarned = myCommissions.reduce(
    (sum, c) => sum + Number(c.commission_amount || 0),
    0
  );

  const paidOut = myCommissions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + Number(c.commission_amount || 0), 0);

  const pendingPayout = myCommissions
    .filter((c) => c.status === 'pending' || c.status === 'approved')
    .reduce((sum, c) => sum + Number(c.commission_amount || 0), 0);

  return (
    <InternShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-6">
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Commission & Earnings</h1>
          <p className="text-sm text-slate-400">
            Track your performance-based tier status, earnings calculations, and disbursement history.
          </p>
        </div>

        {/* Tier Rate Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/40 via-zinc-900 to-zinc-900 p-6 shadow-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-purple-500/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-purple-300">
                  Current Commission Tier
                </span>
                <span className="font-mono text-xs text-slate-400">Tier {currentRate === 10 ? '1' : currentRate === 12 ? '2' : '3'}</span>
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold text-white">
                {currentRate}% Earnings Rate per Deal
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                {currentRate === 10
                  ? 'Base tier (10%). Close 3+ client deals to unlock the 12% acceleration rate!'
                  : currentRate === 12
                  ? 'Pro tier (12%). Close 5+ client deals to unlock the maximum 15% rate!'
                  : '🔥 Elite tier (15%) active! You are earning maximum commission on all closed deals.'}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-zinc-950/80 p-4 text-center">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Deals Closed</span>
                <span className="font-display text-2xl font-bold text-emerald-400">
                  {myCommissions.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Earnings */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Total Lifetime Earnings
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-emerald-400">
              ₹{totalEarned.toLocaleString('en-IN')}
            </p>
            <p className="mt-1 text-xs text-slate-400">Gross commission generated</p>
          </div>

          {/* Paid Out */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Disbursed / Paid Out
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-purple-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-purple-300">
              ₹{paidOut.toLocaleString('en-IN')}
            </p>
            <p className="mt-1 text-xs text-slate-400">Transferred to bank / UPI</p>
          </div>

          {/* Pending Payout */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg">
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
            <p className="mt-1 text-xs text-slate-400">Scheduled for upcoming payout</p>
          </div>
        </div>

        {/* Commission History Table */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-white">Payout History & Records</h3>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-xl">
            {myCommissions.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <IndianRupee className="mx-auto mb-3 h-10 w-10 text-slate-600" />
                <p className="text-base font-semibold text-slate-300">No commission records yet</p>
                <p className="mt-1 text-xs text-slate-500">
                  Commissions are automatically created when your submitted leads transition to &quot;Closed Won&quot;.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-white/10 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-4 py-3.5">Lead Reference</th>
                      <th className="px-4 py-3.5">Project Value</th>
                      <th className="px-4 py-3.5">Commission Rate</th>
                      <th className="px-4 py-3.5">Amount Earned</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5 text-right">Created On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {myCommissions.map((comm) => (
                      <tr key={comm.id} className="transition hover:bg-white/5">
                        <td className="px-4 py-4 font-medium text-white">{comm.lead_id}</td>
                        <td className="px-4 py-4 font-mono text-xs text-slate-300">
                          ₹{Number(comm.project_amount).toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-4 font-mono text-xs text-purple-300 font-bold">
                          {comm.commission_percentage}%
                        </td>
                        <td className="px-4 py-4 font-mono font-bold text-emerald-400">
                          ₹{Number(comm.commission_amount).toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${
                              comm.status === 'paid'
                                ? 'bg-emerald-600 text-white border-emerald-500'
                                : comm.status === 'approved'
                                ? 'bg-blue-950/80 text-blue-300 border-blue-800/50'
                                : 'bg-amber-950/80 text-amber-300 border-amber-800/50'
                            }`}
                          >
                            {comm.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right font-mono text-xs text-slate-400">
                          {new Date(comm.created_at).toLocaleDateString('en-IN', {
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
      </div>
    </InternShell>
  );
}
