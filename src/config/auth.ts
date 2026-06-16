import type { UserRole } from "@/types/auth";

export const AUTH_STORAGE_KEY = "auth_user";

export const ROLE_HOME: Record<UserRole, string> = {
  student: "/",
  admin: "/admin/dashboard",
};

export const LOGIN_PATH: Record<UserRole, string> = {
  student: "/login",
  admin: "/login?role=admin",
};
