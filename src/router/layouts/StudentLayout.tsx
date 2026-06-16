import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { AppHeader, createStudentUserMenu } from "@/router/layouts/AppHeader";
import { studentMenuItems } from "@/router/layouts/navItems";
import { useAuth } from "@/contexts/AuthContext";

const { Content } = Layout;

export function StudentLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout className="min-h-screen">
      <AppHeader
        menuItems={studentMenuItems}
        userMenuItems={createStudentUserMenu(navigate, handleLogout)}
        showLogin={false}
        brandLink="/"
      />
      <Content className="w-full">
        <Outlet />
      </Content>
    </Layout>
  );
}
