'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BookOpen, BadgePercent, LifeBuoy, Briefcase, Plus, CheckCircle, ExternalLink } from 'lucide-react';

export default function AdminResourcesPage() {
  const [activeTab, setActiveTab] = React.useState<'learning' | 'financial' | 'support' | 'career'>('learning');
  const [resources, setResources] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/admin/resources')
      .then((res) => res.json())
      .then((data) => {
        setResources(data.resources || {});
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Resource Management</h2>
        <p className="text-sm text-slate-500">
          Institutional catalog for student academic, financial, personal wellness, and career resources.
        </p>
      </div>

      {/* Resource Category Tabs (Exactly 4 per Section 2 of spec) */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('learning')}
          className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'learning'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Learning Resources</span>
        </button>

        <button
          onClick={() => setActiveTab('financial')}
          className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'financial'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BadgePercent className="h-4 w-4" />
          <span>Financial Resources</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'support'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <LifeBuoy className="h-4 w-4" />
          <span>Support Resources</span>
        </button>

        <button
          onClick={() => setActiveTab('career')}
          className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'career'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>Career Resources</span>
        </button>
      </div>

      {/* Tab 1: Learning Resources */}
      {activeTab === 'learning' && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Curriculum & Subject Learning Material</CardTitle>
              <p className="text-xs text-slate-500">
                Course notes, technical PDFs, video lectures, assignments, and quizzes.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(resources.learning || []).map((res: any) => (
                  <TableRow key={res.id}>
                    <TableCell className="font-semibold text-slate-900 text-sm">
                      {res.title}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{res.subject}</TableCell>
                    <TableCell>
                      <span className="text-xs font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {res.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Financial Resources */}
      {activeTab === 'financial' && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Institutional & Government Financial Support</CardTitle>
            <p className="text-xs text-slate-500">
              Scholarships and subsidized educational loans curated for enrolled students.
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scholarship / Loan Program</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Key Benefit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(resources.financial || []).map((res: any) => (
                  <TableRow key={res.id}>
                    <TableCell className="font-semibold text-slate-900 text-sm">
                      {res.name}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs uppercase font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {res.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{res.provider}</TableCell>
                    <TableCell className="text-xs text-slate-800 font-medium">{res.benefit}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Support Resources */}
      {activeTab === 'support' && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Campus Counsellors & Wellness Directory</CardTitle>
            <p className="text-xs text-slate-500">
              Official campus wellness counsellors and student guidance cell contacts.
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Counsellor Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Office Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(resources.support || []).map((res: any) => (
                  <TableRow key={res.id}>
                    <TableCell className="font-semibold text-slate-900 text-sm">
                      {res.name}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{res.specialization}</TableCell>
                    <TableCell className="text-xs text-slate-700 font-mono">{res.contact}</TableCell>
                    <TableCell className="text-xs text-slate-600">{res.availability}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                        Available
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Career Resources */}
      {activeTab === 'career' && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Career Opportunities & Skill Catalogs</CardTitle>
            <p className="text-xs text-slate-500">
              Jobs, internships, certifications, and skill development resources.
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(resources.career || []).map((res: any) => (
                  <TableRow key={res.id}>
                    <TableCell className="font-semibold text-slate-900 text-sm">
                      {res.title}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {res.type.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{res.organization}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
