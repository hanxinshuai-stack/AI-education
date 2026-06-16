import { http } from "@/api/http";
import type { CourseTreeNode, OverviewMetric, QuestionBankItem } from "@/api/mockData";

interface KpiTrendResponse {
  weeks: string[];
  series: {
    aiTeachingCoverage: number[];
    correctionEfficiency: number[];
  };
}

export async function getOverviewMetrics() {
  const response = await http.get<OverviewMetric[]>("/overview");
  return response.data;
}

export async function getKpiTrend() {
  const response = await http.get<KpiTrendResponse>("/kpi-trend");
  return response.data;
}

export async function getCourseTree() {
  const response = await http.get<CourseTreeNode[]>("/courses/tree");
  return response.data;
}

export async function getQuestionBankMeta() {
  const response = await http.get<{
    total: string;
    knowledgePoints: string[];
    difficulties: Array<{ label: string; value: string }>;
  }>("/question-bank/meta");
  return response.data;
}

export async function getQuestionBankItems() {
  const response = await http.get<QuestionBankItem[]>("/question-bank/items");
  return response.data;
}
