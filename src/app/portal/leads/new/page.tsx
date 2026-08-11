'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InternShell from '../../intern-shell';
import { usePortal } from '@/lib/portal/portal-context';
import {
  PlusCircle,
  CheckCircle2,
  Building2,
  Phone,
  User,
  Globe,
  MapPin,
  Tag,
  MessageSquare,
  Send,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

import { LeadCategory, OutreachMethod } from '@/lib/portal/types';

const CATEGORIES: LeadCategory[] = [
  'Restaurant',
  'Salon',
  'Gym',
  'Retail',
  'Education',
  'Healthcare',
  'Real Estate',
  'Other',
];

const OUTREACH_METHODS: OutreachMethod[] = [
  'WhatsApp',
  'Instagram DM',
  'Cold Call',
  'In Person',
  'Email',
];

export default function SubmitLeadPage() {
  const router = useRouter();
  const { currentUser, addLead } = usePortal();

  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState<LeadCategory>('Restaurant');
  const [outreachMethod, setOutreachMethod] = useState<OutreachMethod>('Instagram DM');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!currentUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    if (phone.trim() && phone.trim().length !== 10) {
      setErrorMsg('Phone number must be exactly 10 digits.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await addLead({
        business_name: businessName.trim(),
        owner_name: ownerName.trim() || undefined,
        phone: phone.trim() ? `+91 ${phone.trim()}` : undefined,
        instagram: instagram.trim() || undefined,
        website: website.trim() || undefined,
        city: city.trim() || undefined,
        category,
        outreach_method: outreachMethod,
        notes: notes.trim() || undefined,
      });

      setSuccessMsg(true);
      setTimeout(() => {
        router.push('/portal/leads');
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to submit lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <InternShell>
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <Link
              href="/portal/leads"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to My Leads
            </Link>
            <h1 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
              Submit New Client Prospect
            </h1>
            <p className="text-sm text-slate-400">
              Log details of potential business clients for WebCore website & SaaS outreach.
            </p>
          </div>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-300">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white">Lead Successfully Recorded!</h4>
              <p className="text-xs text-emerald-300/80">Redirecting to your leads list...</p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        {/* Lead Form Card */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Section 1: Core Business Info */}
            <div className="space-y-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Building2 className="h-4 w-4 text-purple-400" /> Business Details
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Business Name */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Business / Brand Name *
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Saffron Bistro & Lounge"
                      className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Industry Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as LeadCategory)}
                    className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 px-4 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-zinc-900 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    City / Location
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai, Pune, Bangalore"
                      className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section 2: Contact Info */}
            <div className="space-y-4 pt-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <User className="h-4 w-4 text-purple-400" /> Owner & Contact Information
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Owner Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Owner / Decision Maker Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Rajesh Mehra"
                      className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Phone / WhatsApp Number (10 Digits)
                  </label>
                  <div className="relative flex items-center rounded-xl border border-white/10 bg-zinc-950 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
                    <div className="flex items-center gap-1 pl-3 text-slate-400 select-none">
                      <Phone className="h-4 w-4 text-purple-400" />
                      <span className="text-xs font-bold text-purple-300">+91</span>
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setPhone(digits);
                      }}
                      placeholder="9876543210"
                      className="w-full bg-transparent py-2.5 pl-2 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Instagram Handle */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Instagram Handle / URL
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <InstagramIcon className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="@saffronbistro"
                      className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Existing Website */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Existing Website URL (if any)
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Globe className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://saffronbistro.in"
                      className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section 3: Outreach Strategy */}
            <div className="space-y-4 pt-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Send className="h-4 w-4 text-purple-400" /> Outreach Strategy & Notes
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Outreach Method */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Outreach Channel Used *
                  </label>
                  <select
                    value={outreachMethod}
                    onChange={(e) => setOutreachMethod(e.target.value as OutreachMethod)}
                    className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 px-4 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    {OUTREACH_METHODS.map((m) => (
                      <option key={m} value={m} className="bg-zinc-900 text-white">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Notes */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Lead Notes & Context
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Mention owner conversation context, pain points identified (e.g. site is outdated, missing online ordering), or meeting date preference..."
                    className="w-full rounded-xl border border-white/10 bg-zinc-950 p-3.5 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Form Action Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-6">
              <Link
                href="/portal/leads"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:bg-purple-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" /> Save Lead Submission
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </InternShell>
  );
}
