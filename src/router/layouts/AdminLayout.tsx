import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { AppHeader, createLogoutItem } from "@/router/layouts/AppHeader";
import { adminMenuItems } from "@/router/layouts/navItems";
import { useAuth } from "@/contexts/AuthContext";

const { Content } = Layout;

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userMenuItems = [createLogoutItem(handleLogout)];

  return (
    <Layout className="min-h-screen">
      <AppHeader
        menuItems={adminMenuItems}
        userMenuItems={userMenuItems}
        showLogin={false}
        brandLink="/admin/dashboard"
      />
      <Content className="w-full">
        <Outlet />
      </Content>
    </Layout>
  );
}
