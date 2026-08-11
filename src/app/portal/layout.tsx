import type { Metadata } from 'next';
import { PortalProvider } from '@/lib/portal/portal-context';

export const metadata: Metadata = {
  title: 'Intern Portal — WebCore Studios',
  description: 'Intern & Business Development Portal for WebCore Studios',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalProvider>
      <div className="min-h-screen bg-[#09090b] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </div>
    </PortalProvider>
  );
}
