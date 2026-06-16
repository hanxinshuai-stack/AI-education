import { useEffect, useState } from "react";
import { App, Button, Card, Col, List, Modal, Progress, Row, Space, Statistic, Tag, Typography } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { getExamSummary } from "@/api/examApi";
import type { ExamSummary } from "@/types/exam";
import { BRAND_COLORS } from "@/config/brand";
import type { EChartsOption } from "echarts";
import { EchartBox } from "@/components/EchartBox";
import { PageCard } from "@/components/PageCard";

const knowledgeRadarOption: EChartsOption = {
  color: [BRAND_COLORS.primary],
  tooltip: {},
  radar: {
    indicator: [
      { name: "编程基础", max: 100 },
      { name: "数据分析", max: 100 },
      { name: "英语阅读", max: 100 },
      { name: "职业素养", max: 100 },
      { name: "团队协作", max: 100 },
      { name: "创新思维", max: 100 },
    ],
    radius: "65%",
  },
  series: [
    {
      name: "知识点掌握度",
      type: "radar",
      areaStyle: {
        color: "rgba(41, 150, 255, 0.18)",
      },
      data: [
        {
          value: [72, 58, 65, 80, 74, 68],
          name: "当前掌握度",
        },
      ],
    },
  ],
};

const skillBarOption: EChartsOption = {
  color: [BRAND_COLORS.primary, "#e67e22", BRAND_COLORS.secondary],
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: "{b}<br />掌握率：{c}%",
  },
  grid: {
    top: 24,
    left: 12,
    right: 12,
    bottom: 8,
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["高等数学", "大学英语", "专业课"],
  },
  yAxis: {
    type: "value",
    max: 100,
    axisLabel: { formatter: "{value}%" },
  },
  series: [
    {
      name: "课程掌握率",
      type: "bar",
      barWidth: 46,
      data: [
        { value: 68, itemStyle: { color: BRAND_COLORS.primary } },
        { value: 75, itemStyle: { color: "#e67e22" } },
        { value: 62, itemStyle: { color: BRAND_COLORS.secondary } },
      ],
    },
  ],
};

const weakKnowledge = [
  {
    id: "data-analysis",
    subject: "数据分析",
    title: "Pandas 数据清洗流程",
    course: "推荐课程：数据分析入门",
    practice: "针对性练习：缺失值处理、类型转换、分组聚合 12题",
    mastery: 58,
    difficulty: "中等偏难",
    planWeeks: 2,
    targetMastery: 76,
    planSteps: [
      "第 1 周：复习缺失值处理与类型转换，完成 6 道专项练习",
      "第 2 周：掌握分组聚合与数据透视，完成项目小测",
    ],
  },
  {
    id: "english",
    subject: "大学英语",
    title: "英语听力关键词定位",
    course: "推荐课程：大学英语听说强化",
    practice: "针对性练习：短对话、长对话、信息匹配 15题",
    mastery: 65,
    difficulty: "基础巩固",
    planWeeks: 3,
    targetMastery: 82,
    planSteps: [
      "第 1 周：短对话关键词速记训练，每日 20 分钟",
      "第 2 周：长对话结构拆解与笔记法练习",
      "第 3 周：信息匹配题型模拟，完成 15 题套练",
    ],
  },
  {
    id: "ecommerce",
    subject: "电子商务",
    title: "电商选品与流量转化",
    course: "推荐课程：电子商务运营实务",
    practice: "针对性练习：选品逻辑、详情页优化、转化漏斗 10题",
    mastery: 48,
    difficulty: "需重点突破",
    planWeeks: 2,
    targetMastery: 70,
    planSteps: [
      "第 1 周：选品逻辑与详情页优化案例学习",
      "第 2 周：转化漏斗分析与实操作业",
    ],
  },
] as const;

type WeakKnowledgeItem = (typeof weakKnowledge)[number];

export function AnalysisPage() {
  const [examSummary, setExamSummary] = useState<ExamSummary | null>(null);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<WeakKnowledgeItem | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const { message } = App.useApp();

  useEffect(() => {
    void getExamSummary().then(setExamSummary);
  }, []);

  const handleGeneratePlan = (item: WeakKnowledgeItem) => {
    setGeneratingId(item.id);
    message.loading({
      content: `AI 正在分析「${item.subject}」学习进度与薄弱点…`,
      key: `gen-plan-${item.id}`,
      duration: 0,
    });
    window.setTimeout(() => {
      message.destroy(`gen-plan-${item.id}`);
      setGeneratingId(null);
      setActivePlan(item);
      setPlanModalOpen(true);
      message.success(`「${item.subject}」定制化学习方案已生成（演示）`);
    }, 1200);
  };

  return (
    <Space direction="vertical" size={16} className="w-full">
      <div>
        <Typography.Title level={3} className="!mb-2">
          学生学情报告
        </Typography.Title>
        <Typography.Text type="secondary">
          系统根据学习进度、错题记录和技能掌握情况生成个性化提升建议。
        </Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card bordered={false} className="h-full shadow-sm">
            <Statistic title="课程完成率" value={68} suffix="%" valueStyle={{ color: BRAND_COLORS.primary }} />
            <Progress percent={68} strokeColor={BRAND_COLORS.primary} className="mt-3" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} className="h-full shadow-sm">
            <Statistic title="错题总数" value={42} valueStyle={{ color: "#e67e22" }} />
            <Typography.Text type="secondary">本周新增错题 8 道，已完成订正 5 道</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} className="h-full shadow-sm">
            <Typography.Text type="secondary">薄弱科目</Typography.Text>
            <div className="mt-4">
              <Tag color="#e67e22">数据分析</Tag>
              <Tag color={BRAND_COLORS.secondary}>大学英语</Tag>
              <Tag color={BRAND_COLORS.primary}>Python</Tag>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <EchartBox title="知识点掌握雷达图" option={knowledgeRadarOption} height={360} />
        </Col>
        <Col xs={24} lg={12}>
          <EchartBox title="主要课程掌握柱状图" option={skillBarOption} height={360} />
        </Col>
      </Row>

      <PageCard title="分学科考试成绩">
        <Row gutter={[16, 16]}>
          {examSummary?.scoresBySubject.map((item) => (
            <Col xs={24} sm={12} md={6} key={item.subjectId}>
              <Card bordered={false} className="bg-slate-50">
                <Typography.Text type="secondary" className="text-xs">
                  {item.subjectName}
                </Typography.Text>
                <Typography.Title level={3} className="!mb-0 !mt-2">
                  {item.score !== null ? `${item.score}分` : "待考试"}
                </Typography.Title>
                {item.examTitle && (
                  <Typography.Text type="secondary" className="block text-xs">
                    {item.examTitle}
                  </Typography.Text>
                )}
              </Card>
            </Col>
          ))}
        </Row>
        <Typography.Text type="secondary" className="mt-3 block text-xs">
          考试综合均值：{examSummary?.overallExamPercent ?? 0} 分（与首页学习评分同步）
        </Typography.Text>
      </PageCard>

      <PageCard title="个性化推荐">
        <List
          dataSource={[...weakKnowledge]}
          renderItem={(item) => (
            <List.Item
              className="!px-0"
              actions={[
                <Button
                  key="plan"
                  type="primary"
                  ghost
                  icon={<BulbOutlined />}
                  loading={generatingId === item.id}
                  onClick={() => handleGeneratePlan(item)}
                >
                  生成定制化学习方案
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Space wrap>
                    <Tag color="#e67e22">薄弱知识点</Tag>
                    <Tag>{item.subject}</Tag>
                    <Typography.Text strong>{item.title}</Typography.Text>
                  </Space>
                }
                description={
                  <Space direction="vertical" size={4}>
                    <Typography.Text>{item.course}</Typography.Text>
                    <Typography.Text type="secondary">{item.practice}</Typography.Text>
                    <Typography.Text type="secondary" className="text-xs">
                      当前掌握度 {item.mastery}% · 难度评估：{item.difficulty}
                    </Typography.Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </PageCard>

      <Modal
        title={activePlan ? `「${activePlan.subject}」定制化学习方案（演示）` : "定制化学习方案（演示）"}
        open={planModalOpen}
        onCancel={() => setPlanModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setPlanModalOpen(false)}>
            知道了
          </Button>,
        ]}
        width={560}
      >
        {activePlan && (
          <Space direction="vertical" size={16} className="w-full">
            <Typography.Paragraph className="!mb-0 !text-sm !text-[#666]">
              针对薄弱知识点「<Typography.Text strong>{activePlan.title}</Typography.Text>」，
              结合你当前 <Typography.Text strong>{activePlan.mastery}%</Typography.Text> 的掌握度与
              <Typography.Text strong> {activePlan.difficulty}</Typography.Text> 评估，AI 为本学科生成如下提升路径：
            </Typography.Paragraph>
            <Card size="small" className="bg-slate-50">
              <Typography.Text className="text-xs text-[#888]">推荐学习</Typography.Text>
              <Typography.Paragraph className="!mb-1 !mt-1 !text-sm">{activePlan.course}</Typography.Paragraph>
              <Typography.Text type="secondary" className="text-xs">
                {activePlan.practice}
              </Typography.Text>
            </Card>
            <div>
              <Typography.Text strong className="text-sm">
                预计 {activePlan.planWeeks} 周学习安排
              </Typography.Text>
              <Space direction="vertical" size={8} className="mt-3 w-full">
                {activePlan.planSteps.map((step) => (
                  <Typography.Text key={step} className="block text-sm text-[#666]">
                    · {step}
                  </Typography.Text>
                ))}
              </Space>
            </div>
            <div>
              <Typography.Text className="text-xs text-[#888]">
                完成本学科方案后，预计掌握度可提升至
              </Typography.Text>
              <Progress percent={activePlan.targetMastery} strokeColor={BRAND_COLORS.primary} className="mt-2" />
            </div>
          </Space>
        )}
      </Modal>
    </Space>
  );
}
