import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Drawer,
  List,
  Segmented,
  Space,
  Tag,
  Typography,
} from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { getStudentAssignments } from "@/api/assignmentApi";
import { BRAND_COLORS } from "@/config/brand";
import type { AssignmentItem, AssignmentStatus } from "@/types/assignment";

const statusLabels: Record<AssignmentStatus, string> = {
  pending: "待提交",
  submitted: "已提交",
  graded: "已批改",
};

const statusColors: Record<AssignmentStatus, string> = {
  pending: BRAND_COLORS.primary,
  submitted: "#2980b9",
  graded: BRAND_COLORS.secondary,
};

type FilterKey = "all" | AssignmentStatus;

export function HomeworkPage() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [detailItem, setDetailItem] = useState<AssignmentItem | null>(null);

  const loadAssignments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStudentAssignments();
      setAssignments(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAssignments();
  }, [loadAssignments]);

  const filteredList = useMemo(() => {
    if (filter === "all") {
      return assignments;
    }
    return assignments.filter((item) => item.status === filter);
  }, [assignments, filter]);

  return (
    <Space direction="vertical" size={16} className="w-full">
      <div>
        <Typography.Title level={3} className="!mb-2">
          课后作业
        </Typography.Title>
        <Typography.Text type="secondary">
          查看任课教师布置的作业，支持按状态筛选与题目预览（演示阶段为 mock 数据，教师保存试卷后会同步出现在此列表）。
        </Typography.Text>
      </div>

      <Segmented
        value={filter}
        onChange={(value) => setFilter(value as FilterKey)}
        options={[
          { label: "全部", value: "all" },
          { label: "待提交", value: "pending" },
          { label: "已提交", value: "submitted" },
          { label: "已批改", value: "graded" },
        ]}
      />

      <List
        loading={loading}
        dataSource={filteredList}
        locale={{ emptyText: "暂无作业" }}
        renderItem={(item) => (
          <Card bordered={false} className="mb-3 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <Space direction="vertical" size={4}>
                <Typography.Text strong className="text-base">
                  {item.title}
                </Typography.Text>
                <Typography.Text type="secondary" className="text-sm">
                  {item.courseName} · 布置教师：{item.teacherName}
                </Typography.Text>
                <Typography.Text type="secondary" className="text-xs">
                  布置于 {item.assignedAt} · 截止 {item.dueAt} · 共 {item.questionCount} 题
                </Typography.Text>
              </Space>
              <Space>
                <Tag color={statusColors[item.status]}>{statusLabels[item.status]}</Tag>
                <Button type="primary" ghost icon={<FileTextOutlined />} onClick={() => setDetailItem(item)}>
                  查看题目
                </Button>
              </Space>
            </div>
          </Card>
        )}
      />

      <Drawer
        title={detailItem?.title ?? "作业详情"}
        open={!!detailItem}
        onClose={() => setDetailItem(null)}
        width={520}
        extra={
          <Button type="primary" disabled>
            开始作答（即将开放）
          </Button>
        }
      >
        {detailItem && (
          <Space direction="vertical" size={12} className="w-full">
            <Typography.Text type="secondary">
              {detailItem.courseName} · {detailItem.teacherName} · 截止 {detailItem.dueAt}
            </Typography.Text>
            <List
              dataSource={detailItem.questions}
              renderItem={(q, index) => (
                <List.Item className="flex-col items-start border-0 px-0">
                  <Typography.Text strong>
                    {index + 1}. [{q.type}] {q.stem}
                  </Typography.Text>
                  <Typography.Text type="secondary" className="text-xs">
                    分值：{q.score} 分
                  </Typography.Text>
                </List.Item>
              )}
            />
          </Space>
        )}
      </Drawer>
    </Space>
  );
}
