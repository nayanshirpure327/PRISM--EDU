import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export interface FacultyResourceItem {
  id: string;
  title: string;
  subject: string;
  branch: string;
  resource_type: 'lecture_notes' | 'question_bank' | 'syllabus' | 'video_lecture' | 'lab_manual';
  file_url: string;
  description: string;
  uploaded_by: string;
  uploaded_at: string;
}

// Global in-memory store for faculty resources
declare global {
  // eslint-disable-next-line no-var
  var __PRISM_FACULTY_RESOURCES: FacultyResourceItem[] | undefined;
}

if (!globalThis.__PRISM_FACULTY_RESOURCES) {
  globalThis.__PRISM_FACULTY_RESOURCES = [
    {
      id: 'res-101',
      title: 'DBMS Normalization Complete Study Guide (1NF - BCNF)',
      subject: 'Database Management Systems',
      branch: 'Computer Science and Engineering',
      resource_type: 'lecture_notes',
      file_url: 'https://prismedu.com/resources/dbms_normalization.pdf',
      description: 'Step-by-step notes on functional dependencies, 3NF vs BCNF decomposition examples.',
      uploaded_by: 'Dr. Sarah Mitchell',
      uploaded_at: '2024-09-10',
    },
    {
      id: 'res-102',
      title: 'Dijkstra & Graph Shortest Path Question Bank',
      subject: 'Data Structures & Algorithms',
      branch: 'Information Technology',
      resource_type: 'question_bank',
      file_url: 'https://prismedu.com/resources/dijkstra_qb.pdf',
      description: 'Practice problem set with solutions for mid-semester exam prep.',
      uploaded_by: 'Prof. David Reynolds',
      uploaded_at: '2024-09-12',
    },
    {
      id: 'res-103',
      title: 'Structural Analysis Formula Sheet & Lab Manual',
      subject: 'Structural Mechanics',
      branch: 'Civil Engineering',
      resource_type: 'lab_manual',
      file_url: 'https://prismedu.com/resources/civil_lab_manual.pdf',
      description: 'Comprehensive formula cheat sheet and deflection calculations for civil engineering labs.',
      uploaded_by: 'Dr. Rajesh Verma',
      uploaded_at: '2024-09-14',
    },
    {
      id: 'res-104',
      title: 'Thermodynamics & Heat Transfer Problem Set',
      subject: 'Thermodynamics',
      branch: 'Mechanical Engineering',
      resource_type: 'question_bank',
      file_url: 'https://prismedu.com/resources/thermo_problems.pdf',
      description: 'Numerical problem bank for 1st and 2nd laws of thermodynamics.',
      uploaded_by: 'Prof. David Reynolds',
      uploaded_at: '2024-09-15',
    },
  ];
}

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    resources: globalThis.__PRISM_FACULTY_RESOURCES || [],
  });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'faculty' && session.role !== 'admin')) {
    return NextResponse.json({ error: 'Unauthorized. Faculty or Admin privileges required.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, subject, branch, resource_type, file_url, description } = body;

    if (!title || !subject || !branch) {
      return NextResponse.json({ error: 'Title, Subject, and Branch are required' }, { status: 400 });
    }

    const newResource: FacultyResourceItem = {
      id: `res-${Date.now()}`,
      title,
      subject,
      branch: branch || 'Computer Science and Engineering',
      resource_type: resource_type || 'lecture_notes',
      file_url: file_url || 'https://prismedu.com/resources/document.pdf',
      description: description || '',
      uploaded_by: session.name || 'Faculty Member',
      uploaded_at: new Date().toISOString().split('T')[0],
    };

    if (!globalThis.__PRISM_FACULTY_RESOURCES) {
      globalThis.__PRISM_FACULTY_RESOURCES = [];
    }
    globalThis.__PRISM_FACULTY_RESOURCES.unshift(newResource);

    return NextResponse.json({
      success: true,
      message: 'Resource uploaded successfully',
      resource: newResource,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to upload resource' }, { status: 500 });
  }
}
