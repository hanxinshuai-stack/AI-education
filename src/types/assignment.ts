export type AssignmentStatus = "pending" | "submitted" | "graded";

export interface AssignmentQuestion {
  stem: string;
  type: string;
  score: number;
}

export interface AssignmentItem {
  id: string;
  title: string;
  courseName: string;
  teacherName: string;
  assignedAt: string;
  dueAt: string;
  status: AssignmentStatus;
  questionCount: number;
  questions: AssignmentQuestion[];
}

export interface PublishAssignmentPayload {
  title: string;
  courseName: string;
  teacherName: string;
  dueAt: string;
  questions: AssignmentQuestion[];
}
