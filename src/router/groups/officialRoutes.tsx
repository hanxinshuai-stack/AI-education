import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { OfficialHomePage } from "@/pages/official/OfficialHomePage";
import { LoginPage } from "@/pages/official/LoginPage";

export const officialRoutes: RouteObject[] = [
  {
    index: true,
    element: <OfficialHomePage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "admin/login",
    element: <Navigate to="/login?role=admin" replace />,
  },
];
