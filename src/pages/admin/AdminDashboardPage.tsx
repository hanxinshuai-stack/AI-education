import { Alert, Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { PageCard } from "@/components/PageCard";

export function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <Space direction="vertical" className="w-full" size={16}>
      <PageCard title="管理员端">
        <Typography.Paragraph className="!mb-3">
          这里放院校配置、权限管理、资源中心（1000+课程 / 5000+题库）与运营报表。
        </Typography.Paragraph>
        <Alert
          type="warning"
          showIcon
          message="合作院校持续拓展中，已接入 200+ 所"
          description="可通过院校课程共建与在线授课能力快速扩大多学科教学供给。"
        />
        <Button type="primary" className="mt-3" onClick={() => navigate("/admin/dashboard")}>
          查看全局数据看板
        </Button>
      </PageCard>
    </Space>
  );
}
