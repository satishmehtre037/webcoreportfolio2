export type InternStatus = 'active' | 'inactive';
export type InternRole = 'intern' | 'admin';

export interface Intern {
  id: string;
  name: string;
  email: string;
  intern_id: string;
  college?: string | null;
  phone?: string | null;
  password?: string | null;
  must_change_password?: boolean | null;
  role: InternRole;
  status: InternStatus;
  joined_date: string;
  created_at: string;
}

export type LeadStatus =
  | 'submitted'
  | 'reviewing'
  | 'qualified'
  | 'meeting_scheduled'
  | 'proposal_sent'
  | 'closed_won'
  | 'closed_lost';

export type LeadCategory =
  | 'Restaurant'
  | 'Salon'
  | 'Gym'
  | 'Retail'
  | 'Education'
  | 'Healthcare'
  | 'Real Estate'
  | 'Other';

export type OutreachMethod =
  | 'WhatsApp'
  | 'Instagram DM'
  | 'Cold Call'
  | 'In Person'
  | 'Email';

export interface Lead {
  id: string;
  intern_id: string;
  business_name: string;
  owner_name?: string | null;
  phone?: string | null;
  instagram?: string | null;
  website?: string | null;
  city?: string | null;
  category?: LeadCategory | string | null;
  problem?: string | null;
  outreach_method?: OutreachMethod | string | null;
  notes?: string | null;
  status: LeadStatus;
  submitted_at: string;
  updated_at: string;
}

export type CommissionStatus = 'pending' | 'approved' | 'paid';

export interface Commission {
  id: string;
  intern_id: string;
  lead_id: string;
  project_amount: number;
  commission_percentage: number;
  commission_amount: number;
  status: CommissionStatus;
  paid_at?: string | null;
  created_at: string;
}

export interface WeeklyReport {
  id: string;
  intern_id: string;
  week_start: string;
  leads_submitted: number;
  calls_made: number;
  messages_sent: number;
  meetings_arranged: number;
  challenges?: string | null;
  next_week_plan?: string | null;
  submitted_at: string;
}

export type AnnouncementType = 'info' | 'success' | 'warning' | 'urgent';

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: AnnouncementType;
  created_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  intern_id: string;
  name: string;
  college?: string;
  closed_won_count: number;
  total_leads: number;
  total_commission: number;
}
