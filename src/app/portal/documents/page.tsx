'use client';

import React, { useState } from 'react';
import InternShell from '../intern-shell';
import {
  FolderGit2,
  FileText,
  X,
  Copy,
  Check,
} from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  category: 'Legal' | 'Scripts' | 'Pricing' | 'Guide';
  description: string;
  content: string;
}

const DOCUMENTS: DocItem[] = [
  {
    id: 'doc-1',
    title: 'Intern Offer Letter & Terms',
    category: 'Legal',
    description: 'Official internship confirmation, scope of responsibilities, and confidentiality agreement.',
    content: `WEBCORE STUDIOS INTERNSHIP OFFER & DIRECTIVES
    
Role: Business Development Intern
Compensation Structure: Performance-Based Tiered Commissions (10% to 15%)
Duration: 3 Months (Extendable based on performance)

Responsibilities:
1. Identify potential local business clients (Restaurants, Salons, Gyms, Clinics, Schools, Real Estate).
2. Initiate outreach via Instagram DM, WhatsApp, Cold Calling, or In-Person visits.
3. Log all qualified client leads inside WebCore Intern Portal.
4. Arrange initial discovery meetings for the WebCore core technical team.

Confidentiality & Code of Conduct:
All client details and internal pricing structures remain strictly confidential.`,
  },
  {
    id: 'doc-2',
    title: 'Commission Policy & Bonus Structure',
    category: 'Legal',
    description: 'Detailed tier calculation rules, milestone bonuses, and payout schedule.',
    content: `COMMISSION POLICY & PAYOUT SCHEDULE

Base Commission Tier:
- 10% of total project contract value for your 1st and 2nd closed clients.

Volume Acceleration Tier:
- 12% commission rate on all deals once you hit 3+ closed clients.
- 15% commission rate on all deals once you hit 5+ closed clients.

Example Payout Calculation:
Client Project Value: ₹1,00,000 Next.js Web App
At Tier 3 (15%): Your Commission = ₹15,000 per closed deal!

Payout Timelines:
Commissions are disbursed within 3 business days after client's first project milestone payment is received by WebCore.`,
  },
  {
    id: 'doc-3',
    title: 'WhatsApp Outreach Scripts',
    category: 'Scripts',
    description: 'High-converting WhatsApp intro & follow-up message templates.',
    content: `WHATSAPP OUTREACH TEMPLATES

Template 1 (First Contact for Restaurants & Local Businesses):
"Hi [Owner Name]! 👋 I noticed [Business Name] on Google/Instagram. Your venue looks amazing! 

We recently revamped digital ordering & Next.js websites for top spots in [City]. Would you be open to a 2-minute preview on how a custom site can double your direct bookings without Zomato/Swiggy commission fees?"

Template 2 (Follow-up after 48 Hours):
"Hey [Owner Name], following up on this! Here's a 30-second live demo link of our latest project: [Insert WebCore Demo Link]. Let me know if you'd like a free custom mockup for [Business Name]!"`,
  },
  {
    id: 'doc-4',
    title: 'Instagram DM Outreach Scripts',
    category: 'Scripts',
    description: 'Conversational DM scripts designed for quick replies from boutique owners.',
    content: `INSTAGRAM DM SCRIPTS

Initial Hook (Casual & Direct):
"Hey team [Business Name]! Love your aesthetic 🔥 Quick question — who handles your website & online booking tech?"

Response Handling (When they reply):
"Awesome! The reason I ask is we're WebCore Studios — we build hyper-fast, custom websites and AI booking bots for premium local brands in [City]. 

We noticed your current IG link is missing a direct booking system. Could we share a quick 1-min design blueprint with the owner?"`,
  },
  {
    id: 'doc-5',
    title: 'Cold Calling Pitch Script',
    category: 'Scripts',
    description: '30-second elevator pitch script for phone calls with business owners.',
    content: `COLD CALLING SCRIPT (30-Sec Elevator Pitch)

Intern: "Hi! Am I speaking with the owner or manager of [Business Name]?"
Client: "Yes, this is [Name], speaking."

Intern: "Great! My name is [Your Name] from WebCore Studios. We build custom Next.js web applications and automated WhatsApp lead bots for top [Salons/Gyms/Restaurants] in Mumbai. 

I'm not calling to sell you anything right now — we just created a quick digital audit showing 3 quick layout improvements that could boost your direct client inquiries. Can I email or WhatsApp this 1-page report over to you today?"`,
  },
  {
    id: 'doc-6',
    title: 'WebCore Services & Pricing Guide',
    category: 'Pricing',
    description: 'Official price ranges for Landing Pages, Web Apps, AI Copilots & Automation.',
    content: `WEBCORE STUDIOS OFFICIAL PRICING GUIDE

1. Essential Brand Website (₹25,000 – ₹45,000)
- Custom Next.js 15 single page layout
- Mobile optimized, ultra-fast load time (< 1s)
- Contact form + Google Maps integration

2. Full Business SaaS & Booking Platform (₹50,000 – ₹1,20,000)
- Multi-page Next.js web application
- Admin dashboard, dynamic catalog/menu, online booking system
- Supabase database + payment gateway setup

3. Enterprise AI Copilot & WhatsApp Automation (₹75,000 – ₹2,00,000)
- Custom AI chatbot trained on business knowledge
- WhatsApp Business API automated lead qualification bot`,
  },
  {
    id: 'doc-7',
    title: 'Lead Qualification Checklist',
    category: 'Guide',
    description: 'Criteria to determine if a prospect is a high-ticket, qualified lead.',
    content: `LEAD QUALIFICATION CHECKLIST (BANT Framework)

1. Budget: Does the business have an operational budget of at least ₹30,000+ for digital upgrades?
2. Authority: Are you in direct conversation with the owner, partner, or general manager?
3. Need: Does the business lack a modern website, have slow load times, or suffer from low online conversions?
4. Timeline: Are they looking to launch within the next 2 to 4 weeks?

If all 4 criteria are met, tag lead as "Qualified" in your portal!`,
  },
  {
    id: 'doc-8',
    title: 'Internship FAQ & Best Practices',
    category: 'Guide',
    description: 'Answers to common questions regarding lead credit, payouts, and meetings.',
    content: `FREQUENTLY ASKED QUESTIONS

Q: How do I ensure I get credit for a lead?
A: Submit the lead in your portal BEFORE the initial meeting takes place. Lead ownership is automatically locked to your Intern ID.

Q: Who conducts the technical sales call with the client?
A: Once a lead is qualified, the core engineering team at WebCore will jump on the meeting with you to present the technical proposal and close the deal!

Q: How often are commissions paid?
A: Instantly upon client milestone receipt!`,
  },
];

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Legal':
        return 'bg-blue-950/80 text-blue-300 border-blue-800/50';
      case 'Scripts':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/50';
      case 'Pricing':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50';
      case 'Guide':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/50';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <InternShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Document & Resource Vault</h1>
          <p className="text-sm text-slate-400">
            Access official onboarding materials, cold outreach scripts, pricing guides, and policies.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOCUMENTS.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-md transition hover:border-purple-500/40 hover:shadow-purple-900/10"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getCategoryColor(
                      doc.category
                    )}`}
                  >
                    {doc.category}
                  </span>
                  <FolderGit2 className="h-5 w-5 text-slate-500" />
                </div>

                <h3 className="font-display text-lg font-bold text-white">{doc.title}</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{doc.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 py-2.5 text-xs font-semibold text-purple-300 transition hover:bg-purple-500/20"
                >
                  <FileText className="h-4 w-4" /> View & Copy Document
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${getCategoryColor(
                      selectedDoc.category
                    )}`}
                  >
                    {selectedDoc.category}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">{selectedDoc.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Document Content View */}
              <div className="relative rounded-xl border border-white/5 bg-zinc-950 p-5 font-mono text-xs text-slate-300 max-h-[350px] overflow-y-auto leading-relaxed whitespace-pre-line">
                {selectedDoc.content}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <button
                  onClick={() => handleCopy(selectedDoc.content)}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-purple-500"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-300" /> Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy Text Content
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedDoc(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InternShell>
  );
}
