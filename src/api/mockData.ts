import type { AssignmentItem } from "@/types/assignment";
import type { ExamItem } from "@/types/exam";

export const mockStudentExams: ExamItem[] = [
  {
    id: "exam-001",
    title: "Python 程序设计 · 阶段测验",
    subjectId: "it",
    subjectName: "信息技术",
    courseName: "Python 程序设计",
    teacherName: "张明",
    durationMinutes: 60,
    dueAt: "2026-06-12",
    status: "pending",
    maxScore: 100,
    questions: [
      {
        id: "q1",
        stem: "Python 中用于定义函数的关键字是？",
        type: "选择",
        score: 20,
        referenceAnswer: "def",
      },
      {
        id: "q2",
        stem: "简述列表推导式的作用并举例。",
        type: "简答",
        score: 30,
        referenceAnswer: "列表推导式用于快速生成列表，例如 [x*2 for x in range(5)]",
      },
      {
        id: "q3",
        stem: "以下哪项是 Python 的可变数据类型？",
        type: "选择",
        score: 20,
        referenceAnswer: "列表",
      },
    ],
  },
  {
    id: "exam-002",
    title: "电子商务实务 · 结业考核",
    subjectId: "business",
    subjectName: "经管商贸",
    courseName: "电子商务实务",
    teacherName: "王敏",
    durationMinutes: 90,
    dueAt: "2026-06-15",
    status: "pending",
    maxScore: 100,
    questions: [
      {
        id: "q1",
        stem: "直播带货中「人货场」指的是什么？",
        type: "简答",
        score: 25,
        referenceAnswer: "主播、商品与场景",
      },
      {
        id: "q2",
        stem: "店铺转化率通常如何计算？",
        type: "简答",
        score: 25,
        referenceAnswer: "成交人数除以访客数",
      },
    ],
  },
  {
    id: "exam-003",
    title: "大学英语四级 · 模拟测验",
    subjectId: "general",
    subjectName: "人文通识",
    courseName: "大学英语听说",
    teacherName: "李芳",
    durationMinutes: 60,
    dueAt: "2026-06-10",
    status: "pending",
    maxScore: 100,
    questions: [
      {
        id: "q1",
        stem: "听力短对话解题应优先关注什么？",
        type: "简答",
        score: 30,
        referenceAnswer: "关键词与数字信息",
      },
      {
        id: "q2",
        stem: "阅读主旨题的正确思路是？",
        type: "简答",
        score: 30,
        referenceAnswer: "概括段落中心而非细节",
      },
    ],
  },
  {
    id: "exam-004",
    title: "高等数学 · 期中模拟测",
    subjectId: "math",
    subjectName: "高等数学",
    courseName: "高等数学",
    teacherName: "赵强",
    durationMinutes: 90,
    dueAt: "2026-06-08",
    status: "graded",
    maxScore: 100,
    score: 88,
    gradedAt: "2026-06-02",
    aiFeedback: "基础概念掌握较好，建议加强极限与连续性的综合应用练习。",
    questions: [
      {
        id: "q1",
        stem: "求 f(x)=x^2 在 x=2 处的导数。",
        type: "计算",
        score: 50,
        referenceAnswer: "4",
      },
      {
        id: "q2",
        stem: "简述罗尔定理的条件。",
        type: "简答",
        score: 50,
        referenceAnswer: "闭区间连续、开区间可导、端点函数值相等",
      },
    ],
    studentAnswers: { q1: "4", q2: "闭区间连续可导且端点相等" },
  },
];
import type { DigitalAskRequest, DigitalAskResponse, DigitalLessonMeta, DigitalPresenter, DigitalReplayItem } from "@/types/digitalClass";

export const mockStudentAssignments: AssignmentItem[] = [
  {
    id: "hw-001",
    title: "Python 程序设计 · 第3章练习",
    courseName: "Python 程序设计",
    teacherName: "张明",
    assignedAt: "2026-05-28",
    dueAt: "2026-06-10",
    status: "pending",
    questionCount: 5,
    questions: [
      { stem: "简述 Python 列表与元组的主要区别。", type: "简答", score: 10 },
      { stem: "以下哪项是合法的变量名？", type: "选择", score: 5 },
      { stem: "字典的 keys() 方法返回什么类型？", type: "选择", score: 5 },
    ],
  },
  {
    id: "hw-002",
    title: "大学英语听说 · 单元测验",
    courseName: "大学英语听说",
    teacherName: "李芳",
    assignedAt: "2026-05-30",
    dueAt: "2026-06-08",
    status: "submitted",
    questionCount: 8,
    questions: [
      { stem: "根据短文选择最能概括主旨的选项。", type: "选择", score: 5 },
      { stem: "听录音补全对话中的空缺词。", type: "填空", score: 5 },
    ],
  },
  {
    id: "hw-003",
    title: "电子商务实务 · 案例分析作业",
    courseName: "电子商务实务",
    teacherName: "王敏",
    assignedAt: "2026-06-01",
    dueAt: "2026-06-15",
    status: "pending",
    questionCount: 3,
    questions: [
      { stem: "分析某品牌直播带货活动的选品与转化策略。", type: "案例分析", score: 20 },
      { stem: "店铺详情页优化应关注哪些核心指标？", type: "简答", score: 10 },
    ],
  },
  {
    id: "hw-004",
    title: "高等数学 · 期中复习卷",
    courseName: "高等数学",
    teacherName: "赵强",
    assignedAt: "2026-05-20",
    dueAt: "2026-05-27",
    status: "graded",
    questionCount: 10,
    questions: [
      { stem: "求函数 f(x)=x^2+2x 在 x=1 处的导数。", type: "计算", score: 10 },
      { stem: "判断级数收敛性并说明理由。", type: "简答", score: 15 },
    ],
  },
];

export interface OverviewMetric {
  label: string;
  value: string;
  trend: string;
}

export const mockOverviewData: OverviewMetric[] = [
  { label: "课程完成率", value: "68.2%", trend: "本学期稳步提升" },
  { label: "作业提交率", value: "82.5%", trend: "高于上学期均值" },
  { label: "考试通过率", value: "74.1%", trend: "需关注薄弱班级" },
  { label: "课程/题库规模", value: "1000+ / 5000+", trend: "可快速扩容教学资源" },
  { label: "合作院校", value: "200+", trend: "持续拓展学科覆盖" },
];

export const mockKpiTrendData = {
  weeks: ["第1周", "第2周", "第3周", "第4周"],
  series: {
    aiTeachingCoverage: [12, 24, 36, 52],
    correctionEfficiency: [8, 20, 34, 46],
  },
};

export interface CourseTreeNode {
  title: string;
  key: string;
  children?: CourseTreeNode[];
}

export const mockDigitalPresenters: DigitalPresenter[] = [
  {
    id: "presenter-cs",
    name: "张明",
    title: "计算机专业教授",
    expertise: ["程序设计", "数据分析", "项目实战"],
    avatarColor: "#2996FF",
  },
  {
    id: "presenter-econ",
    name: "王敏",
    title: "经管学科教授",
    expertise: ["市场营销", "电商运营", "案例教学"],
    avatarColor: "#2980b9",
  },
  {
    id: "presenter-practice",
    name: "陈浩",
    title: "实践实训导师",
    expertise: ["职场沟通", "团队协作", "实训指导"],
    avatarColor: "#6EE7A4",
  },
];

export const mockDigitalReplayList: DigitalReplayItem[] = [
  { id: "replay-1", title: "Python程序设计·第1讲", recordedAt: "2026-05-28", durationLabel: "22:10" },
  { id: "replay-2", title: "数据可视化实战", recordedAt: "2026-05-30", durationLabel: "18:45" },
  { id: "replay-3", title: "电子商务运营案例课", recordedAt: "2026-06-01", durationLabel: "26:30" },
];

const lessonMetaByKey: Record<string, Omit<DigitalLessonMeta, "courseKey" | "title">> = {
  "python-intro": {
    contentVersion: "v2.1",
    updatedAt: "2026-06-02",
    changelog: "新增 Pandas 可视化章节与项目实战案例。",
    durationSec: 960,
    chapters: [
      { label: "环境配置", startSec: 0 },
      { label: "数据结构", startSec: 200 },
      { label: "数据可视化", startSec: 480 },
      { label: "项目答辩", startSec: 720 },
    ],
  },
  "ecommerce-practice": {
    contentVersion: "v1.5",
    updatedAt: "2026-05-25",
    changelog: "补充直播带货与店铺运营实操模块。",
    durationSec: 840,
    chapters: [
      { label: "平台规则", startSec: 0 },
      { label: "选品策略", startSec: 220 },
      { label: "流量运营", startSec: 500 },
    ],
  },
  "first-aid-cpr": {
    contentVersion: "v2.3",
    updatedAt: "2026-06-01",
    changelog: "同步2026版心肺复苏指南，补充高质量按压与AED衔接要点。",
    durationSec: 1100,
    chapters: [
      { label: "现场评估", startSec: 0 },
      { label: "胸外按压", startSec: 240 },
      { label: "人工呼吸", startSec: 520 },
      { label: "AED衔接", startSec: 780 },
    ],
  },
  "first-aid-aed": {
    contentVersion: "v1.8",
    updatedAt: "2026-05-20",
    changelog: "新增常见误用场景与贴片位置示意图说明。",
    durationSec: 765,
    chapters: [
      { label: "设备识别", startSec: 0 },
      { label: "开机与贴片", startSec: 180 },
      { label: "除颤与CPR循环", startSec: 420 },
    ],
  },
};

const defaultLessonMeta: Omit<DigitalLessonMeta, "courseKey" | "title"> = {
  contentVersion: "v1.0",
  updatedAt: "2026-05-15",
  changelog: "课程内容已对齐行业通用教学框架。",
  durationSec: 900,
  chapters: [
    { label: "课程导入", startSec: 0 },
    { label: "核心知识", startSec: 300 },
    { label: "案例演练", startSec: 600 },
  ],
};

export function getMockDigitalLessonMeta(courseKey: string, courseTitle: string): DigitalLessonMeta {
  const meta = lessonMetaByKey[courseKey] ?? defaultLessonMeta;
  return { courseKey, title: courseTitle, ...meta };
}

const knowledgeByCourseKey: Record<string, string[]> = {
  "python-intro": ["变量与类型", "列表与字典", "Pandas基础", "Matplotlib绘图"],
  "data-analysis": ["数据清洗", "特征工程", "可视化", "报告撰写"],
  "ecommerce-practice": ["选品逻辑", "流量转化", "客服话术", "售后处理"],
  "english-listening": ["听力技巧", "关键词定位", "笔记方法", "模拟训练"],
  "first-aid-cpr": ["胸外按压频率", "按压深度", "开放气道", "AED除颤时机"],
  "first-aid-aed": ["现场安全确认", "贴片位置", "除颤禁忌", "CPR循环"],
};

const presenterNameById: Record<string, string> = {
  "presenter-cs": "张明",
  "presenter-econ": "王敏",
  "presenter-practice": "陈浩",
};

export function buildMockDigitalAnswer(payload: DigitalAskRequest): DigitalAskResponse {
  const points =
    knowledgeByCourseKey[payload.courseKey] ?? ["核心概念", "案例分析", "实操步骤", "拓展阅读"];

  const modeHint =
    payload.mode === "live"
      ? "（直播课）"
      : payload.mode === "tutor"
        ? "（一对一辅导）"
        : "（录播课）";

  const positionHint =
    payload.playbackPositionSec !== undefined
      ? `你当前约在 ${Math.floor(payload.playbackPositionSec / 60)} 分 ${payload.playbackPositionSec % 60} 秒处，`
      : "";

  const presenterName = presenterNameById[payload.presenterId] ?? "课程讲师";

  return {
    answer: `${modeHint}${positionHint}针对「${payload.question}」：结合《${payload.courseTitle}》，建议先回顾本课关键步骤，再通过随堂练习巩固。${presenterName} 的讲解已与课程知识图谱对齐最新教学标准。`,
    knowledgePoints: points.slice(0, 3),
  };
}

export const mockCourseTreeData: CourseTreeNode[] = [
  {
    title: "1000+ 在线课程资源库",
    key: "courses",
    children: [
      {
        title: "通识与素养",
        key: "general",
        children: [
          { title: "大学英语听说", key: "english-listening" },
          { title: "大学生心理健康", key: "mental-health" },
          { title: "创新创业基础", key: "innovation-base" },
        ],
      },
      {
        title: "信息技术",
        key: "it",
        children: [
          { title: "Python 程序设计", key: "python-intro" },
          { title: "数据分析入门", key: "data-analysis" },
          { title: "Web 前端基础", key: "web-frontend" },
        ],
      },
      {
        title: "经管商贸",
        key: "business",
        children: [
          { title: "市场营销原理", key: "marketing-base" },
          { title: "电子商务实务", key: "ecommerce-practice" },
        ],
      },
      {
        title: "实践实训",
        key: "practice",
        children: [
          { title: "职场沟通与协作", key: "career-communication" },
          { title: "CPR 与急救技能", key: "first-aid-cpr" },
          { title: "消防安全基础", key: "disaster-fire" },
        ],
      },
      {
        title: "专业拓展",
        key: "major",
        children: [
          { title: "智能制造概论", key: "smart-manufacturing" },
          { title: "新媒体内容运营", key: "new-media" },
        ],
      },
    ],
  },
];

export type QuestionType = "choice" | "judge" | "shortAnswer" | "caseAnalysis";

export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface QuestionBankItem {
  id: string;
  type: QuestionType;
  knowledgePoint: string;
  difficulty: QuestionDifficulty;
  stem: string;
  answer: string;
  score: number;
}

export const mockQuestionBankMeta = {
  total: "5000+",
  knowledgePoints: [
    "Python程序设计",
    "数据分析",
    "大学英语",
    "电子商务",
    "CPR心肺复苏",
    "职场沟通",
  ],
  difficulties: [
    { label: "基础", value: "easy" },
    { label: "进阶", value: "medium" },
    { label: "综合", value: "hard" },
  ],
};

export const mockQuestionBankData: QuestionBankItem[] = [
  {
    id: "q-001",
    type: "choice",
    knowledgePoint: "CPR心肺复苏",
    difficulty: "easy",
    stem: "成人心肺复苏胸外按压的推荐频率是多少？",
    answer: "100-120次/分钟",
    score: 5,
  },
  {
    id: "q-002",
    type: "choice",
    knowledgePoint: "AED设备使用",
    difficulty: "medium",
    stem: "使用AED前，首先应确认哪项现场条件？",
    answer: "患者与周围环境处于相对安全状态",
    score: 5,
  },
  {
    id: "q-003",
    type: "judge",
    knowledgePoint: "创伤止血包扎",
    difficulty: "easy",
    stem: "直接压迫止血是常见外出血初期处理方法。",
    answer: "正确",
    score: 3,
  },
  {
    id: "q-004",
    type: "judge",
    knowledgePoint: "火灾逃生疏散",
    difficulty: "medium",
    stem: "火灾疏散时应优先乘坐电梯快速撤离。",
    answer: "错误",
    score: 3,
  },
  {
    id: "q-005",
    type: "shortAnswer",
    knowledgePoint: "AED设备使用",
    difficulty: "medium",
    stem: "简述AED贴片放置的基本位置与注意事项。",
    answer: "一片贴于右上胸，另一片贴于左侧胸下方，贴片前保持皮肤干燥并避免接触患者。",
    score: 10,
  },
  {
    id: "q-006",
    type: "shortAnswer",
    knowledgePoint: "地震避险救援",
    difficulty: "hard",
    stem: "说明地震发生后校园疏散的组织要点。",
    answer: "快速避险、统一指挥、分区疏散、清点人数、关注伤员并保持通信畅通。",
    score: 10,
  },
  {
    id: "q-007",
    type: "caseAnalysis",
    knowledgePoint: "火灾逃生疏散",
    difficulty: "hard",
    stem: "教学楼三层突发火情且楼道有烟雾，请分析班级疏散组织流程。",
    answer: "判断火源和烟雾方向，低姿防烟，按最近安全通道分组撤离，教师清点人数并上报。",
    score: 20,
  },
  {
    id: "q-008",
    type: "caseAnalysis",
    knowledgePoint: "创伤止血包扎",
    difficulty: "hard",
    stem: "学生户外实训中前臂开放性出血，请设计现场初步处置方案。",
    answer: "做好个人防护，直接压迫止血，加压包扎，评估末梢循环，必要时呼叫急救。",
    score: 20,
  },
];
