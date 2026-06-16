import { http } from "@/api/http";
import type { AssignmentItem, PublishAssignmentPayload } from "@/types/assignment";

export async function getStudentAssignments() {
  const response = await http.get<AssignmentItem[]>("/assignments");
  return response.data;
}

export async function publishAssignment(payload: PublishAssignmentPayload) {
  const response = await http.post<AssignmentItem>("/assignments", payload);
  return response.data;
}
