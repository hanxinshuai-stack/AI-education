import axios, { type AxiosAdapter } from "axios";

import {

  buildMockDigitalAnswer,

  getMockDigitalLessonMeta,

  mockCourseTreeData,

  mockDigitalPresenters,

  mockDigitalReplayList,

  mockKpiTrendData,

  mockOverviewData,

  mockQuestionBankData,

  mockQuestionBankMeta,

  mockStudentAssignments,

  mockStudentExams,

} from "@/api/mockData";

import type { AssignmentItem, PublishAssignmentPayload } from "@/types/assignment";

import type { DigitalAskRequest } from "@/types/digitalClass";

import type { ExamItem, PublishExamPayload, SubmitExamPayload } from "@/types/exam";

import { buildExamSummary, gradeExamAnswers } from "@/utils/examGrade";



const assignmentStore: AssignmentItem[] = [...mockStudentAssignments];

const examStore: ExamItem[] = mockStudentExams.map((exam) => ({

  ...exam,

  questions: exam.questions.map((q) => ({ ...q })),

}));



const mockAdapter: AxiosAdapter = async (config) => {

  const url = config.url ?? "";

  const method = (config.method ?? "get").toLowerCase();



  if (method === "get" && url === "/digital-class/presenters") {

    return ok(config, mockDigitalPresenters);

  }



  if (method === "get" && url === "/digital-class/replays") {

    return ok(config, mockDigitalReplayList);

  }



  if (method === "get" && url === "/digital-class/lesson-meta") {

    const params = config.params as { courseKey?: string; courseTitle?: string };

    const courseKey = params?.courseKey ?? "python-intro";

    const courseTitle = params?.courseTitle ?? "Python 程序设计";

    return ok(config, getMockDigitalLessonMeta(courseKey, courseTitle));

  }



  if (method === "post" && url === "/digital-class/ask") {

    const payload =

      typeof config.data === "string"

        ? (JSON.parse(config.data) as DigitalAskRequest)

        : (config.data as DigitalAskRequest);

    return ok(config, buildMockDigitalAnswer(payload));

  }



  if (method === "get" && url === "/assignments") {

    return ok(config, [...assignmentStore]);

  }



  if (method === "post" && url === "/assignments") {

    const payload =

      typeof config.data === "string"

        ? (JSON.parse(config.data) as PublishAssignmentPayload)

        : (config.data as PublishAssignmentPayload);

    const today = new Date().toISOString().slice(0, 10);

    const item: AssignmentItem = {

      id: `hw-${Date.now()}`,

      title: payload.title,

      courseName: payload.courseName,

      teacherName: payload.teacherName,

      assignedAt: today,

      dueAt: payload.dueAt,

      status: "pending",

      questionCount: payload.questions.length,

      questions: payload.questions,

    };

    assignmentStore.unshift(item);

    return ok(config, item);

  }



  if (method === "get" && url === "/exam-summary") {

    return ok(config, buildExamSummary(examStore));

  }



  if (method === "get" && url === "/exams") {

    const params = config.params as { subjectId?: string };

    const list =

      params?.subjectId && params.subjectId !== "all"

        ? examStore.filter((e) => e.subjectId === params.subjectId)

        : [...examStore];

    return ok(config, list.map(sanitizeExamForClient));

  }



  const examDetailMatch = url.match(/^\/exams\/([^/]+)$/);

  if (method === "get" && examDetailMatch) {

    const exam = examStore.find((e) => e.id === examDetailMatch[1]);

    if (!exam) {

      return notFound(config);

    }

    return ok(config, sanitizeExamForClient(exam));

  }



  if (method === "post" && url === "/exams") {

    const payload =

      typeof config.data === "string"

        ? (JSON.parse(config.data) as PublishExamPayload)

        : (config.data as PublishExamPayload);

    const maxScore = payload.questions.reduce((sum, q) => sum + q.score, 0);

    const item: ExamItem = {

      id: `exam-${Date.now()}`,

      title: payload.title,

      subjectId: payload.subjectId,

      subjectName: payload.subjectName,

      courseName: payload.courseName,

      teacherName: payload.teacherName,

      durationMinutes: payload.durationMinutes,

      dueAt: payload.dueAt,

      status: "pending",

      maxScore: maxScore || 100,

      questions: payload.questions.map((q, i) => ({

        id: q.id ?? `q-${i + 1}`,

        stem: q.stem,

        type: q.type,

        score: q.score,

        referenceAnswer: q.referenceAnswer,

      })),

    };

    examStore.unshift(item);

    return ok(config, sanitizeExamForClient(item));

  }



  const examSubmitMatch = url.match(/^\/exams\/([^/]+)\/submit$/);

  if (method === "post" && examSubmitMatch) {

    const exam = examStore.find((e) => e.id === examSubmitMatch[1]);

    if (!exam) {

      return notFound(config);

    }

    const payload =

      typeof config.data === "string"

        ? (JSON.parse(config.data) as SubmitExamPayload)

        : (config.data as SubmitExamPayload);

    const result = gradeExamAnswers(exam, payload.answers);

    exam.status = "graded";

    exam.score = result.score;

    exam.studentAnswers = payload.answers;

    exam.gradedAt = new Date().toISOString().slice(0, 10);

    exam.aiFeedback = result.aiFeedback;

    return ok(config, {

      score: result.score,

      maxScore: result.maxScore,

      aiFeedback: result.aiFeedback,

    });

  }



  const routeMap: Record<string, unknown> = {

    "/overview": mockOverviewData,

    "/kpi-trend": mockKpiTrendData,

    "/courses/tree": mockCourseTreeData,

    "/question-bank/meta": mockQuestionBankMeta,

    "/question-bank/items": mockQuestionBankData,

  };

  const data = routeMap[url] ?? { message: "not found" };

  const status = routeMap[url] ? 200 : 404;

  return {

    data,

    status,

    statusText: status === 200 ? "OK" : "Not Found",

    headers: {},

    config,

  };

};



function sanitizeExamForClient(exam: ExamItem): ExamItem {

  return {

    ...exam,

    questions: exam.questions.map(({ id, stem, type, score }) => ({

      id,

      stem,

      type,

      score,

      referenceAnswer: "",

    })),

  };

}



function ok(config: Parameters<AxiosAdapter>[0], data: unknown) {

  return {

    data,

    status: 200,

    statusText: "OK",

    headers: {},

    config,

  };

}



function notFound(config: Parameters<AxiosAdapter>[0]) {

  return {

    data: { message: "not found" },

    status: 404,

    statusText: "Not Found",

    headers: {},

    config,

  };

}



export const http = axios.create({

  baseURL: "/api",

  timeout: 8000,

  adapter: mockAdapter,

});


