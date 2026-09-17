import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

const DEMO_RESOURCES = {
  learning: [
    { id: '1', title: 'DBMS Normalization Notes (1NF to BCNF)', type: 'note', subject: 'Database Management Systems', active: true },
    { id: '2', title: 'SQL Indexing & Query Plan Guide', type: 'pdf', subject: 'Database Management Systems', active: true },
    { id: '3', title: 'Video: ACID Properties & Concurrency Control', type: 'video', subject: 'Database Management Systems', active: true },
    { id: '4', title: 'Assignment 1: Relational Decomposition', type: 'assignment', subject: 'Database Management Systems', active: true },
    { id: '5', title: 'Quiz: Normalization & Relational Theory', type: 'quiz', subject: 'Database Management Systems', active: true },
    { id: '6', title: 'Graph Algorithms & Shortest Path Notes', type: 'note', subject: 'Data Structures and Algorithms', active: true },
  ],
  financial: [
    { id: '1', name: 'Merit-cum-Means Post-Matric Scholarship', type: 'scholarship', provider: 'Ministry of Higher Education', benefit: '₹70,000/yr tuition fee waiver', active: true },
    { id: '2', name: 'National Science & Engineering Merit Award', type: 'scholarship', provider: 'National Science Foundation', benefit: '₹50,000/yr technical allowance', active: true },
    { id: '3', name: 'Pragati Scholarship for Female Engineers', type: 'scholarship', provider: 'AICTE', benefit: '₹50,000/yr academic expense aid', active: true },
    { id: '4', name: 'Vidya Lakshmi Education Loan Scheme', type: 'loan', provider: 'State Bank of India', benefit: 'Up to ₹15 Lakhs at 8.65% interest', active: true },
    { id: '5', name: 'PM Vidya Lakshmi Subsidized Student Loan', type: 'loan', provider: 'Canara Bank', benefit: 'Full interest subsidy during moratorium', active: true },
  ],
  support: [
    { id: '1', name: 'Dr. Aruna Sharma, Ph.D.', specialization: 'Student Wellness, Anxiety & Stress Management', contact: 'wellness.counsellor@prismedu.com | +91 9822334455', availability: 'Mon-Fri 10AM-4PM', active: true },
    { id: '2', name: 'Prof. Rajesh Ramanathan', specialization: 'Academic Stress & Career Transitions', contact: 'mentorship@prismedu.com | +91 9822334456', availability: 'Tue, Thu 2PM-5PM', active: true },
  ],
  career: [
    { id: '1', title: 'Full Stack Software Engineering Intern', type: 'internship', organization: 'ThoughtWorks Technologies', active: true },
    { id: '2', title: 'Junior Backend Developer', type: 'job', organization: 'Persistent Systems', active: true },
    { id: '3', title: 'AWS Certified Cloud Practitioner (Academic)', type: 'certification', organization: 'Amazon Web Services', active: true },
    { id: '4', title: 'Advanced Normalization & Database Internals', type: 'skill_resource', organization: 'PRISM Career Cell', active: true },
  ],
};

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'all';

  if (category in DEMO_RESOURCES) {
    return NextResponse.json({ resources: DEMO_RESOURCES[category as keyof typeof DEMO_RESOURCES] });
  }

  return NextResponse.json({ resources: DEMO_RESOURCES });
}
