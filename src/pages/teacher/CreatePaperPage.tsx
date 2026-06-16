import { useEffect, useMemo, useState } from "react";
import {
  App,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { ThunderboltOutlined } from "@ant-design/icons";
import { publishAssignment } from "@/api/assignmentApi";
import { publishExam } from "@/api/examApi";
import { BRAND_COLORS } from "@/config/brand";
import { PageCard } from "@/components/PageCard";
import { getQuestionBankItems, getQuestionBankMeta } from "@/api/platformApi";
import type { QuestionBankItem, QuestionDifficulty, QuestionType } from "@/api/mockData";
import { mapKnowledgeToSubjectId } from "@/utils/examGrade";

const questionTypeLabels: Record<QuestionType, string> = {
  choice: "选择",
  judge: "判断",
  shortAnswer: "简答",
  caseAnalysis: "案例分析",
};

const difficultyLabels: Record<QuestionDifficulty, string> = {
  easy: "基础",
  medium: "进阶",
  hard: "综合",
};

interface PaperFormValues {
  knowledgePoint?: string;
  difficulty?: QuestionDifficulty;
}

export function CreatePaperPage() {
  const { message } = App.useApp();
  const [form] = Form.useForm<PaperFormValues>();
  const [questionBankTotal, setQuestionBankTotal] = useState("5000+");
  const [knowledgePoints, setKnowledgePoints] = useState<string[]>([]);
  const [difficultyOptions, setDifficultyOptions] = useState<Array<{ label: string; value: string }>>([]);
  const [questionBank, setQuestionBank] = useState<QuestionBankItem[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionBankItem[]>([]);
  const [activeType, setActiveType] = useState<QuestionType>("choice");

  useEffect(() => {
    void getQuestionBankMeta().then((meta) => {
      setQuestionBankTotal(meta.total);
      setKnowledgePoints(meta.knowledgePoints);
      setDifficultyOptions(meta.difficulties);
    });
    void getQuestionBankItems().then(setQuestionBank);
  }, []);

  const currentQuestions = useMemo(
    () => generatedQuestions.filter((item) => item.type === activeType),
    [activeType, generatedQuestions]
  );

  const updateQuestion = (id: string, field: keyof QuestionBankItem, value: string | number | null) => {
    setGeneratedQuestions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value ?? "",
            }
          : item
      )
    );
  };

  const handleGenerate = () => {
    const values = form.getFieldsValue();
    const filtered = questionBank.filter((item) => {
      const matchKnowledge = values.knowledgePoint ? item.knowledgePoint === values.knowledgePoint : true;
      const matchDifficulty = values.difficulty ? item.difficulty === values.difficulty : true;
      return matchKnowledge && matchDifficulty;
    });
    const sourceQuestions = filtered.length > 0 ? filtered : questionBank;

    setGeneratedQuestions(
      sourceQuestions.map((item, index) => ({
        ...item,
        id: `paper-${Date.now()}-${index}`,
      }))
    );
    setActiveType("choice");
    message.success(`已从${questionBankTotal}题库中生成试卷草稿`);
  };

  const handleSavePaper = async () => {
    if (generatedQuestions.length === 0) {
      message.warning("请先生成试卷");
      return;
    }

    const values = form.getFieldsValue();
    const knowledgePoint = values.knowledgePoint ?? "综合课程";
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    try {
      await publishAssignment({
        title: `生成作业 · ${knowledgePoint}`,
        courseName: knowledgePoint,
        teacherName: "王老师",
        dueAt: dueDate.toISOString().slice(0, 10),
        questions: generatedQuestions.map((item) => ({
          stem: item.stem,
          type: questionTypeLabels[item.type],
          score: item.score,
        })),
      });
      message.success(`已布置给学生，共${generatedQuestions.length}道题，可在学生端课后作业查看`);
    } catch {
      message.error("布置失败，请稍后重试");
    }
  };

  const handlePublishExam = async () => {
    if (generatedQuestions.length === 0) {
      message.warning("请先生成试卷");
      return;
    }

    const values = form.getFieldsValue();
    const knowledgePoint = values.knowledgePoint ?? "综合课程";
    const subjectId = mapKnowledgeToSubjectId(knowledgePoint);
    const subjectNames: Record<string, string> = {
      it: "信息技术",
      business: "经管商贸",
      general: "人文通识",
      math: "高等数学",
    };
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    try {
      await publishExam({
        title: `生成考试 · ${knowledgePoint}`,
        subjectId,
        subjectName: subjectNames[subjectId],
        courseName: knowledgePoint,
        teacherName: "王老师",
        durationMinutes: 90,
        dueAt: dueDate.toISOString().slice(0, 10),
        questions: generatedQuestions.map((item, index) => ({
          id: `q-${index + 1}`,
          stem: item.stem,
          type: questionTypeLabels[item.type],
          score: item.score,
          referenceAnswer: item.answer,
        })),
      });
      message.success(`已发布至学生端在线考试，共${generatedQuestions.length}道题`);
    } catch {
      message.error("发布考试失败，请稍后重试");
    }
  };

  const columns: ColumnsType<QuestionBankItem> = [
    {
      title: "知识点",
      dataIndex: "knowledgePoint",
      width: 140,
      render: (value: string) => <Tag color={BRAND_COLORS.primary}>{value}</Tag>,
    },
    {
      title: "难度",
      dataIndex: "difficulty",
      width: 90,
      render: (value: QuestionDifficulty) => {
        const color = value === "hard" ? "#e67e22" : value === "medium" ? "#2980b9" : "#27ae60";
        return <Tag color={color}>{difficultyLabels[value]}</Tag>;
      },
    },
    {
      title: "题干",
      dataIndex: "stem",
      render: (_value, record) => (
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
          value={record.stem}
          onChange={(event) => updateQuestion(record.id, "stem", event.target.value)}
        />
      ),
    },
    {
      title: "参考答案",
      dataIndex: "answer",
      render: (_value, record) => (
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
          value={record.answer}
          onChange={(event) => updateQuestion(record.id, "answer", event.target.value)}
        />
      ),
    },
    {
      title: "分值",
      dataIndex: "score",
      width: 100,
      render: (_value, record) => (
        <InputNumber min={1} max={100} value={record.score} onChange={(value) => updateQuestion(record.id, "score", value)} />
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} className="w-full">
      <div>
        <Typography.Title level={3} className="!mb-2">
          课程出题
        </Typography.Title>
        <Typography.Text type="secondary">按知识点与难度自动生成试卷，支持教师二次编辑与保存。</Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={18}>
          <PageCard title="出题条件">
            <Form form={form} layout="inline" className="gap-y-3">
              <Form.Item name="knowledgePoint" label="知识点">
                <Select
                  allowClear
                  placeholder="请选择知识点"
                  className="w-56"
                  options={knowledgePoints.map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>
              <Form.Item name="difficulty" label="难度等级">
                <Select allowClear placeholder="请选择难度" className="w-40" options={difficultyOptions} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon={<ThunderboltOutlined />} onClick={handleGenerate}>
                  一键生成试卷
                </Button>
              </Form.Item>
            </Form>
          </PageCard>
        </Col>
        <Col xs={24} lg={6}>
          <Card bordered={false} className="h-full shadow-sm">
            <Statistic title="Mock题库总量" value={questionBankTotal} valueStyle={{ color: BRAND_COLORS.primary }} />
            <Typography.Text type="secondary">覆盖选择、判断、简答、案例分析</Typography.Text>
          </Card>
        </Col>
      </Row>

      <PageCard
        title="生成试题预览"
        extra={
          <Space>
            <Tag color="#27ae60">已生成 {generatedQuestions.length} 题</Tag>
            <Button onClick={handleSavePaper}>布置作业</Button>
            <Button type="primary" onClick={() => void handlePublishExam()}>
              发布为考试
            </Button>
          </Space>
        }
      >
        <Tabs
          activeKey={activeType}
          onChange={(key) => setActiveType(key as QuestionType)}
          items={(Object.keys(questionTypeLabels) as QuestionType[]).map((type) => ({
            key: type,
            label: `${questionTypeLabels[type]}题`,
            children: (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={currentQuestions}
                pagination={false}
                locale={{ emptyText: "暂无试题，请点击一键生成试卷" }}
              />
            ),
          }))}
        />
      </PageCard>
    </Space>
  );
}
