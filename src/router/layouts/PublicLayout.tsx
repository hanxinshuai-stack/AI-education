import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { AppHeader, createLogoutItem, createStudentUserMenu } from "@/router/layouts/AppHeader";
import { adminMenuItems, publicMenuItems, studentMenuItems } from "@/router/layouts/navItems";
import { ROLE_HOME } from "@/config/auth";
import { useAuth } from "@/contexts/AuthContext";

const { Content } = Layout;

export function PublicLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems =
    user?.role === "student"
      ? studentMenuItems
      : user?.role === "admin"
        ? adminMenuItems
        : publicMenuItems;

  const brandLink =
    user?.role === "student" ? "/" : user ? ROLE_HOME[user.role] : "/";
  const userMenuItems =
    user?.role === "student"
      ? createStudentUserMenu(navigate, handleLogout)
      : user?.role === "admin"
        ? [createLogoutItem(handleLogout)]
        : undefined;

  return (
    <Layout className="min-h-screen">
      <AppHeader
        menuItems={menuItems}
        userMenuItems={userMenuItems}
        showLogin={!user}
        loginPath="/login"
        brandLink={brandLink}
      />
      <Content className="w-full">
        <Outlet />
      </Content>
    </Layout>
  );
}
