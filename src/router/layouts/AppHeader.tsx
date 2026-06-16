import { Button, Dropdown, Layout, Space, Typography } from "antd";
import { Link, type NavigateFunction } from "react-router-dom";
import { HeartOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { BRAND_NAME } from "@/config/brand";
import { useAuth } from "@/contexts/AuthContext";

const { Header } = Layout;

interface AppHeaderProps {
  menuItems: MenuProps["items"];
  userMenuItems?: MenuProps["items"];
  loginPath?: string;
  showLogin?: boolean;
  brandLink?: string;
}

function HeaderNav({ menuItems }: { menuItems: MenuProps["items"] }) {
  return (
    <nav className="flex flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4">
      {menuItems?.map((item) => {
        if (!item || !("key" in item) || !item.key) return null;
        return (
          <div
            key={String(item.key)}
            className="whitespace-nowrap text-sm text-[#aab4cc] transition-colors hover:text-white [&_a]:text-inherit [&_a]:no-underline [&_a]:hover:text-white"
          >
            {item.label}
          </div>
        );
      })}
    </nav>
  );
}

export function AppHeader({
  menuItems,
  userMenuItems,
  loginPath = "/login",
  showLogin = true,
  brandLink = "/",
}: AppHeaderProps) {
  const { isAuthenticated, user } = useAuth();

  return (
    <Header className="sticky top-0 z-20 flex h-14 items-center bg-[#1a1a2e] px-6 lg:px-10">
      <div className="shrink-0">
        <Link to={brandLink} className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-[#2996FF] to-[#6EE7A4] text-sm font-semibold text-white">
            源
          </div>
          <Typography.Text className="bg-gradient-to-r from-[#2996FF] to-[#6EE7A4] bg-clip-text text-[15px] font-medium leading-5 text-transparent">
            {BRAND_NAME}
          </Typography.Text>
        </Link>
      </div>
      <HeaderNav menuItems={menuItems} />
      <div className="shrink-0">
        <Space>
          {isAuthenticated && user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button ghost icon={<UserOutlined />}>
                {user.username}
              </Button>
            </Dropdown>
          ) : showLogin ? (
            <Link to={loginPath}>
              <Button ghost>登录</Button>
            </Link>
          ) : null}
        </Space>
      </div>
    </Header>
  );
}

export function createLogoutItem(onLogout: () => void): NonNullable<MenuProps["items"]>[number] {
  return {
    key: "logout",
    label: "退出登录",
    icon: <LogoutOutlined />,
    danger: true,
    onClick: onLogout,
  };
}

export function createStudentUserMenu(navigate: NavigateFunction, onLogout: () => void) {
  return [
    {
      key: "profile",
      label: "个人中心",
      icon: <UserOutlined />,
      onClick: () => navigate("/student/profile"),
    },
    {
      key: "favorites",
      label: "课程收藏",
      icon: <HeartOutlined />,
      onClick: () => navigate("/student/favorites"),
    },
    createLogoutItem(onLogout),
  ];
}
