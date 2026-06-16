import { Card, Space, Typography } from "antd";
import { useAuth } from "@/contexts/AuthContext";

export function ProfilePage() {
  const { user } = useAuth();
  const username = user?.username ?? "用户";

  return (
    <Space direction="vertical" size={16} className="w-full">
      <div>
        <Typography.Title level={3} className="!mb-2">
          个人中心
        </Typography.Title>
        <Typography.Text type="secondary">查看和管理你的个人信息</Typography.Text>
      </div>

      <Card title="账号信息" bordered={false} className="shadow-sm">
        <Typography.Text>用户名：{username}</Typography.Text>
        <br />
        <Typography.Text type="secondary" className="mt-2 block text-xs">
          更多个人信息功能敬请期待...
        </Typography.Text>
      </Card>
    </Space>
  );
}
