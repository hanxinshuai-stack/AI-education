import type { AuthUser, LoginCredentials, UserRole } from "@/types/auth";

function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginDemo(
  credentials: LoginCredentials,
  role: UserRole
): Promise<AuthUser> {
  await delay();
  if (!credentials.username?.trim() || !credentials.password) {
    throw new Error("请输入用户名和密码");
  }
  return { username: credentials.username.trim(), role };
}
