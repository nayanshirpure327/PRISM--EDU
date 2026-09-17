'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bell, ShieldCheck, ChevronRight } from 'lucide-react';
import type { UserRole } from '@/lib/types';

interface NavbarProps {
  title?: string;
  role: UserRole;
  userName?: string;
}

export function Navbar({ title = 'Overview', role, userName }: NavbarProps) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-xs sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400 capitalize">{role}</span>
        <ChevronRight className="h-4 w-4 text-slate-300" />
        <h1 className="font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>RBAC Protected</span>
        </div>

        {role === 'student' && (
          <Link
            href="/student/notifications"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600" />
          </Link>
        )}
      </div>
    </header>
  );
}
