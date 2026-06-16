export type UserRole = "student" | "admin";

export interface AuthUser {
  username: string;
  role: UserRole;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
