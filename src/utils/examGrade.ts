import type { ExamItem, ExamQuestion, ExamScoreBySubject, ExamSubjectId, ExamSummary } from "@/types/exam";

const SUBJECT_META: Record<ExamSubjectId, { name: string; color: string }> = {
  it: { name: "信息技术", color: "#2996FF" },
  business: { name: "经管商贸", color: "#2980b9" },
  general: { name: "人文通识", color: "#6EE7A4" },
  math: { name: "高等数学", color: "#e67e22" },
};

function normalize(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, "");
}

function scoreQuestion(question: ExamQuestion, answer: string): number {
  const student = normalize(answer);
  const reference = normalize(question.referenceAnswer);
  if (!student) {
    return 0;
  }
  if (student === reference || reference.includes(student) || student.includes(reference)) {
    return question.score;
  }
  const keywords = question.referenceAnswer.split(/[，,、\s]+/).filter((k) => k.length >= 2);
  const hitCount = keywords.filter((k) => student.includes(normalize(k))).length;
  if (hitCount >= Math.max(1, Math.ceil(keywords.length * 0.5))) {
    return Math.round(question.score * 0.85);
  }
  if (question.type === "简答" || question.type === "案例分析") {
    return Math.round(question.score * 0.5);
  }
  return Math.round(question.score * 0.3);
}

export function gradeExamAnswers(exam: ExamItem, answers: Record<string, string>) {
  let total = 0;
  for (const question of exam.questions) {
    total += scoreQuestion(question, answers[question.id] ?? "");
  }
  const percent = exam.maxScore > 0 ? Math.round((total / exam.maxScore) * 100) : 0;
  const aiFeedback =
    percent >= 85
      ? "教学评语：表现优秀，核心知识点掌握扎实，可挑战更高难度综合题。"
      : percent >= 60
        ? "教学评语：达到及格线，建议针对错题知识点回看课程章节并完成配套练习。"
        : "教学评语：需加强基础复习，建议先完成随堂练习后再参加补考。";
  return { score: total, maxScore: exam.maxScore, aiFeedback, percent };
}

export function buildExamSummary(exams: ExamItem[]): ExamSummary {
  const pending = exams.filter((e) => e.status === "pending");
  const pendingExams = pending.map((exam) => ({
    id: exam.id,
    title: exam.title,
    subjectName: exam.subjectName,
    detail: `${exam.durationMinutes}分钟 · ${exam.questions.length}题 · 截止 ${exam.dueAt}`,
    statusLabel: "待参加",
    color: SUBJECT_META[exam.subjectId].color,
  }));

  const subjectIds: ExamSubjectId[] = ["it", "business", "general", "math"];
  const scoresBySubject: ExamScoreBySubject[] = subjectIds.map((subjectId) => {
    const graded = exams
      .filter((e) => e.subjectId === subjectId && e.status === "graded" && e.score !== undefined)
      .sort((a, b) => (b.gradedAt ?? "").localeCompare(a.gradedAt ?? ""));
    const latest = graded[0];
    return {
      subjectId,
      subjectName: SUBJECT_META[subjectId].name,
      score: latest ? Math.round((latest.score! / latest.maxScore) * 100) : null,
      examTitle: latest?.title,
    };
  });

  const gradedPercents = exams
    .filter((e) => e.status === "graded" && e.score !== undefined)
    .map((e) => Math.round((e.score! / e.maxScore) * 100));
  const overallExamPercent =
    gradedPercents.length > 0
      ? Math.round(gradedPercents.reduce((a, b) => a + b, 0) / gradedPercents.length)
      : 0;

  return {
    pendingCount: pending.length,
    pendingExams,
    scoresBySubject,
    overallExamPercent,
  };
}

export function mapKnowledgeToSubjectId(knowledgePoint: string): ExamSubjectId {
  if (/python|程序|数据|web|前端/i.test(knowledgePoint)) {
    return "it";
  }
  if (/电商|营销|商务|经济/i.test(knowledgePoint)) {
    return "business";
  }
  if (/数学|高数/i.test(knowledgePoint)) {
    return "math";
  }
  if (/英语|心理|通识/i.test(knowledgePoint)) {
    return "general";
  }
  return "general";
}
