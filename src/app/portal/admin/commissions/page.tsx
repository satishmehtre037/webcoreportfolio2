'use client';

import React from 'react';
import { usePortal } from '@/lib/portal/portal-context';
import { CommissionStatus } from '@/lib/portal/types';
import { Wallet, CheckCircle2, Clock, Check, IndianRupee, Sparkles, Trash2 } from 'lucide-react';

export default function AdminCommissionsPage() {
  const { commissions, interns, leads, updateCommissionStatus, deleteCommission } = usePortal();

  const totalCommissionsCount = commissions.length;
  const totalPaid = commissions
    .filter((c) => c.status === 'paid')
    .reduce((acc, c) => acc + Number(c.commission_amount || 0), 0);
  const totalApproved = commissions
    .filter((c) => c.status === 'approved')
    .reduce((acc, c) => acc + Number(c.commission_amount || 0), 0);
  const totalPending = commissions
    .filter((c) => c.status === 'pending')
    .reduce((acc, c) => acc + Number(c.commission_amount || 0), 0);

  const getStatusBadge = (status: CommissionStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-950/60 text-amber-400 border-amber-800/40';
      case 'approved':
        return 'bg-blue-950/60 text-blue-400 border-blue-800/40';
      case 'paid':
        return 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-sm shadow-emerald-500/20';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Commission Payout Manager</h1>
        <p className="text-sm text-slate-400">
          Review, approve, and record payout transfers for intern sales commissions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Paid Out */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Paid Out</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-emerald-400">
            ₹{totalPaid.toLocaleString('en-IN')}
          </p>
          <p className="mt-1 text-xs text-slate-400">Completed disbursements</p>
        </div>

        {/* Approved Awaiting Payment */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Approved (Unpaid)</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-blue-300">
            ₹{totalApproved.toLocaleString('en-IN')}
          </p>
          <p className="mt-1 text-xs text-slate-400">Ready for transfer</p>
        </div>

        {/* Pending Audit */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Pending Approval</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-amber-300">
            ₹{totalPending.toLocaleString('en-IN')}
          </p>
          <p className="mt-1 text-xs text-slate-400">Under milestone review</p>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-2xl">
        {commissions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Wallet className="mx-auto mb-3 h-10 w-10 text-slate-600" />
            <p className="text-base font-semibold text-slate-300">No commission entries logged</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3.5">Intern ID & Name</th>
                  <th className="px-4 py-3.5">Client Business</th>
                  <th className="px-4 py-3.5">Project Value</th>
                  <th className="px-4 py-3.5">Rate %</th>
                  <th className="px-4 py-3.5">Commission Amount</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {commissions.map((comm) => {
                  const internObj = interns.find((i) => i.intern_id === comm.intern_id);
                  const leadObj = leads.find((l) => l.id === comm.lead_id);
                  return (
                    <tr key={comm.id} className="transition hover:bg-white/5">
                      <td className="px-4 py-4 font-medium text-white">
                        <span className="font-mono text-xs font-bold text-indigo-300">
                          {comm.intern_id}
                        </span>
                        <span className="block text-xs font-normal text-slate-400">
                          {internObj ? internObj.name : 'Unknown Intern'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs font-semibold text-white">
                        {leadObj ? leadObj.business_name : comm.lead_id}
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-300">
                        ₹{Number(comm.project_amount).toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-purple-300">
                        {comm.commission_percentage}%
                      </td>
                      <td className="px-4 py-4 font-mono font-bold text-emerald-400">
                        ₹{Number(comm.commission_amount).toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs capitalize ${getStatusBadge(
                            comm.status
                          )}`}
                        >
                          {comm.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          {comm.status === 'pending' && (
                            <button
                              onClick={() => updateCommissionStatus(comm.id, 'approved')}
                              className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300 hover:bg-blue-500/20"
                            >
                              Approve
                            </button>
                          )}
                          {comm.status !== 'paid' && (
                            <button
                              onClick={() => updateCommissionStatus(comm.id, 'paid')}
                              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20"
                            >
                              Mark as Paid
                            </button>
                          )}
                          {comm.status === 'paid' && (
                            <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-500">
                              <Check className="h-3.5 w-3.5 text-emerald-400" /> Disbursed
                            </span>
                          )}

                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this commission record?')) {
                                deleteCommission(comm.id);
                              }
                            }}
                            title="Delete Commission"
                            className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
