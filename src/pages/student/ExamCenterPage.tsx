import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Empty,
  Input,
  List,
  Modal,
  Progress,
  Segmented,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { FileDoneOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { getExamById, getStudentExams, submitExam } from "@/api/examApi";
import { BRAND_COLORS } from "@/config/brand";
import type { ExamItem, ExamQuestion, ExamSubjectId } from "@/types/exam";

type SubjectFilter = "all" | ExamSubjectId;

const subjectOptions: Array<{ label: string; value: SubjectFilter }> = [
  { label: "全部", value: "all" },
  { label: "信息技术", value: "it" },
  { label: "经管商贸", value: "business" },
  { label: "人文通识", value: "general" },
  { label: "高等数学", value: "math" },
];

export function ExamCenterPage() {
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>("all");
  const [activeExam, setActiveExam] = useState<ExamItem | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; maxScore: number; aiFeedback: string } | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const loadExams = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStudentExams(subjectFilter);
      setExams(data);
    } finally {
      setLoading(false);
    }
  }, [subjectFilter]);

  useEffect(() => {
    void loadExams();
  }, [loadExams]);

  const pendingExams = useMemo(() => exams.filter((e) => e.status === "pending"), [exams]);
  const gradedExams = useMemo(() => exams.filter((e) => e.status === "graded"), [exams]);

  const openExam = async (examId: string) => {
    const detail = await getExamById(examId);
    setActiveExam(detail);
    setAnswers({});
    setResult(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveExam(null);
    setResult(null);
    void loadExams();
  };

  const handleSubmit = async () => {
    if (!activeExam) {
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitExam(activeExam.id, { answers });
      setResult(res);
    } finally {
      setSubmitting(false);
    }
  };

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return (
    <Space direction="vertical" size={16} className="w-full">
      <div>
        <Typography.Title level={3} className="!mb-2">
          在线考试
        </Typography.Title>
        <Typography.Text type="secondary">
          按学科查看教师发布的考试，提交后系统自动评分，成绩将同步至首页学习评分。
        </Typography.Text>
      </div>

      <Segmented
        options={subjectOptions}
        value={subjectFilter}
        onChange={(value) => setSubjectFilter(value as SubjectFilter)}
      />

      <Spin spinning={loading}>
        <Typography.Title level={5} className="!mb-3 !font-medium">
          待考试
        </Typography.Title>
        {pendingExams.length === 0 ? (
          <Empty description="当前学科暂无待考试" className="mb-6" />
        ) : (
          <List
            className="mb-8"
            dataSource={pendingExams}
            renderItem={(item) => (
              <Card bordered={false} className="mb-3 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Space direction="vertical" size={4}>
                    <Space>
                      <Tag color={BRAND_COLORS.primaryLight} style={{ color: BRAND_COLORS.primary }}>
                        {item.subjectName}
                      </Tag>
                      <Typography.Text strong>{item.title}</Typography.Text>
                    </Space>
                    <Typography.Text type="secondary" className="text-sm">
                      {item.teacherName} · {item.durationMinutes} 分钟 · {item.questions.length} 题 · 截止{" "}
                      {item.dueAt}
                    </Typography.Text>
                  </Space>
                  <Button type="primary" icon={<PlayCircleOutlined />} onClick={() => void openExam(item.id)}>
                    开始考试
                  </Button>
                </div>
              </Card>
            )}
          />
        )}

        <Typography.Title level={5} className="!mb-3 !font-medium">
          已完成
        </Typography.Title>
        {gradedExams.length === 0 ? (
          <Empty description="暂无已完成考试" />
        ) : (
          <List
            dataSource={gradedExams}
            renderItem={(item) => (
              <Card bordered={false} className="mb-3 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Space direction="vertical" size={4}>
                    <Space>
                      <Tag color={BRAND_COLORS.secondary}>{item.subjectName}</Tag>
                      <Typography.Text strong>{item.title}</Typography.Text>
                    </Space>
                    <Typography.Text type="secondary" className="text-sm">
                      批改于 {item.gradedAt} · {item.aiFeedback}
                    </Typography.Text>
                  </Space>
                  <Space direction="vertical" align="end">
                    <Typography.Text className="text-2xl font-semibold" style={{ color: BRAND_COLORS.primary }}>
                      {item.score}/{item.maxScore}
                    </Typography.Text>
                    <Tag icon={<FileDoneOutlined />} color="success">
                      已批改
                    </Tag>
                  </Space>
                </div>
              </Card>
            )}
          />
        )}
      </Spin>

      <Modal
        title={result ? "评分结果" : activeExam?.title}
        open={modalOpen}
        onCancel={closeModal}
        width={720}
        footer={
          result
            ? [
                <Button key="close" type="primary" onClick={closeModal}>
                  完成
                </Button>,
              ]
            : [
                <Button key="cancel" onClick={closeModal}>
                  取消
                </Button>,
                <Button key="submit" type="primary" loading={submitting} onClick={() => void handleSubmit()}>
                  提交试卷
                </Button>,
              ]
        }
        destroyOnClose
      >
        {result ? (
          <Space direction="vertical" size={16} className="w-full py-4">
            <div className="grid place-items-center">
              <Progress
                type="circle"
                percent={Math.round((result.score / result.maxScore) * 100)}
                format={() => `${result.score}`}
                strokeColor={BRAND_COLORS.primary}
              />
              <Typography.Text type="secondary" className="mt-2">
                满分 {result.maxScore}
              </Typography.Text>
            </div>
            <Card size="small" className="bg-slate-50">
              <Typography.Text>{result.aiFeedback}</Typography.Text>
            </Card>
          </Space>
        ) : (
          activeExam && (
            <List
              dataSource={activeExam.questions}
              renderItem={(q: ExamQuestion, index) => (
                <List.Item className="flex-col items-start border-0 px-0">
                  <Typography.Text strong className="mb-2">
                    {index + 1}. [{q.type}] {q.stem}（{q.score} 分）
                  </Typography.Text>
                  <Input.TextArea
                    rows={3}
                    placeholder="请输入你的答案"
                    value={answers[q.id] ?? ""}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                  />
                </List.Item>
              )}
            />
          )
        )}
      </Modal>
    </Space>
  );
}
