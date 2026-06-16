import type { RouteObject } from "react-router-dom";
import { CreatePaperPage } from "@/pages/teacher/CreatePaperPage";
import { AuthGuard } from "@/router/guards/AuthGuard";
import { Navigate } from "react-router-dom";

export const teacherRoutes: RouteObject[] = [
  {
    path: "course/createPaper",
    element: (
      <AuthGuard>
        <CreatePaperPage />
      </AuthGuard>
    ),
  },
  {
    path: "teacher/createPaper",
    element: <Navigate to="/course/createPaper" replace />,
  },
];
