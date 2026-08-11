'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Intern,
  Lead,
  Commission,
  WeeklyReport,
  Announcement,
  LeaderboardEntry,
  LeadStatus,
  CommissionStatus,
  AnnouncementType,
} from './types';
import { supabase, isSupabaseConfigured } from './supabase';

interface PortalContextType {
  currentUser: Intern | null;
  isAdmin: boolean;
  isLoading: boolean;
  interns: Intern[];
  leads: Lead[];
  commissions: Commission[];
  weeklyReports: WeeklyReport[];
  announcements: Announcement[];
  leaderboard: LeaderboardEntry[];
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  addIntern: (data: { name: string; email: string; college?: string; phone?: string; password?: string }) => Promise<void>;
  updateInternStatus: (id: string, status: 'active' | 'inactive') => Promise<void>;
  deleteIntern: (id: string) => Promise<void>;
  deleteLead: (leadId: string) => Promise<void>;
  deleteCommission: (commissionId: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  addLead: (leadData: Omit<Lead, 'id' | 'intern_id' | 'status' | 'submitted_at' | 'updated_at'>) => Promise<string>;
  updateLeadStatus: (leadId: string, status: LeadStatus, projectAmount?: number) => Promise<void>;
  updateCommissionStatus: (commissionId: string, status: CommissionStatus) => Promise<void>;
  submitWeeklyReport: (reportData: Omit<WeeklyReport, 'id' | 'intern_id' | 'submitted_at'>) => Promise<void>;
  addAnnouncement: (title: string, message: string, type: AnnouncementType) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  getInternCommissionRate: (internId: string) => number;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);



const ADMIN_USER: Intern = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'WebCore Admin',
  email: 'admin@webcorestudios.in',
  intern_id: 'WC-ADMIN-001',
  role: 'admin',
  status: 'active',
  joined_date: '2026-01-01',
  created_at: '2026-01-01T00:00:00Z',
};

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Intern | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [interns, setInterns] = useState<Intern[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [weeklyReports, setWeeklyReports] = useState<WeeklyReport[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const fetchDataFromSupabase = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const [
        { data: intData },
        { data: leadData },
        { data: commData },
        { data: repData },
        { data: annData },
      ] = await Promise.all([
        supabase.from('interns').select('*'),
        supabase.from('leads').select('*'),
        supabase.from('commissions').select('*'),
        supabase.from('weekly_reports').select('*'),
        supabase.from('announcements').select('*').order('created_at', { ascending: false }),
      ]);

      const isDeletedIntern = (i: Intern) =>
        i.name === '[DELETED]' ||
        i.email?.startsWith('deleted_') ||
        i.intern_id?.startsWith('DELETED_') ||
        (i.status as string) === 'deleted';

      const isDeletedLead = (l: Lead) =>
        l.business_name === '[DELETED]' || (l.status as string) === 'deleted';

      // Clean interns from DB
      const cleanInts = (intData || []).filter((i) => !isDeletedIntern(i));
      setInterns(cleanInts);
      localStorage.setItem('wc_interns', JSON.stringify(cleanInts));

      const validInternIds = new Set(cleanInts.map((i) => i.intern_id));
      validInternIds.add('WC-ADMIN-001');

      // Clean leads from DB
      const cleanLeads = (leadData || []).filter(
        (l) =>
          !isDeletedLead(l) &&
          l.intern_id &&
          l.intern_id !== 'WC-BD-DEMO' &&
          l.intern_id !== 'null' &&
          validInternIds.has(l.intern_id)
      );
      setLeads(cleanLeads);
      localStorage.setItem('wc_leads', JSON.stringify(cleanLeads));

      // Clean commissions from DB
      const cleanComms = (commData || []).filter(
        (c) =>
          c.intern_id &&
          c.intern_id !== 'WC-BD-DEMO' &&
          c.intern_id !== 'null' &&
          validInternIds.has(c.intern_id)
      );
      setCommissions(cleanComms);
      localStorage.setItem('wc_commissions', JSON.stringify(cleanComms));

      // Clean reports from DB
      const cleanReps = (repData || []).filter(
        (r) => r.intern_id && validInternIds.has(r.intern_id)
      );
      setWeeklyReports(cleanReps);
      localStorage.setItem('wc_reports', JSON.stringify(cleanReps));

      // Clean announcements from DB
      const cleanAnns = (annData || []).filter((a) => a.title !== '[DELETED]');
      setAnnouncements(cleanAnns);
      localStorage.setItem('wc_announcements', JSON.stringify(cleanAnns));
    } catch (err) {
      console.warn('Supabase fetch failed, using local fallback:', err);
      loadLocalFallback();
    }
  };

  function loadLocalFallback() {
    const localInt = localStorage.getItem('wc_interns');
    const localLeads = localStorage.getItem('wc_leads');
    const localComms = localStorage.getItem('wc_commissions');
    const localReps = localStorage.getItem('wc_reports');
    const localAnns = localStorage.getItem('wc_announcements');

    let parsedInt: Intern[] = localInt ? JSON.parse(localInt) : [];
    const demoEmails = ['aarav@webcorestudios.in', 'priya@webcorestudios.in', 'rohan@webcorestudios.in'];
    parsedInt = parsedInt.filter((i) => !demoEmails.includes(i.email));

    let parsedLeads: Lead[] = localLeads ? JSON.parse(localLeads) : [];
    parsedLeads = parsedLeads.filter((l) => l.intern_id !== 'WC-BD-DEMO');

    let parsedComms: Commission[] = localComms ? JSON.parse(localComms) : [];
    parsedComms = parsedComms.filter((c) => c.intern_id !== 'WC-BD-DEMO');

    setInterns(parsedInt);
    setLeads(parsedLeads);
    setCommissions(parsedComms);
    setWeeklyReports(localReps ? JSON.parse(localReps) : []);
    setAnnouncements(localAnns ? JSON.parse(localAnns) : []);
  }

  // Load initial data from Supabase or localStorage fallback + setup live polling
  useEffect(() => {
    // Load stored auth session
    const storedUserStr = localStorage.getItem('webcore_portal_user');
    if (storedUserStr) {
      try {
        setCurrentUser(JSON.parse(storedUserStr));
      } catch {
        localStorage.removeItem('webcore_portal_user');
      }
    }

    const init = async () => {
      setIsLoading(true);
      if (isSupabaseConfigured && supabase) {
        await fetchDataFromSupabase();
      } else {
        loadLocalFallback();
      }
      setIsLoading(false);
    };

    init();

    if (isSupabaseConfigured && supabase) {
      const handleSync = () => {
        fetchDataFromSupabase();
      };

      window.addEventListener('focus', handleSync);
      document.addEventListener('visibilitychange', handleSync);

      const intervalId = setInterval(handleSync, 15000);

      return () => {
        window.removeEventListener('focus', handleSync);
        document.removeEventListener('visibilitychange', handleSync);
        clearInterval(intervalId);
      };
    }
  }, []);

  // Save to localStorage state helper
  const syncState = (
    newInterns?: Intern[],
    newLeads?: Lead[],
    newComms?: Commission[],
    newReps?: WeeklyReport[],
    newAnns?: Announcement[]
  ) => {
    if (newInterns) {
      setInterns(newInterns);
      localStorage.setItem('wc_interns', JSON.stringify(newInterns));
    }
    if (newLeads) {
      setLeads(newLeads);
      localStorage.setItem('wc_leads', JSON.stringify(newLeads));
    }
    if (newComms) {
      setCommissions(newComms);
      localStorage.setItem('wc_commissions', JSON.stringify(newComms));
    }
    if (newReps) {
      setWeeklyReports(newReps);
      localStorage.setItem('wc_reports', JSON.stringify(newReps));
    }
    if (newAnns) {
      setAnnouncements(newAnns);
      localStorage.setItem('wc_announcements', JSON.stringify(newAnns));
    }
  };

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === 'admin@webcorestudios.in') {
      const adminPass = ADMIN_USER.password || 'admin123';
      if (password && password !== adminPass && password !== 'admin123') {
        return { success: false, error: 'Incorrect admin password.' };
      }
      setCurrentUser(ADMIN_USER);
      localStorage.setItem('webcore_portal_user', JSON.stringify(ADMIN_USER));
      return { success: true };
    }

    let foundIntern = interns.find((i) => i.email.toLowerCase() === cleanEmail);

    if (!foundIntern && isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase.from('interns').select('*').eq('email', cleanEmail).single();
        if (data) {
          foundIntern = data;
          if (!interns.some((i) => i.id === data.id)) {
            syncState([...interns, data]);
          }
        }
      } catch (e) {
        console.error('Supabase intern lookup error:', e);
      }
    }

    if (foundIntern) {
      if (foundIntern.status === 'inactive') {
        return { success: false, error: 'Your account is deactivated. Contact WebCore Studios.' };
      }

      const expectedPassword = foundIntern.password || 'webcore123';
      if (password && password.trim() !== expectedPassword) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      setCurrentUser(foundIntern);
      localStorage.setItem('webcore_portal_user', JSON.stringify(foundIntern));
      return { success: true };
    }

    return { success: false, error: 'Access Denied: Email not registered with WebCore Studios' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('webcore_portal_user');
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: 'Not authenticated' };

    const updatedUser = { ...currentUser, password: newPassword.trim(), must_change_password: false };
    setCurrentUser(updatedUser);
    localStorage.setItem('webcore_portal_user', JSON.stringify(updatedUser));

    if (currentUser.role === 'intern') {
      const updatedInterns = interns.map((i) => (i.id === currentUser.id ? updatedUser : i));
      if (isSupabaseConfigured && supabase) {
        await supabase
          .from('interns')
          .update({ password: newPassword.trim(), must_change_password: false })
          .eq('id', currentUser.id);
      }
      syncState(updatedInterns);
    }

    return { success: true };
  };

  const getInternCommissionRate = (internId: string): number => {
    const closedCount = leads.filter((l) => l.intern_id === internId && l.status === 'closed_won').length;
    if (closedCount >= 5) return 15;
    if (closedCount >= 3) return 12;
    return 10;
  };

  const addIntern = async (data: {
    name: string;
    email: string;
    college?: string;
    phone?: string;
    password?: string;
  }) => {
    const cleanEmail = data.email.trim().toLowerCase();

    // Prevent duplicate active email creation
    const existing = interns.find((i) => i.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error(`An intern account with email "${cleanEmail}" already exists.`);
    }

    const allInternIdStrings = [
      ...interns.map((i) => i.intern_id),
      ...leads.map((l) => l.intern_id),
      ...commissions.map((c) => c.intern_id),
      ...weeklyReports.map((r) => r.intern_id),
    ];
    const maxNum = allInternIdStrings.reduce((max, idStr) => {
      const match = idStr?.match(/WC-BD-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        return num > max ? num : max;
      }
      return max;
    }, 0);
    const internIdStr = `WC-BD-${String(maxNum + 1).padStart(3, '0')}`;

    const newIntern: Intern = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: cleanEmail,
      intern_id: internIdStr,
      college: data.college ? data.college.trim() : '',
      phone: data.phone ? data.phone.trim() : '',
      password: data.password ? data.password.trim() : 'webcore123',
      must_change_password: true,
      role: 'intern',
      status: 'active',
      joined_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('interns').upsert(newIntern);
      if (error) {
        console.warn('Supabase full upsert warning, trying base payload:', error);
        const basePayload = {
          id: newIntern.id,
          name: newIntern.name,
          email: newIntern.email,
          intern_id: newIntern.intern_id,
          college: newIntern.college,
          phone: newIntern.phone,
          role: newIntern.role,
          status: newIntern.status,
          joined_date: newIntern.joined_date,
          created_at: newIntern.created_at,
        };
        const { error: fallbackError } = await supabase.from('interns').upsert(basePayload);
        if (fallbackError) {
          console.error('Supabase fallback upsert failed:', fallbackError);
          throw new Error(`Failed to save intern to database: ${fallbackError.message}`);
        }
      }
    }

    // Update local state and localStorage
    syncState([...interns, newIntern]);
  };

  const updateInternStatus = async (id: string, status: 'active' | 'inactive') => {
    const updated = interns.map((i) => (i.id === id ? { ...i, status } : i));
    if (isSupabaseConfigured && supabase) {
      await supabase.from('interns').update({ status }).eq('id', id);
    }
    syncState(updated);
  };

  const deleteIntern = async (id: string) => {
    const targetIntern = interns.find((i) => i.id === id || i.intern_id === id);
    const targetInternId = targetIntern?.intern_id || id;
    const targetId = targetIntern?.id || id;

    const updatedInts = interns.filter((i) => i.id !== targetId && i.intern_id !== targetInternId);
    const updatedLeads = leads.filter((l) => l.intern_id !== targetInternId);
    const updatedComms = commissions.filter((c) => c.intern_id !== targetInternId);
    const updatedReps = weeklyReports.filter((r) => r.intern_id !== targetInternId);

    syncState(updatedInts, updatedLeads, updatedComms, updatedReps);

    if (isSupabaseConfigured && supabase) {
      try {
        // 1. Soft-delete update to guarantee cloud state update across all devices
        await supabase
          .from('interns')
          .update({
            name: '[DELETED]',
            email: `deleted_${Date.now()}_${targetIntern?.email || 'intern'}`,
            status: 'inactive',
          })
          .or(`id.eq.${targetId},intern_id.eq.${targetInternId}`);

        // 2. Cascade delete queries
        await supabase.from('weekly_reports').delete().eq('intern_id', targetInternId);
        await supabase.from('commissions').delete().eq('intern_id', targetInternId);
        await supabase.from('leads').delete().eq('intern_id', targetInternId);
        await supabase.from('interns').delete().or(`id.eq.${targetId},intern_id.eq.${targetInternId}`);
      } catch (err) {
        console.error('Failed to delete intern from Supabase:', err);
      }
    }
  };

  const deleteLead = async (leadId: string) => {
    const updatedLeads = leads.filter((l) => l.id !== leadId);
    const updatedComms = commissions.filter((c) => c.lead_id !== leadId);

    syncState(undefined, updatedLeads, updatedComms);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('leads')
          .update({ business_name: '[DELETED]', status: 'closed_lost' })
          .eq('id', leadId);
        await supabase.from('commissions').delete().eq('lead_id', leadId);
        await supabase.from('leads').delete().eq('id', leadId);
      } catch (err) {
        console.error('Failed to delete lead from Supabase:', err);
      }
    }
  };

  const deleteCommission = async (commissionId: string) => {
    const updatedComms = commissions.filter((c) => c.id !== commissionId);
    syncState(undefined, undefined, updatedComms);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('commissions').delete().eq('id', commissionId);
      } catch (err) {
        console.error('Failed to delete commission from Supabase:', err);
      }
    }
  };

  const addLead = async (
    leadData: Omit<Lead, 'id' | 'intern_id' | 'status' | 'submitted_at' | 'updated_at'>
  ): Promise<string> => {
    if (!currentUser) throw new Error('Not logged in');

    const leadId = crypto.randomUUID();
    const newLead: Lead = {
      ...leadData,
      id: leadId,
      intern_id: currentUser.intern_id,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('leads').upsert({
        id: newLead.id,
        intern_id: currentUser.intern_id,
        business_name: leadData.business_name,
        owner_name: leadData.owner_name,
        phone: leadData.phone,
        instagram: leadData.instagram,
        website: leadData.website,
        city: leadData.city,
        category: leadData.category,
        problem: leadData.problem,
        outreach_method: leadData.outreach_method,
        notes: leadData.notes,
        status: 'submitted',
        submitted_at: newLead.submitted_at,
        updated_at: newLead.updated_at,
      });
    }

    syncState(undefined, [newLead, ...leads]);
    return leadId;
  };

  const updateLeadStatus = async (leadId: string, status: LeadStatus, projectAmount?: number) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return;

    const updatedLeads = leads.map((l) =>
      l.id === leadId ? { ...l, status, updated_at: new Date().toISOString() } : l
    );

    let updatedComms = [...commissions];

    // If status updated to closed_won and projectAmount provided, calculate commission
    if (status === 'closed_won' && projectAmount && projectAmount > 0) {
      const rate = getInternCommissionRate(targetLead.intern_id);
      const commAmount = (projectAmount * rate) / 100;

      const newComm: Commission = {
        id: crypto.randomUUID(),
        intern_id: targetLead.intern_id,
        lead_id: leadId,
        project_amount: projectAmount,
        commission_percentage: rate,
        commission_amount: commAmount,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      updatedComms = [newComm, ...commissions];

      if (isSupabaseConfigured && supabase) {
        await supabase.from('commissions').insert(newComm);
      }
    }

    if (isSupabaseConfigured && supabase) {
      await supabase.from('leads').update({ status, updated_at: new Date().toISOString() }).eq('id', leadId);
    }

    syncState(undefined, updatedLeads, updatedComms);
  };

  const updateCommissionStatus = async (commissionId: string, status: CommissionStatus) => {
    const updated = commissions.map((c) =>
      c.id === commissionId
        ? {
            ...c,
            status,
            paid_at: status === 'paid' ? new Date().toISOString() : c.paid_at,
          }
        : c
    );

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('commissions')
        .update({
          status,
          paid_at: status === 'paid' ? new Date().toISOString() : null,
        })
        .eq('id', commissionId);
    }

    syncState(undefined, undefined, updated);
  };

  const submitWeeklyReport = async (
    reportData: Omit<WeeklyReport, 'id' | 'intern_id' | 'submitted_at'>
  ) => {
    if (!currentUser) return;

    const newReport: WeeklyReport = {
      ...reportData,
      id: crypto.randomUUID(),
      intern_id: currentUser.intern_id,
      submitted_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('weekly_reports').insert(newReport);
    }

    syncState(undefined, undefined, undefined, [newReport, ...weeklyReports]);
  };

  const addAnnouncement = async (title: string, message: string, type: AnnouncementType) => {
    const newAnn: Announcement = {
      id: crypto.randomUUID(),
      title,
      message,
      type,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      await supabase.from('announcements').insert(newAnn);
    }

    syncState(undefined, undefined, undefined, undefined, [newAnn, ...announcements]);
  };

  const deleteAnnouncement = async (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('announcements').delete().eq('id', id);
    }

    syncState(undefined, undefined, undefined, undefined, updated);
  };

  // Compute Leaderboard
  const leaderboard: LeaderboardEntry[] = interns
    .map((intern) => {
      const internLeads = leads.filter((l) => l.intern_id === intern.intern_id);
      const closedWon = internLeads.filter((l) => l.status === 'closed_won').length;
      const internComms = commissions.filter((c) => c.intern_id === intern.intern_id);
      const totalComm = internComms.reduce((acc, curr) => acc + Number(curr.commission_amount || 0), 0);

      return {
        rank: 0,
        intern_id: intern.intern_id,
        name: intern.name,
        college: intern.college || undefined,
        closed_won_count: closedWon,
        total_leads: internLeads.length,
        total_commission: totalComm,
      };
    })
    .sort((a, b) => {
      if (b.closed_won_count !== a.closed_won_count) {
        return b.closed_won_count - a.closed_won_count;
      }
      return b.total_commission - a.total_commission;
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  return (
    <PortalContext.Provider
      value={{
        currentUser,
        isAdmin: currentUser?.role === 'admin',
        isLoading,
        interns,
        leads,
        commissions,
        weeklyReports,
        announcements,
        leaderboard,
        login,
        logout,
        addIntern,
        updateInternStatus,
        deleteIntern,
        deleteLead,
        deleteCommission,
        updatePassword,
        addLead,
        updateLeadStatus,
        updateCommissionStatus,
        submitWeeklyReport,
        addAnnouncement,
        deleteAnnouncement,
        getInternCommissionRate,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}
