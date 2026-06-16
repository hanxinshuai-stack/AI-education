import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { App } from "antd";
import { ROLE_HOME } from "@/config/auth";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/auth";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user } = useAuth();
  const { message } = App.useApp();
  const warnedRef = useRef(false);

  useEffect(() => {
    if (!user || allowedRoles.includes(user.role) || warnedRef.current) return;
    warnedRef.current = true;
    message.warning("无权访问该页面");
  }, [user, allowedRoles, message]);

  if (!user || !allowedRoles.includes(user.role)) {
    const redirectTo = user ? ROLE_HOME[user.role] : "/login";
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
