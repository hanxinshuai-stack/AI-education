import type { RouteObject } from "react-router-dom";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminGlobalDashboardPage } from "@/pages/admin/AdminGlobalDashboardPage";
import { AdminRoute } from "@/router/guards/AdminRoute";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: (
      <AdminRoute>
        <AdminDashboardPage />
      </AdminRoute>
    ),
  },
  {
    path: "admin/dashboard",
    element: (
      <AdminRoute>
        <AdminGlobalDashboardPage />
      </AdminRoute>
    ),
  },
];
