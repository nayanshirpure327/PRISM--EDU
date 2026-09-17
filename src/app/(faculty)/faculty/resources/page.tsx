'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { BookOpen, Upload, FileText, Download, Plus, Search, Filter, CheckCircle2 } from 'lucide-react';

export default function FacultyResourcesPage() {
  const [resources, setResources] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState('');
  const [branchFilter, setBranchFilter] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(true);
  const [showUploadModal, setShowUploadModal] = React.useState(false);

  // Modal Form State
  const [title, setTitle] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [branch, setBranch] = React.useState('Computer Science and Engineering');
  const [resourceType, setResourceType] = React.useState('lecture_notes');
  const [fileUrl, setFileUrl] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const fetchResources = () => {
    fetch('/api/faculty/resources')
      .then((res) => res.json())
      .then((data) => {
        setResources(data.resources || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  React.useEffect(() => {
    fetchResources();
  }, []);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/faculty/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subject,
          branch,
          resource_type: resourceType,
          file_url: fileUrl || 'https://prismedu.com/resources/sample_notes.pdf',
          description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload resource');

      setSuccessMsg('Student resource uploaded successfully!');
      fetchResources();
      setShowUploadModal(false);

      // Reset form
      setTitle('');
      setSubject('');
      setDescription('');
      setFileUrl('');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.subject.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (branchFilter !== 'all' && !r.branch.toLowerCase().includes(branchFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Student Resource & Study Material Upload
          </h2>
          <p className="text-sm text-slate-500">
            Publish lecture notes, question banks, lab manuals, and syllabus guides for your students across branches.
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)} className="gap-1.5 text-xs shrink-0">
          <Plus className="h-4 w-4" />
          <span>Upload Study Material</span>
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <Card className="border-slate-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by resource title, subject, or keywords..."
              className="pl-9"
            />
          </div>

          <Select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Branches' },
              { value: 'Computer Science', label: 'Computer Science (CSE)' },
              { value: 'Information Technology', label: 'Information Technology (IT)' },
              { value: 'Civil', label: 'Civil Engineering (CIVIL)' },
              { value: 'Mechanical', label: 'Mechanical Engineering (MECH)' },
              { value: 'Electrical', label: 'Electrical Engineering (EE)' },
              { value: 'Electronics', label: 'Electronics & Telecom (ENTC)' },
            ]}
          />
        </div>
      </Card>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-xl border-slate-200 shadow-xl bg-white p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="h-4 w-4 text-indigo-600" />
                <span>Upload Student Study Material</span>
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">✕</button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <Input
                label="Resource Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. DBMS Normalization 1NF to BCNF Notes"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Subject Name *"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Database Systems"
                  required
                />
                <Select
                  label="Engineering Branch *"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  options={[
                    { value: 'Computer Science and Engineering', label: 'Computer Science (CSE)' },
                    { value: 'Information Technology', label: 'Information Technology (IT)' },
                    { value: 'Civil Engineering', label: 'Civil Engineering (CIVIL)' },
                    { value: 'Mechanical Engineering', label: 'Mechanical Engineering (MECH)' },
                    { value: 'Electrical Engineering', label: 'Electrical Engineering (EE)' },
                    { value: 'Electronics & Telecommunication', label: 'Electronics & Telecom (ENTC)' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Material Type"
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  options={[
                    { value: 'lecture_notes', label: 'Lecture Notes / Slides' },
                    { value: 'question_bank', label: 'Question Bank & Solutions' },
                    { value: 'lab_manual', label: 'Lab Manual & Experiments' },
                    { value: 'syllabus', label: 'Syllabus & Exam Guide' },
                    { value: 'video_lecture', label: 'Video Lecture Link' },
                  ]}
                />
                <Input
                  label="File Download Link / URL"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://prismedu.com/files/guide.pdf"
                />
              </div>

              <Input
                label="Description & Notes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short outline of topics covered in this PDF..."
              />

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                  Upload Material
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Resources List Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading student study resources...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400 border border-dashed rounded-xl">
          No resources found for the selected branch.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <Card key={r.id} className="border-slate-200 hover:shadow-md transition-all">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{r.title}</h4>
                      <p className="text-xs font-semibold text-indigo-600 mt-0.5">{r.subject}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                    {r.resource_type.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{r.description}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div>
                    <span>{r.branch}</span> • <span className="text-slate-500">By {r.uploaded_by}</span>
                  </div>
                  <a href={r.file_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1 text-indigo-600 border-indigo-200">
                      <Download className="h-3 w-3" />
                      <span>Download</span>
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
