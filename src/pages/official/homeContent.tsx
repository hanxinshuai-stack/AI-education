import type { ReactNode } from "react";
import { CodeOutlined, ShopOutlined, TeamOutlined, ToolOutlined } from "@ant-design/icons";

export const HERO_STATS = [
  ["1000+", "在线课程"],
  ["5000+", "练习题库"],
  ["200+", "合作院校"],
  ["86%", "作业自动批改率"],
] as const;

export const SUBJECT_TAGS = ["工学", "经管", "人文", "艺术", "师范", "实训"] as const;

export const DEMO_LESSON = {
  courseTitle: "Python 数据分析入门",
  chapterLabel: "第3章 · 数据可视化实战",
  chapters: ["环境配置", "数据结构", "数据可视化实战", "项目答辩"],
  chapterMinutes: [18, 24, 32, 20],
} as const;

export interface HomeCourseItem {
  courseKey: string;
  category: string;
  title: string;
  learners: string;
  progress: number;
  color: string;
  bg: string;
  icon: ReactNode;
}

export const HOME_COURSES: HomeCourseItem[] = [
  {
    courseKey: "python-intro",
    category: "信息技术",
    title: "Python 程序设计基础",
    learners: "15,240 人学习",
    progress: 62,
    color: "#2996FF",
    bg: "from-[#0f1a2e] to-[#0a1020]",
    icon: <CodeOutlined />,
  },
  {
    courseKey: "ecommerce-practice",
    category: "经管商贸",
    title: "电子商务运营实务",
    learners: "11,806 人学习",
    progress: 48,
    color: "#2980b9",
    bg: "from-[#1a1a2e] to-[#0f1520]",
    icon: <ShopOutlined />,
  },
  {
    courseKey: "mental-health",
    category: "人文通识",
    title: "大学生心理健康与沟通",
    learners: "9,312 人学习",
    progress: 35,
    color: "#6EE7A4",
    bg: "from-[#0f2a1a] to-[#0a1a10]",
    icon: <TeamOutlined />,
  },
  {
    courseKey: "career-communication",
    category: "实践实训",
    title: "职场沟通与项目协作",
    learners: "8,547 人学习",
    progress: 71,
    color: "#e67e22",
    bg: "from-[#2a1e10] to-[#1a1008]",
    icon: <ToolOutlined />,
  },
];

export const HOME_EXAMS = [
  { name: "高等数学期中模拟测", detail: "90分钟 · 单选+填空 · 剩余 3 天", status: "进行中", color: "#2996FF" },
  { name: "大学英语四级强化测验", detail: "60分钟 · 听力+阅读 · 2026-06-12", status: "待参加", color: "#2980b9" },
  { name: "职业生涯规划结业考核", detail: "45分钟 · 简答+论述 · 已通过", status: "88分 通过", color: "#6EE7A4" },
];
