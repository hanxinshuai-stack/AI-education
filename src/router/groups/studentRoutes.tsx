import type { RouteObject } from "react-router-dom";
import { AnalysisPage } from "@/pages/student/AnalysisPage";
import { DigitalClassPage } from "@/pages/student/DigitalClassPage";
import { ExamCenterPage } from "@/pages/student/ExamCenterPage";
import { HomeworkPage } from "@/pages/student/HomeworkPage";
import { StudentDashboardPage } from "@/pages/student/StudentDashboardPage";
import { LessonPage } from "@/pages/student/LessonPage";
import { FavoritesPage } from "@/pages/student/FavoritesPage";
import { ProfilePage } from "@/pages/student/ProfilePage";
import { StudentRoute } from "@/router/guards/StudentRoute";

export const studentRoutes: RouteObject[] = [
  {
    path: "student",
    element: (
      <StudentRoute>
        <StudentDashboardPage />
      </StudentRoute>
    ),
  },
  {
    path: "student/digitalClass",
    element: (
      <StudentRoute>
        <DigitalClassPage />
      </StudentRoute>
    ),
  },
  {
    path: "student/lesson/:courseKey",
    element: (
      <StudentRoute>
        <LessonPage />
      </StudentRoute>
    ),
  },
  {
    path: "student/homework",
    element: (
      <StudentRoute>
        <HomeworkPage />
      </StudentRoute>
    ),
  },
  {
    path: "student/exams",
    element: (
      <StudentRoute>
        <ExamCenterPage />
      </StudentRoute>
    ),
  },
  {
    path: "student/analysis",
    element: (
      <StudentRoute>
        <AnalysisPage />
      </StudentRoute>
    ),
  },
  {
    path: "student/profile",
    element: (
      <StudentRoute>
        <ProfilePage />
      </StudentRoute>
    ),
  },
  {
    path: "student/favorites",
    element: (
      <StudentRoute>
        <FavoritesPage />
      </StudentRoute>
    ),
  },
];
