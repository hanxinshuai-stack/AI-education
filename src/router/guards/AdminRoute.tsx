import { AuthGuard } from "@/router/guards/AuthGuard";
import { RoleGuard } from "@/router/guards/RoleGuard";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  return (
    <AuthGuard loginPath="/login?role=admin">
      <RoleGuard allowedRoles={["admin"]}>{children}</RoleGuard>
    </AuthGuard>
  );
}
