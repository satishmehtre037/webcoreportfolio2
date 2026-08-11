'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/portal/portal-context';
import { AnnouncementType } from '@/lib/portal/types';
import { Megaphone, PlusCircle, Trash2, CheckCircle2, AlertTriangle, Info, Sparkles } from 'lucide-react';

export default function AdminAnnouncementsPage() {
  const { announcements, addAnnouncement, deleteAnnouncement } = usePortal();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AnnouncementType>('info');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      await addAnnouncement(title.trim(), message.trim(), type);
      setTitle('');
      setMessage('');
      setType('info');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getTypeStyle = (t: AnnouncementType) => {
    switch (t) {
      case 'urgent':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'warning':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'success':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'info':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Portal Announcements Manager</h1>
        <p className="text-sm text-slate-400">
          Broadcast target incentives, policy updates, or urgent alerts to all intern dashboards.
        </p>
      </div>

      {/* Create Announcement Form */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-2.5 border-b border-white/10 pb-4">
          <Megaphone className="h-5 w-5 text-indigo-400" />
          <h2 className="font-display text-lg font-bold text-white">Create New Broadcast Announcement</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Announcement Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 🚀 Q3 Bonus Drive Launched!"
                className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Type */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Severity / Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AnnouncementType)}
                className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="info" className="bg-zinc-900 text-white">
                  Information (Purple)
                </option>
                <option value="success" className="bg-zinc-900 text-white">
                  Success (Green)
                </option>
                <option value="warning" className="bg-zinc-900 text-white">
                  Warning (Yellow)
                </option>
                <option value="urgent" className="bg-zinc-900 text-white">
                  Urgent Alert (Red)
                </option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Message Content *
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter full announcement details for interns to read on their dashboard feed..."
              className="w-full rounded-xl border border-white/10 bg-zinc-950 p-3.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 disabled:opacity-50"
            >
              {submitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" /> Post Broadcast
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Past Announcements List */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-bold text-white">Active Announcements History</h3>

        <div className="space-y-3">
          {announcements.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-8 text-center text-xs text-slate-500">
              No active announcements broadcasted yet.
            </div>
          ) : (
            announcements.map((ann) => (
              <div
                key={ann.id}
                className="flex items-start justify-between rounded-xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg backdrop-blur-md"
              >
                <div className="space-y-1.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${getTypeStyle(
                        ann.type
                      )}`}
                    >
                      {ann.type}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {new Date(ann.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h4 className="font-display text-base font-bold text-white">{ann.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{ann.message}</p>
                </div>

                <button
                  onClick={() => deleteAnnouncement(ann.id)}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition shrink-0"
                  title="Delete Announcement"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
