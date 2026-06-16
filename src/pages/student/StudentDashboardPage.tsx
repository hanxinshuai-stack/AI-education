import { Button, Progress, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { BRAND_COLORS } from "@/config/brand";
import { PageCard } from "@/components/PageCard";

export function StudentDashboardPage() {
  const navigate = useNavigate();

  return (
    <Space direction="vertical" className="w-full" size={16}>
      <PageCard title="学生端">
        <Typography.Paragraph className="!mb-1">
          这里放学习任务、错题反馈、能力成长看板。
        </Typography.Paragraph>
        <Typography.Text type="secondary">示例：Python 程序设计完成度</Typography.Text>
        <Progress percent={42} strokeColor={BRAND_COLORS.primary} />
        <Space wrap className="mt-3">
          <Button type="primary" onClick={() => navigate("/student/digitalClass")}>
            进入视频课程中心
          </Button>
          <Button onClick={() => navigate("/student/homework")}>查看课后作业</Button>
          <Button onClick={() => navigate("/student/exams")}>进入在线考试</Button>
          <Button onClick={() => navigate("/student/analysis")}>查看学情报告</Button>
        </Space>
      </PageCard>
    </Space>
  );
}
