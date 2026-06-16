import { AuthGuard } from "@/router/guards/AuthGuard";
import { RoleGuard } from "@/router/guards/RoleGuard";

interface StudentRouteProps {
  children: React.ReactNode;
}

export function StudentRoute({ children }: StudentRouteProps) {
  return (
    <AuthGuard>
      <RoleGuard allowedRoles={["student"]}>{children}</RoleGuard>
    </AuthGuard>
  );
}
