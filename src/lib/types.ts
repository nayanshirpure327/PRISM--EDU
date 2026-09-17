// ─── Shared enums (mirror DB enums) ──────────────────────────────────────────
export type UserRole = 'admin' | 'faculty' | 'student';
export type AccountStatus = 'active' | 'inactive' | 'suspended';
export type InsightLevel = 'good' | 'attention_required' | 'declining' | 'critical';
export type InterventionType =
  | 'academic'
  | 'attendance_engagement'
  | 'financial'
  | 'personal_support'
  | 'career';
export type InterventionStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type ResourceType = 'note' | 'pdf' | 'video' | 'assignment' | 'quiz';
export type CareerType = 'job' | 'internship' | 'certification' | 'skill_resource';
export type FinancialAssistance = 'required' | 'not_required' | 'partial';
export type GenderType = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type StudentOutcome = 'enrolled' | 'graduated' | 'withdrawn' | 'transferred' | 'on_leave';

// ─── Session ─────────────────────────────────────────────────────────────────
export interface SessionUser {
  userId: string;
  role: UserRole;
  name: string;
  email: string;
  entityId: string; // faculty.id or student.id
  exp: number;
}

// ─── Department ───────────────────────────────────────────────────────────────
export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
}

// ─── Faculty ──────────────────────────────────────────────────────────────────
export interface Faculty {
  id: string;
  userId: string;
  employeeId: string;
  fullName: string;
  email: string;
  mobile?: string;
  departmentId?: string;
  department?: Department;
  designation?: string;
  specialization?: string;
  status: AccountStatus;
  createdAt: string;
}

// ─── Student ──────────────────────────────────────────────────────────────────
export interface Student {
  id: string;
  userId: string;
  studentId: string;
  fullName: string;
  email: string;
  mobile?: string;
  dateOfBirth?: string;
  gender?: GenderType;
  courseId?: string;
  course?: Course;
  departmentId?: string;
  department?: Department;
  academicYear?: number;
  admissionYear?: number;
  facultyId?: string;
  faculty?: Faculty;
  status: AccountStatus;
  currentOutcome: StudentOutcome;
  createdAt: string;
  updatedAt: string;
}

// ─── Course ───────────────────────────────────────────────────────────────────
export interface Course {
  id: string;
  name: string;
  code: string;
  departmentId?: string;
  department?: Department;
  durationYears: number;
}

// ─── Admission Profile ────────────────────────────────────────────────────────
export interface AdmissionProfile {
  id: string;
  studentId: string;
  tenthSchoolName?: string;
  tenthBoard?: string;
  tenthPassingYear?: number;
  tenthPercentage?: number;
  twelfthSchoolName?: string;
  twelfthBoard?: string;
  twelfthPassingYear?: number;
  physicsMarks?: number;
  chemistryMarks?: number;
  mathsMarks?: number;
  twelfthPercentage?: number;
  jeeMainPercentile?: number;
  jeeMainRank?: number;
  mhtCetPercentile?: number;
  mhtCetRank?: number;
  categoryRank?: number;
  capRoundAllotment?: string;
  previousGpa?: number;
  previousBacklogs?: number;
  familyIncome?: number;
  financialAssistance: FinancialAssistance;
  guardianName?: string;
  guardianRelationship?: string;
  guardianMobile?: string;
  guardianEmail?: string;
  guardianOccupation?: string;
}

// ─── Student Insight ──────────────────────────────────────────────────────────
export interface StudentInsight {
  id: string;
  studentId: string;
  academicLevel: InsightLevel;
  attendanceLevel: InsightLevel;
  financialLevel: InsightLevel;
  careerLevel: InsightLevel;
  supportLevel: InsightLevel;
  academicTrend: TrendPoint[];
  attendanceTrend: TrendPoint[];
  engagementTrend: TrendPoint[];
  quizTrend: TrendPoint[];
  assignmentTrend: TrendPoint[];
  recentChanges: RecentChange[];
  lastUpdated: string;
}

export interface TrendPoint {
  date: string;
  value: number;
  label?: string;
}

export interface RecentChange {
  date: string;
  field: string;
  oldValue: string;
  newValue: string;
  description: string;
}

// ─── Intervention ─────────────────────────────────────────────────────────────
export interface Intervention {
  id: string;
  studentId: string;
  student?: Pick<Student, 'id' | 'studentId' | 'fullName'>;
  facultyId: string;
  faculty?: Pick<Faculty, 'id' | 'fullName'>;
  type: InterventionType;
  description: string;
  status: InterventionStatus;
  followUpDate?: string;
  outcome?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Academic Record ──────────────────────────────────────────────────────────
export interface AcademicRecord {
  id: string;
  studentId: string;
  subjectId?: string;
  subject?: { name: string; code: string };
  semester: number;
  internalMarks?: number;
  externalMarks?: number;
  totalMarks?: number;
  grade?: string;
  backlogs: number;
  recordedAt: string;
}

// ─── Learning Resource ────────────────────────────────────────────────────────
export interface LearningResource {
  id: string;
  subjectId: string;
  subject?: { name: string; code: string };
  title: string;
  description?: string;
  type: ResourceType;
  contentUrl?: string;
  durationMinutes?: number;
  isActive: boolean;
  createdBy?: string;
  createdAt: string;
}

// ─── Scholarship ──────────────────────────────────────────────────────────────
export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  eligibility?: string;
  benefits?: string;
  deadline?: string;
  applicationLink?: string;
  isActive: boolean;
  minIncome?: number;
  maxIncome?: number;
  minPercentage?: number;
}

// ─── Educational Loan ─────────────────────────────────────────────────────────
export interface EducationalLoan {
  id: string;
  name: string;
  provider: string;
  loanInfo?: string;
  eligibility?: string;
  interestRate?: number;
  maxAmount?: number;
  importantConditions?: string;
  applicationLink?: string;
  isActive: boolean;
}

// ─── Counsellor ───────────────────────────────────────────────────────────────
export interface Counsellor {
  id: string;
  name: string;
  specialization?: string;
  email?: string;
  mobile?: string;
  availability?: string;
  officeLocation?: string;
  isActive: boolean;
}

// ─── Career Opportunity ───────────────────────────────────────────────────────
export interface CareerOpportunity {
  id: string;
  type: CareerType;
  title: string;
  organization?: string;
  description?: string;
  requiredSkills?: string[];
  applicationLink?: string;
  deadline?: string;
  provider?: string;
  isActive: boolean;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface AdminDashboardStats {
  totalStudents: number;
  totalFaculty: number;
  studentsRequiringAttention: number;
  totalInterventions: number;
  academicConcerns: number;
  attendanceConcerns: number;
  financialSupport: number;
  careerSupport: number;
  interventionsByType: InterventionTypeStat[];
  recentInterventions: Intervention[];
}

export interface InterventionTypeStat {
  type: string;
  count: number;
}

export interface FacultyDashboardStats {
  totalStudents: number;
  requiresAttention: number;
  academicConcerns: number;
  attendanceConcerns: number;
  pendingInterventions: number;
  concerningStudents: ConcerningStudent[];
  recentChanges: RecentChangeEntry[];
  pendingInterventionList: Intervention[];
}

export interface ConcerningStudent {
  student: Student;
  insight: StudentInsight;
}

export interface RecentChangeEntry {
  studentId: string;
  studentName: string;
  change: RecentChange;
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Import ───────────────────────────────────────────────────────────────────
export interface ImportRow {
  rowNumber: number;
  role?: UserRole;
  employeeId?: string;
  designation?: string;
  specialization?: string;
  studentId: string;
  fullName: string;
  email: string;
  mobile?: string;
  dateOfBirth?: string;
  gender?: string;
  course: string;
  department: string;
  academicYear?: number;
  admissionYear?: number;
  tenthSchoolName?: string;
  tenthBoard?: string;
  tenthPassingYear?: number;
  tenthPercentage?: number;
  twelfthSchoolName?: string;
  twelfthBoard?: string;
  twelfthPassingYear?: number;
  physicsMarks?: number;
  chemistryMarks?: number;
  mathsMarks?: number;
  twelfthPercentage?: number;
  jeeMainPercentile?: number;
  jeeMainRank?: number;
  mhtCetPercentile?: number;
  mhtCetRank?: number;
  categoryRank?: number;
  capRoundAllotment?: string;
  previousGpa?: number;
  previousBacklogs?: number;
  familyIncome?: number;
  financialAssistance?: FinancialAssistance;
  guardianName?: string;
  guardianMobile?: string;
}

export interface ImportValidationResult {
  totalRows: number;
  validRows: number;
  errorRows: number;
  duplicates: number;
  errors: ImportError[];
  duplicateList: ImportDuplicate[];
  validData: ImportRow[];
}

export interface ImportError {
  rowNumber: number;
  field: string;
  message: string;
}

export interface ImportDuplicate {
  rowNumber: number;
  studentId: string;
}

export interface ImportConfirmResult {
  created: number;
  failed: number;
  students: CreatedStudent[];
}

export interface CreatedStudent {
  studentId: string;
  fullName: string;
  email: string;
  tempPassword: string;
}
