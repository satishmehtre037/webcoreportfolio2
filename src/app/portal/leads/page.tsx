'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import InternShell from '../intern-shell';
import { usePortal } from '@/lib/portal/portal-context';
import { Lead, LeadStatus } from '@/lib/portal/types';
import {
  Search,
  PlusCircle,
  Eye,
  X,
  Building2,
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

export default function MyLeadsPage() {
  const { currentUser, leads } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  if (!currentUser) return null;

  const myLeads = leads.filter((l) => l.intern_id === currentUser.intern_id);

  const filteredLeads = myLeads.filter((lead) => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch =
      lead.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.city && lead.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.category && lead.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: LeadStatus) => {
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
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-white md:text-3xl">My Submitted Leads</h1>
            <p className="text-sm text-slate-400">
              View and track status updates for all client prospects you have logged.
            </p>
          </div>

          <Link
            href="/portal/leads/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:bg-purple-500"
          >
            <PlusCircle className="h-4 w-4" /> Submit New Lead
          </Link>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-zinc-900/60 p-4 sm:grid-cols-2">
          {/* Search Box */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search business name, city, category..."
              className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 px-4 text-sm text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="all" className="bg-zinc-900 text-white">
                All Lead Statuses ({myLeads.length})
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
              <p className="text-base font-semibold text-slate-300">No leads found</p>
              <p className="mt-1 text-xs text-slate-500">
                {myLeads.length === 0
                  ? "You haven't submitted any leads yet."
                  : 'Try adjusting your search query or status filter.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-4 py-3.5">Business Name</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">City</th>
                    <th className="px-4 py-3.5">Outreach</th>
                    <th className="px-4 py-3.5">Pipeline Status</th>
                    <th className="px-4 py-3.5">Submitted Date</th>
                    <th className="px-4 py-3.5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="transition hover:bg-white/5">
                      <td className="px-4 py-4 font-medium text-white">
                        {lead.business_name}
                        {lead.owner_name && (
                          <span className="block text-xs font-normal text-slate-400">
                            👤 {lead.owner_name}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-300">{lead.category || '—'}</td>
                      <td className="px-4 py-4 text-xs text-slate-300">{lead.city || '—'}</td>
                      <td className="px-4 py-4 text-xs text-slate-300">{lead.outreach_method || '—'}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${getStatusBadge(
                            lead.status
                          )}`}
                        >
                          {lead.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-400">
                        {new Date(lead.submitted_at).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="inline-flex items-center gap-1 rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300 hover:bg-purple-500/20"
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase ${getStatusBadge(
                      selectedLead.status
                    )}`}
                  >
                    {selectedLead.status.replace('_', ' ')}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">{selectedLead.business_name}</h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block text-slate-500 font-semibold uppercase">Category</span>
                  <span className="text-slate-200">{selectedLead.category || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold uppercase">City</span>
                  <span className="text-slate-200">{selectedLead.city || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold uppercase">Owner Name</span>
                  <span className="text-slate-200">{selectedLead.owner_name || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold uppercase">Phone</span>
                  <span className="text-slate-200">{selectedLead.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold uppercase">Instagram</span>
                  <span className="text-purple-300 font-mono">{selectedLead.instagram || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold uppercase">Outreach Method</span>
                  <span className="text-slate-200">{selectedLead.outreach_method || 'N/A'}</span>
                </div>
              </div>

              {selectedLead.notes && (
                <div className="rounded-xl border border-white/5 bg-zinc-950 p-4">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Notes & Conversation Context
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedLead.notes}</p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Close Detail
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InternShell>
  );
}
