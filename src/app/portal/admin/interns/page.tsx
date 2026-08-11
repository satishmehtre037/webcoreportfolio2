'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/portal/portal-context';
import { Intern } from '@/lib/portal/types';
import {
  Users,
  PlusCircle,
  UserCheck,
  UserX,
  Trash2,
  X,
  Building2,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export default function ManageInternsPage() {
  const { interns, leads, commissions, addIntern, updateInternStatus, deleteIntern } = usePortal();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const realInterns = interns.filter((i) => i.role === 'intern');

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (phone.trim() && phone.trim().length !== 10) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    setSubmitting(true);
    try {
      await addIntern({
        name: name.trim(),
        email: email.trim(),
        college: college.trim() || undefined,
        phone: phone.trim() ? `+91 ${phone.trim()}` : undefined,
        password: password.trim() || undefined,
      });

      setName('');
      setEmail('');
      setCollege('');
      setPhone('');
      setPassword('');
      setIsAddModalOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to register intern.';
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Manage Interns Directory</h1>
          <p className="text-sm text-slate-400">
            Register new business development interns, assign IDs, and monitor active account statuses.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500"
        >
          <PlusCircle className="h-4 w-4" /> Add New Intern
        </button>
      </div>

      {/* Interns Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3.5">Intern ID</th>
                <th className="px-4 py-3.5">Name & Email</th>
                <th className="px-4 py-3.5">College</th>
                <th className="px-4 py-3.5">Phone</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Leads Count</th>
                <th className="px-4 py-3.5">Comm. Earned</th>
                <th className="px-4 py-3.5">Joined Date</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {realInterns.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-xs text-slate-500">
                    No interns registered yet. Click &quot;Add New Intern&quot; above to add your first intern.
                  </td>
                </tr>
              ) : (
                realInterns.map((intern) => {
                  const internLeadsCount = leads.filter((l) => l.intern_id === intern.intern_id).length;
                  const internComms = commissions.filter((c) => c.intern_id === intern.intern_id);
                  const internCommEarned = internComms.reduce(
                    (sum, c) => sum + Number(c.commission_amount || 0),
                    0
                  );

                  return (
                    <tr key={intern.id} className="transition hover:bg-white/5">
                      <td className="px-4 py-4 font-mono text-xs font-bold text-indigo-300">
                        {intern.intern_id}
                      </td>
                      <td className="px-4 py-4 font-medium text-white">
                        {intern.name}
                        <span className="block text-xs font-normal text-slate-400">{intern.email}</span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-300">{intern.college || '—'}</td>
                      <td className="px-4 py-4 text-xs text-slate-300">{intern.phone || '—'}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
                            intern.status === 'active'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50'
                              : 'bg-red-950/80 text-red-400 border-red-800/50'
                          }`}
                        >
                          {intern.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-bold text-white">{internLeadsCount}</td>
                      <td className="px-4 py-4 font-mono font-bold text-purple-300">
                        ₹{internCommEarned.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-400">
                        {intern.joined_date}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {intern.status === 'active' ? (
                            <button
                              onClick={() => updateInternStatus(intern.id, 'inactive')}
                              className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300 hover:bg-amber-500/20"
                            >
                              <UserX className="h-3.5 w-3.5" /> Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => updateInternStatus(intern.id, 'active')}
                              className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20"
                            >
                              <UserCheck className="h-3.5 w-3.5" /> Activate
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to permanently delete intern ${intern.name} (${intern.intern_id})?`)) {
                                deleteIntern(intern.id);
                              }
                            }}
                            title="Permanently Delete Intern"
                            className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Intern Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-400" />
                <h3 className="font-display text-xl font-bold text-white">Register New Intern</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter intern full name"
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="intern@webcorestudios.in"
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  College / University
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. IIT Bombay / NMIMS"
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Phone Number (10 Digits)
                </label>
                <div className="flex items-center rounded-xl border border-white/10 bg-zinc-950 focus-within:border-indigo-500">
                  <span className="pl-3.5 text-xs font-bold text-indigo-400 select-none">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(digits);
                    }}
                    placeholder="9876543210"
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Initial Password (Optional)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Defaults to webcore123 if empty"
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3 text-xs text-indigo-300">
                ⚡ Intern ID format <strong className="font-mono text-white">WC-BD-00X</strong> will be automatically assigned upon creation.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-lg hover:bg-indigo-500 disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Intern Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
