import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_PATH } from "@/config/auth";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  loginPath?: string;
}

export function AuthGuard({ children, loginPath }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const fallbackLogin =
      loginPath ?? (location.pathname.startsWith("/admin") ? LOGIN_PATH.admin : LOGIN_PATH.student);
    return <Navigate to={fallbackLogin} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
