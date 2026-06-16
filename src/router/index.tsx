import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { officialRoutes } from "@/router/groups/officialRoutes";
import { studentRoutes } from "@/router/groups/studentRoutes";
import { teacherRoutes } from "@/router/groups/teacherRoutes";
import { adminRoutes } from "@/router/groups/adminRoutes";
import { PublicLayout } from "@/router/layouts/PublicLayout";
import { StudentLayout } from "@/router/layouts/StudentLayout";
import { AdminLayout } from "@/router/layouts/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [...officialRoutes, ...teacherRoutes],
  },
  {
    path: "/",
    element: <StudentLayout />,
    errorElement: <NotFoundPage />,
    children: studentRoutes,
  },
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <NotFoundPage />,
    children: adminRoutes,
  },
]);
