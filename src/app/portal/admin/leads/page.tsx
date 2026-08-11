'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/portal/portal-context';
import { Lead, LeadStatus } from '@/lib/portal/types';
import {
  Target,
  Search,
  CheckCircle2,
  X,
  IndianRupee,
  Building2,
  User,
  Phone,
  Tag,
  MapPin,
  Calendar,
  Sparkles,
  Trash2,
} from 'lucide-react';

const STATUS_OPTIONS: LeadStatus[] = [
  'submitted',
  'reviewing',
  'qualified',
  'meeting_scheduled',
  'proposal_sent',
  'closed_won',
  'closed_lost',
];

export default function AdminAllLeadsPage() {
  const { leads, interns, updateLeadStatus, deleteLead, getInternCommissionRate } = usePortal();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedIntern, setSelectedIntern] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Closed Won Modal state
  const [pendingWonLead, setPendingWonLead] = useState<Lead | null>(null);
  const [projectAmount, setProjectAmount] = useState<string>('50000');
  const [submittingWon, setSubmittingWon] = useState(false);

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesIntern = selectedIntern === 'all' || lead.intern_id === selectedIntern;
    const matchesSearch =
      lead.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.city && lead.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.intern_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesIntern && matchesSearch;
  });

  const handleStatusChange = (lead: Lead, newStatus: LeadStatus) => {
    if (newStatus === 'closed_won') {
      setPendingWonLead(lead);
    } else {
      updateLeadStatus(lead.id, newStatus);
    }
  };

  const handleConfirmClosedWon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingWonLead) return;

    const amountNum = parseFloat(projectAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setSubmittingWon(true);
    try {
      await updateLeadStatus(pendingWonLead.id, 'closed_won', amountNum);
      setPendingWonLead(null);
      setProjectAmount('50000');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingWon(false);
    }
  };

  const calculatedRate = pendingWonLead ? getInternCommissionRate(pendingWonLead.intern_id) : 10;
  const calculatedCommission = pendingWonLead
    ? ((parseFloat(projectAmount) || 0) * calculatedRate) / 100
    : 0;

  const getStatusStyle = (status: LeadStatus) => {
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
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="font-display text-2xl font-bold text-white md:text-3xl">All Submitted Leads</h1>
        <p className="text-sm text-slate-400">
          Master list of leads submitted across all intern representatives. Update pipeline statuses inline.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-zinc-900/60 p-4 lg:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search business name, city, intern ID..."
            className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Filter by Intern */}
        <div>
          <select
            value={selectedIntern}
            onChange={(e) => setSelectedIntern(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 px-4 text-sm text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="all" className="bg-zinc-900 text-white">
              All Interns
            </option>
            {interns
              .filter((i) => i.role === 'intern')
              .map((intern) => (
                <option key={intern.id} value={intern.intern_id} className="bg-zinc-900 text-white">
                  {intern.intern_id} — {intern.name}
                </option>
              ))}
          </select>
        </div>

        {/* Filter by Status */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 px-4 text-sm text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="all" className="bg-zinc-900 text-white">
              All Statuses
            </option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st} className="bg-zinc-900 text-white capitalize">
                {st.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-2xl">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Building2 className="mx-auto mb-3 h-10 w-10 text-slate-600" />
            <p className="text-base font-semibold text-slate-300">No leads match your filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3.5">Business & Owner</th>
                  <th className="px-4 py-3.5">Intern ID</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">City</th>
                  <th className="px-4 py-3.5">Outreach</th>
                  <th className="px-4 py-3.5">Status Update</th>
                  <th className="px-4 py-3.5">Submitted</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => {
                  const internObj = interns.find((i) => i.intern_id === lead.intern_id);
                  return (
                    <tr key={lead.id} className="transition hover:bg-white/5">
                      <td className="px-4 py-4 font-medium text-white">
                        {lead.business_name}
                        {lead.owner_name && (
                          <span className="block text-xs font-normal text-slate-400">
                            👤 {lead.owner_name} {lead.phone ? `(${lead.phone})` : ''}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-xs font-bold text-indigo-300">
                          {lead.intern_id}
                        </span>
                        {internObj && (
                          <span className="block text-[11px] text-slate-400">{internObj.name}</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-300">{lead.category || '—'}</td>
                      <td className="px-4 py-4 text-xs text-slate-300">{lead.city || '—'}</td>
                      <td className="px-4 py-4 text-xs text-slate-300">{lead.outreach_method || '—'}</td>
                      <td className="px-4 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead, e.target.value as LeadStatus)}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize focus:outline-none ${getStatusStyle(
                            lead.status
                          )}`}
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st} className="bg-zinc-900 text-white">
                              {st.replace('_', ' ')}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-400">
                        {new Date(lead.submitted_at).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete lead for "${lead.business_name}"?`)) {
                              deleteLead(lead.id);
                            }
                          }}
                          title="Delete Lead"
                          className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Closed Won Project Amount Modal */}
      {pendingWonLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-zinc-900 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <h3 className="font-display text-xl font-bold text-white">Closed Won Deal Setup</h3>
              </div>
              <button
                onClick={() => setPendingWonLead(null)}
                className="rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Marking <strong className="text-white">{pendingWonLead.business_name}</strong> as Closed Won. Please enter the final project contract value to auto-generate the intern&apos;s commission.
            </p>

            <form onSubmit={handleConfirmClosedWon} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Project Contract Amount (₹) *
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-bold">
                    ₹
                  </div>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="500"
                    value={projectAmount}
                    onChange={(e) => setProjectAmount(e.target.value)}
                    placeholder="75000"
                    className="w-full rounded-xl border border-white/10 bg-zinc-950 py-3 pl-9 pr-4 text-base font-bold text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Commission Calculation Preview */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Assigned Intern:</span>
                  <span className="font-bold text-white">{pendingWonLead.intern_id}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Intern Commission Tier:</span>
                  <span className="font-bold text-purple-300">{calculatedRate}% Rate</span>
                </div>
                <div className="flex justify-between border-t border-emerald-500/20 pt-2 text-sm font-bold">
                  <span className="text-emerald-300">Auto Commission Amount:</span>
                  <span className="text-emerald-400">₹{calculatedCommission.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPendingWonLead(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingWon}
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-lg hover:bg-emerald-500 disabled:opacity-50"
                >
                  {submittingWon ? 'Generating...' : 'Confirm Deal & Create Commission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
