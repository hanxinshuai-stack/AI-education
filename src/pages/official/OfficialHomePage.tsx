import { useEffect, useState } from "react";
import { Button, Card, Col, Progress, Row, Space, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getExamSummary } from "@/api/examApi";
import type { ExamSummary } from "@/types/exam";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  PlayCircleFilled,
  ReadOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { BRAND_COLORS, BRAND_NAME } from "@/config/brand";
import { DEMO_LESSON, HERO_STATS, HOME_COURSES, SUBJECT_TAGS } from "@/pages/official/homeContent";

const features = [
  {
    name: "视频课程讲解",
    desc: "专家经验数字化沉淀，支持课程讲解、实操演示与断点续学。",
    count: "1000+ 标准课程",
    icon: <PlayCircleFilled />,
    colorClass: "bg-[#E8F3FF] text-[#2996FF]",
    path: "/student/digitalClass",
  },
  {
    name: "课后作业",
    desc: "章节配套练习，自动批改并解释错因，帮助学生及时补弱。",
    count: "5000+ 练习题库",
    icon: <ReadOutlined />,
    colorClass: "bg-[#e6eefa] text-[#2980b9]",
    path: "/student/homework",
  },
  {
    name: "在线考试",
    desc: "支持模拟测验、结业考核和阶段评估，覆盖通识与技能训练。",
    count: "120+ 模拟试卷",
    icon: <CalendarOutlined />,
    colorClass: "bg-[#EAFBF2] text-[#6EE7A4]",
    path: "/student/exams",
  },
  {
    name: "学习评分",
    desc: "生成多维学习报告，追踪课程、作业、考试和互动参与情况。",
    count: "实时数据分析",
    icon: <CheckCircleOutlined />,
    colorClass: "bg-[#fef3e2] text-[#e67e22]",
    path: "/student/analysis",
  },
];

export function OfficialHomePage() {
  const navigate = useNavigate();
  const [examSummary, setExamSummary] = useState<ExamSummary | null>(null);

  useEffect(() => {
    void getExamSummary().then(setExamSummary);
  }, []);

  const scoreRows: Array<{ label: string; percent?: number; pendingText?: string; color: string }> = [
    { label: "课程完成", percent: 72, color: "#2996FF" },
    { label: "作业得分", percent: 88, color: "#2980b9" },
    ...(examSummary?.scoresBySubject.map((item) => ({
      label: `${item.subjectName}考试`,
      percent: item.score ?? undefined,
      pendingText: item.score === null ? "待考试" : undefined,
      color: item.score !== null ? BRAND_COLORS.secondary : "#ccc",
    })) ?? []),
    { label: "互动参与", percent: 65, color: "#f39c12" },
  ];

  return (
    <div className="bg-[#f5f4ef]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#1e2a4a] to-[#2a1e3a] px-10 py-16">
        <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-[#2996FF]/10 blur-3xl" />
        <Row gutter={[48, 32]} align="middle" className="relative z-10">
          <Col xs={24} lg={14}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2996FF]/30 bg-[#2996FF]/15 px-3 py-1 text-xs tracking-wide text-[#7EC4FF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2996FF]" />
              教学驱动 · 服务全国高校智慧教学
            </div>
            <Typography.Title className="!mb-4 !text-4xl !font-medium !leading-snug !text-white">
              为每所高校、每位学生
              <br />
              <span className="text-[#2996FF]">提供可规模化的</span>
              <br />
              在线教学与能力成长
            </Typography.Title>
            <Typography.Paragraph className="max-w-xl !text-[13.5px] !leading-7 !text-[#8899bb]">
              {BRAND_NAME}汇聚通识素养、专业核心、实践实训与职业拓展等课程资源，支持视频授课、
              在线作业、在线测评与学情分析，帮助院校沉淀可复用的优质课程资产。
            </Typography.Paragraph>
            <Space wrap className="mt-4">
              <Button type="primary" size="large" href="/student/digitalClass">
                开始学习
              </Button>
              <Button ghost size="large" href="/student/analysis">
                查看学习报告
              </Button>
            </Space>
            <div className="mt-9 flex flex-wrap gap-9 border-t border-white/10 pt-6">
              {HERO_STATS.map(([value, label]) => (
                <div key={label}>
                  <div className="text-[22px] font-medium text-white">{value}</div>
                  <div className="mt-1 text-[11px] tracking-wide text-[#6677aa]">{label}</div>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={24} lg={10}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1220] shadow-2xl">
              <div className="relative grid h-48 place-items-center overflow-hidden bg-gradient-to-br from-[#1e2a4a] to-[#2a1e3a]">
                <Tag className="absolute bottom-3 left-3 border-0 bg-black/50 text-white">第3章</Tag>
                <Tag className="absolute bottom-3 right-3 border-0 bg-black/50 text-white">32:15</Tag>
                <div className="text-center">
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#2996FF] text-white">
                    <PlayCircleFilled className="text-xl" />
                  </div>
                  <div className="text-xs tracking-wide text-[#8899bb]">{DEMO_LESSON.chapterLabel}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-3 text-sm font-medium leading-6 text-white">{DEMO_LESSON.courseTitle}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#8899bb]">主讲：课程讲师</span>
                  <a className="font-medium text-[#2996FF]" href="/student/digitalClass">
                    继续学习 →
                  </a>
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-[#6677aa]">
                    <span>学习进度</span>
                    <span className="font-medium text-[#2996FF]">58%</span>
                  </div>
                  <Progress percent={58} showInfo={false} strokeColor="#2996FF" trailColor="rgba(255,255,255,0.08)" />
                </div>
                <div className="mt-4 border-t border-white/10 pt-3">
                  {DEMO_LESSON.chapters.map((name, index) => (
                    <div key={name} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-[#99a4bb]">
                      <span
                        className={
                          index < 2
                            ? "grid h-5 w-5 place-items-center rounded bg-[#6EE7A4]/15 text-[#6EE7A4]"
                            : index === 2
                              ? "grid h-5 w-5 place-items-center rounded bg-[#2996FF]/15 text-[#2996FF]"
                              : "grid h-5 w-5 place-items-center rounded bg-white/5 text-[#556677]"
                        }
                      >
                        {index < 2 ? "✓" : "▶"}
                      </span>
                      <span className="flex-1 truncate">
                        第{index + 1}章 · {name}
                      </span>
                      <span className="text-[#556677]">{DEMO_LESSON.chapterMinutes[index]}分钟</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      <section className="bg-white px-10 py-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <Typography.Title level={3} className="!mb-1 !text-xl !font-medium">
              核心功能
            </Typography.Title>
            <Typography.Text className="text-sm text-[#888]">四大模块，全面覆盖学习全流程</Typography.Text>
          </div>
        </div>
        <Row gutter={[16, 16]}>
          {features.map((feature) => (
            <Col xs={24} sm={12} xl={6} key={feature.name}>
              <Card
                bordered
                className={`h-full rounded-[14px] border-[#e8e5df] transition hover:-translate-y-1 hover:border-[#ccc6bb] ${
                  feature.path ? "cursor-pointer" : ""
                }`}
                onClick={() => feature.path && navigate(feature.path)}
              >
                <div className={`mb-4 grid h-10 w-10 place-items-center rounded-[10px] text-xl ${feature.colorClass}`}>
                  {feature.icon}
                </div>
                <Typography.Title level={5} className="!mb-2 !font-medium">
                  {feature.name}
                </Typography.Title>
                <Typography.Paragraph className="!mb-3 !text-xs !leading-6 !text-[#888]">
                  {feature.desc}
                </Typography.Paragraph>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide text-[#2996FF]">{feature.count}</span>
                  {feature.path && <span className="text-xs font-medium text-[#2996FF]">进入 →</span>}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="mb-4 mt-12">
          <Typography.Title level={3} className="!mb-1 !text-xl !font-medium">
            覆盖学科
          </Typography.Title>
          <Typography.Text className="text-sm text-[#888]">通识、专业、实训多门类课程资源持续扩充</Typography.Text>
        </div>
        <Space wrap size={[8, 8]} className="mb-10">
          {SUBJECT_TAGS.map((tag) => (
            <Tag key={tag} className="!rounded-full !px-4 !py-1 !text-sm" color={BRAND_COLORS.primaryLight} style={{ color: BRAND_COLORS.primary }}>
              {tag}
            </Tag>
          ))}
        </Space>

        <div className="mb-7 flex items-end justify-between">
          <div>
            <Typography.Title level={3} className="!mb-1 !text-xl !font-medium">
              热门课程
            </Typography.Title>
            <Typography.Text className="text-sm text-[#888]">跨学科精选，满足不同专业学习需求</Typography.Text>
          </div>
          <Button type="link" href="/course" className="!text-[#2996FF]">
            查看全部课程 →
          </Button>
        </div>
        <Row gutter={[18, 18]}>
          {HOME_COURSES.map((course) => (
            <Col xs={24} sm={12} lg={6} key={course.courseKey}>
              <Card
                bordered
                className="cursor-pointer overflow-hidden rounded-[14px] border-[#e8e5df] transition hover:-translate-y-1 hover:border-[#ccc6bb]"
                styles={{ body: { padding: 0 } }}
                onClick={() => navigate(`/student/lesson/${course.courseKey}`)}
              >
                <div className={`relative flex h-32 items-end overflow-hidden bg-gradient-to-br ${course.bg} p-3`}>
                  <Tag className="border-0 bg-black/50 text-white">认证课程</Tag>
                  <div
                    className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-2xl text-white opacity-80"
                    style={{ background: course.color }}
                  >
                    {course.icon}
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[1px]" style={{ color: course.color }}>
                    {course.category}
                  </div>
                  <Typography.Title level={5} className="!mb-3 !text-sm !font-medium !leading-6">
                    {course.title}
                  </Typography.Title>
                  <div className="mb-3 flex items-center justify-between text-xs text-[#888]">
                    <span className="text-[#f39c12]">★★★★★</span>
                    <span>{course.learners}</span>
                  </div>
                  <div className="mb-1 flex justify-between text-[10px] text-[#999]">
                    <span>完成进度</span>
                    <span style={{ color: course.color }}>{course.progress}%</span>
                  </div>
                  <Progress percent={course.progress} showInfo={false} strokeColor={course.color} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="bg-[#f5f4ef] px-10 pb-12 pt-0">
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={15}>
            <Card bordered className="rounded-[14px] border-[#e8e5df]">
              <div className="mb-5 flex items-center justify-between">
                <Typography.Title level={5} className="!m-0 !font-medium">
                  考试安排
                </Typography.Title>
                <Tag color="#E8F3FF" className="!text-[#2996FF]">
                  {examSummary?.pendingCount ?? 0} 场待考
                </Tag>
              </div>
              <Space direction="vertical" size={10} className="w-full">
                {(examSummary?.pendingExams ?? []).map((exam, index) => (
                  <div
                    key={exam.id}
                    className="flex cursor-pointer items-center gap-3 rounded-[10px] bg-[#faf9f6] px-4 py-3 transition hover:bg-[#f0efe8]"
                    onClick={() => navigate("/student/exams")}
                  >
                    <div
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-semibold"
                      style={{ background: `${exam.color}18`, color: exam.color }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{exam.title}</div>
                      <div className="mt-1 text-xs text-[#999]">
                        {exam.subjectName} · {exam.detail}
                      </div>
                    </div>
                    <Tag color={exam.color}>{exam.statusLabel}</Tag>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={9}>
            <Card bordered className="rounded-[14px] border-[#e8e5df]">
              <div className="mb-5 flex items-center justify-between">
                <Typography.Title level={5} className="!m-0 !font-medium">
                  我的评分
                </Typography.Title>
                <Typography.Text className="text-xs text-[#999]">2026 春季学期</Typography.Text>
              </div>
              <div className="mb-4 grid place-items-center">
                <Progress
                  type="circle"
                  percent={examSummary?.overallExamPercent ?? 0}
                  strokeColor="#2996FF"
                  trailColor="#ece9e3"
                  format={() => String(examSummary?.overallExamPercent ?? 0)}
                />
              </div>
              {scoreRows.map((row) => (
                <div key={row.label} className="mb-3 flex items-center gap-3">
                  <span className="w-24 shrink-0 text-xs text-[#666]">{row.label}</span>
                  {row.pendingText ? (
                    <span className="flex-1 text-right text-xs text-[#999]">{row.pendingText}</span>
                  ) : (
                    <>
                      <Progress
                        className="flex-1"
                        percent={row.percent ?? 0}
                        showInfo={false}
                        strokeColor={row.color}
                      />
                      <span className="w-8 text-right text-xs font-medium text-[#555]">{row.percent}</span>
                    </>
                  )}
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </section>

      <footer className="border-t border-white/10 bg-[#1a1a2e] px-10 py-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Space wrap size={28}>
            <Typography.Text className="text-xs font-medium text-[#8899bb]">© 2026 {BRAND_NAME}</Typography.Text>
            <Typography.Text className="text-[11px] text-[#6677aa]">隐私政策</Typography.Text>
            <Typography.Text className="text-[11px] text-[#6677aa]">使用条款</Typography.Text>
            <Typography.Text className="text-[11px] text-[#6677aa]">联系我们</Typography.Text>
            <Typography.Text className="text-[11px] text-[#6677aa]">高校合作</Typography.Text>
          </Space>
          <Space wrap>
            <Tag className="border-white/10 bg-white/5 text-[#8899bb]" icon={<TrophyOutlined />}>
              在线能力认证
            </Tag>
            <Tag className="border-white/10 bg-white/5 text-[#8899bb]" icon={<SafetyCertificateOutlined />}>
              教学质量保障
            </Tag>
          </Space>
        </div>
      </footer>
    </div>
  );
}
