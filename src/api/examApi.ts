import { http } from "@/api/http";
import type {
  ExamItem,
  ExamSubjectId,
  ExamSummary,
  PublishExamPayload,
  SubmitExamPayload,
  SubmitExamResult,
} from "@/types/exam";

export async function getStudentExams(subjectId?: ExamSubjectId | "all") {
  const response = await http.get<ExamItem[]>("/exams", {
    params: subjectId && subjectId !== "all" ? { subjectId } : undefined,
  });
  return response.data;
}

export async function getExamById(examId: string) {
  const response = await http.get<ExamItem>(`/exams/${examId}`);
  return response.data;
}

export async function publishExam(payload: PublishExamPayload) {
  const response = await http.post<ExamItem>("/exams", payload);
  return response.data;
}

export async function submitExam(examId: string, payload: SubmitExamPayload) {
  const response = await http.post<SubmitExamResult>(`/exams/${examId}/submit`, payload);
  return response.data;
}

export async function getExamSummary() {
  const response = await http.get<ExamSummary>("/exam-summary");
  return response.data;
}
