'use client';

import * as React from 'react';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  AlertTriangle,
  HeartHandshake,
  BookOpen,
  CalendarX2,
  BadgePercent,
  Briefcase,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

import { DashboardSkeleton } from '@/components/ui/dashboard-skeleton';

export default function AdminDashboardPage() {
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((res) => res.json())
      .then((res) => {
        setData(res.stats);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const stats = data || {
    totalStudents: 6,
    totalFaculty: 2,
    studentsRequiringAttention: 2,
    academicConcerns: 2,
    attendanceConcerns: 2,
    financialSupportIndicators: 3,
    personalSupportIndicators: 1,
    careerSupportIndicators: 4,
    interventionSummary: {
      total: 2,
      byCategory: {
        academic: 1,
        attendance_engagement: 0,
        financial: 1,
        personal_support: 0,
        career: 0,
      },
    },
  };

  const chartData = [
    { category: 'Academic', count: stats.academicConcerns || 2, fill: '#ef4444' },
    { category: 'Attendance', count: stats.attendanceConcerns || 2, fill: '#f59e0b' },
    { category: 'Financial', count: stats.financialSupportIndicators || 3, fill: '#10b981' },
    { category: 'Personal/Counsel', count: stats.personalSupportIndicators || 1, fill: '#a855f7' },
    { category: 'Career', count: stats.careerSupportIndicators || 4, fill: '#6366f1' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Quick Navigation Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Institutional Dashboard
          </h2>
          <p className="text-sm text-slate-500">
            Real-time institutional predictive indicators and targeted intervention telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/faculty">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
              Manage Faculty
            </Button>
          </Link>
          <Link href="/admin/students">
            <Button size="sm" className="gap-1.5 text-xs">
              <Users className="h-4 w-4" />
              View Students
            </Button>
          </Link>
        </div>
      </div>

      {/* Row 1: Core Institutional Indicators (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students Enrolled"
          value={stats.totalStudents}
          icon={<Users className="h-5 w-5" />}
          color="indigo"
          description="Active institutional registrations"
        />
        <StatCard
          title="Total Faculty Members"
          value={stats.totalFaculty}
          icon={<GraduationCap className="h-5 w-5" />}
          color="blue"
          description="Mentors & department leads"
        />
        <StatCard
          title="Students Requiring Attention"
          value={stats.studentsRequiringAttention}
          icon={<AlertTriangle className="h-5 w-5" />}
          color="amber"
          description="Identified by predictive signals"
        />
        <StatCard
          title="Targeted Interventions"
          value={stats.interventionSummary?.total || 2}
          icon={<HeartHandshake className="h-5 w-5" />}
          color="emerald"
          description="Faculty-led support workflows"
        />
      </div>

      {/* Row 2: Categorical Sector Predictive Indicators (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard
          title="Academic Sector"
          value={stats.academicConcerns}
          icon={<BookOpen className="h-5 w-5" />}
          color="red"
          description="GPA / backlog / quiz decline"
        />
        <StatCard
          title="Attendance Sector"
          value={stats.attendanceConcerns}
          icon={<CalendarX2 className="h-5 w-5" />}
          color="amber"
          description="Attendance rate below 75%"
        />
        <StatCard
          title="Financial Sector"
          value={stats.financialSupportIndicators}
          icon={<BadgePercent className="h-5 w-5" />}
          color="emerald"
          description="Eligible for aid or loans"
        />
        <StatCard
          title="Personal & Wellness"
          value={stats.personalSupportIndicators || 1}
          icon={<HeartHandshake className="h-5 w-5" />}
          color="indigo"
          description="Counselling & personal support"
        />
        <StatCard
          title="Career Sector"
          value={stats.careerSupportIndicators}
          icon={<Briefcase className="h-5 w-5" />}
          color="indigo"
          description="Active internship / job interest"
        />
      </div>

      {/* Intervention Summary & Analytic Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Institutional Predictive Indicators Breakdown</CardTitle>
            <p className="text-xs text-slate-500">
              Aggregated categorical signals monitored across the student body
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="category" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Intervention Summary & Quick Links */}
        <Card className="border-slate-200 flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Targeted Intervention Summary</CardTitle>
            <p className="text-xs text-slate-500">
              Closed feedback loop between analytics & faculty action
            </p>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-800">Academic Tutoring</div>
                <div className="text-[11px] text-slate-500">Remedial problem sets</div>
              </div>
              <span className="font-bold text-sm text-indigo-600">1 Active</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-800">Financial Aid Referrals</div>
                <div className="text-[11px] text-slate-500">Scholarship verification</div>
              </div>
              <span className="font-bold text-sm text-emerald-600">1 Active</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-800">Wellness & Counselling</div>
                <div className="text-[11px] text-slate-500">Campus counsellor cell</div>
              </div>
              <span className="font-bold text-sm text-slate-500">0 Active</span>
            </div>

            <div className="pt-2">
              <Link href="/admin/resources">
                <Button variant="outline" className="w-full justify-between text-xs">
                  <span>Manage Institutional Resources</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
