'use client';

import React, { useState } from 'react';
import InternShell from '../intern-shell';
import { usePortal } from '@/lib/portal/portal-context';
import { FileSpreadsheet, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function WeeklyReportsPage() {
  const { currentUser, weeklyReports, submitWeeklyReport } = usePortal();

  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday.toISOString().split('T')[0];
  });

  const [leadsSubmitted, setLeadsSubmitted] = useState<number>(0);
  const [callsMade, setCallsMade] = useState<number>(0);
  const [messagesSent, setMessagesSent] = useState<number>(0);
  const [meetingsArranged, setMeetingsArranged] = useState<number>(0);
  const [challenges, setChallenges] = useState('');
  const [nextWeekPlan, setNextWeekPlan] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!currentUser) return null;

  const myReports = weeklyReports.filter((r) => r.intern_id === currentUser.intern_id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitWeeklyReport({
        week_start: weekStart,
        leads_submitted: Number(leadsSubmitted),
        calls_made: Number(callsMade),
        messages_sent: Number(messagesSent),
        meetings_arranged: Number(meetingsArranged),
        challenges: challenges.trim() || null,
        next_week_plan: nextWeekPlan.trim() || null,
      });

      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);

      setLeadsSubmitted(0);
      setCallsMade(0);
      setMessagesSent(0);
      setMeetingsArranged(0);
      setChallenges('');
      setNextWeekPlan('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <InternShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Weekly Activity Reports</h1>
          <p className="text-sm text-slate-400">
            Log weekly BD outreach metrics, meetings arranged, and challenges faced.
          </p>
        </div>

        {/* Report Form Card */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="h-5 w-5 text-purple-400" />
              <h2 className="font-display text-lg font-bold text-white">Submit Weekly Report</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Intern: {currentUser.intern_id}</span>
          </div>

          {successMsg && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Weekly report successfully logged and saved!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* Week Start Date */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Week Starting Date *
                </label>
                <input
                  type="date"
                  required
                  value={weekStart}
                  onChange={(e) => setWeekStart(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Leads Submitted */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Leads Submitted
                </label>
                <input
                  type="number"
                  min="0"
                  value={leadsSubmitted}
                  onChange={(e) => setLeadsSubmitted(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Calls Made */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Cold Calls Made
                </label>
                <input
                  type="number"
                  min="0"
                  value={callsMade}
                  onChange={(e) => setCallsMade(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Messages Sent */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Messages / DMs Sent
                </label>
                <input
                  type="number"
                  min="0"
                  value={messagesSent}
                  onChange={(e) => setMessagesSent(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Meetings Arranged */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Meetings Arranged
                </label>
                <input
                  type="number"
                  min="0"
                  value={meetingsArranged}
                  onChange={(e) => setMeetingsArranged(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Challenges Faced */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Key Challenges Faced
                </label>
                <textarea
                  rows={3}
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="Objections encountered, slow responses, category difficulties..."
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 p-3.5 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Next Week Plan */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Plan For Next Week
                </label>
                <textarea
                  rows={3}
                  value={nextWeekPlan}
                  onChange={(e) => setNextWeekPlan(e.target.value)}
                  placeholder="Target locations, sectors, outreach targets for upcoming week..."
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 p-3.5 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-white/10 pt-5">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-500 disabled:opacity-50"
              >
                {submitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" /> Save Weekly Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Past Reports History */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-white">Past Submitted Reports</h3>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-xl">
            {myReports.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <FileSpreadsheet className="mx-auto mb-3 h-10 w-10 text-slate-600" />
                <p className="text-base font-semibold text-slate-300">No reports logged yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-white/10 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-4 py-3.5">Week Starting</th>
                      <th className="px-4 py-3.5">Leads Logged</th>
                      <th className="px-4 py-3.5">Calls</th>
                      <th className="px-4 py-3.5">Messages</th>
                      <th className="px-4 py-3.5">Meetings</th>
                      <th className="px-4 py-3.5">Submitted On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {myReports.map((rep) => (
                      <tr key={rep.id} className="transition hover:bg-white/5">
                        <td className="px-4 py-4 font-mono font-medium text-purple-300">
                          {rep.week_start}
                        </td>
                        <td className="px-4 py-4 font-bold text-white">{rep.leads_submitted}</td>
                        <td className="px-4 py-4 text-slate-300">{rep.calls_made}</td>
                        <td className="px-4 py-4 text-slate-300">{rep.messages_sent}</td>
                        <td className="px-4 py-4 font-bold text-emerald-400">{rep.meetings_arranged}</td>
                        <td className="px-4 py-4 font-mono text-xs text-slate-400">
                          {new Date(rep.submitted_at).toLocaleDateString('en-IN', {
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
