export type ExamStatus = "pending" | "graded";

export type ExamSubjectId = "it" | "business" | "general" | "math";

export interface ExamQuestion {
  id: string;
  stem: string;
  type: string;
  score: number;
  referenceAnswer: string;
}

export interface ExamItem {
  id: string;
  title: string;
  subjectId: ExamSubjectId;
  subjectName: string;
  courseName: string;
  teacherName: string;
  durationMinutes: number;
  dueAt: string;
  status: ExamStatus;
  maxScore: number;
  score?: number;
  gradedAt?: string;
  aiFeedback?: string;
  questions: ExamQuestion[];
  studentAnswers?: Record<string, string>;
}

export interface ExamScoreBySubject {
  subjectId: ExamSubjectId;
  subjectName: string;
  score: number | null;
  examTitle?: string;
}

export interface ExamSummaryPendingItem {
  id: string;
  title: string;
  subjectName: string;
  detail: string;
  statusLabel: string;
  color: string;
}

export interface ExamSummary {
  pendingCount: number;
  pendingExams: ExamSummaryPendingItem[];
  scoresBySubject: ExamScoreBySubject[];
  overallExamPercent: number;
}

export interface PublishExamPayload {
  title: string;
  subjectId: ExamSubjectId;
  subjectName: string;
  courseName: string;
  teacherName: string;
  durationMinutes: number;
  dueAt: string;
  questions: Array<{
    id?: string;
    stem: string;
    type: string;
    score: number;
    referenceAnswer: string;
  }>;
}

export interface SubmitExamPayload {
  answers: Record<string, string>;
}

export interface SubmitExamResult {
  score: number;
  maxScore: number;
  aiFeedback: string;
}
