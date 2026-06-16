import { Card, Col, Row, Space, Statistic, Typography } from "antd";
import { BRAND_COLORS } from "@/config/brand";
import type { EChartsOption } from "echarts";
import { EchartBox } from "@/components/EchartBox";

const teacherStatsOption: EChartsOption = {
  color: [BRAND_COLORS.primary, BRAND_COLORS.secondary, "#e67e22"],
  tooltip: { trigger: "item" },
  legend: { bottom: 0 },
  series: [
    {
      name: "全校师资统计",
      type: "pie",
      radius: ["42%", "68%"],
      center: ["50%", "44%"],
      data: [
        { value: 36, name: "专职教师" },
        { value: 18, name: "行业导师" },
        { value: 12, name: "在线课程" },
      ],
      label: { formatter: "{b}\n{c}人" },
    },
  ],
};

const majorEnrollmentOption: EChartsOption = {
  color: [BRAND_COLORS.primary],
  tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
  grid: { top: 24, left: 16, right: 16, bottom: 12, containLabel: true },
  xAxis: {
    type: "category",
    data: ["计算机", "电子商务", "智能制造", "护理", "学前教育", "公共管理"],
  },
  yAxis: { type: "value", name: "人数" },
  series: [
    {
      name: "招生人数",
      type: "bar",
      barWidth: 34,
      data: [520, 380, 310, 290, 260, 180],
    },
  ],
};

const skillAverageOption: EChartsOption = {
  color: [BRAND_COLORS.secondary, "#e67e22"],
  tooltip: { trigger: "axis" },
  legend: { top: 0 },
  grid: { top: 42, left: 16, right: 16, bottom: 12, containLabel: true },
  xAxis: { type: "category", data: ["专业课", "通识课", "实训课", "毕业设计", "综合测评"] },
  yAxis: { type: "value", max: 100, axisLabel: { formatter: "{value}%" } },
  series: [
    {
      name: "当前均值",
      type: "bar",
      barWidth: 28,
      data: [72, 68, 75, 64, 70],
    },
    {
      name: "目标均值",
      type: "line",
      smooth: true,
      data: [85, 82, 88, 80, 84],
    },
  ],
};

const resourceTotalOption: EChartsOption = {
  color: [BRAND_COLORS.primary, "#e67e22"],
  tooltip: { trigger: "item" },
  series: [
    {
      name: "资源总量",
      type: "pie",
      radius: "70%",
      data: [
        { value: 1000, name: "课程资源" },
        { value: 5000, name: "题库资源" },
      ],
      label: {
        formatter: "{b}\n{c}+",
      },
    },
  ],
};

const summaryCards = [
  { title: "全校师资", value: 66, suffix: "人", color: BRAND_COLORS.primary },
  { title: "年度招生", value: 1940, suffix: "人", color: BRAND_COLORS.secondary },
  { title: "课程完成均值", value: 70, suffix: "%", color: "#e67e22" },
  { title: "课程/题库", value: "1000+ / 5000+", suffix: "", color: BRAND_COLORS.primary },
];

export function AdminGlobalDashboardPage() {
  return (
    <Space direction="vertical" size={16} className="w-full">
      <div>
        <Typography.Title level={3} className="!mb-2">
          管理员全局数据看板
        </Typography.Title>
        <Typography.Text type="secondary">
          汇总全校师资、招生、课程完成与资源建设数据，辅助院校进行教学运营决策。
        </Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        {summaryCards.map((item) => (
          <Col xs={24} sm={12} lg={6} key={item.title}>
            <Card bordered={false} className="h-full shadow-sm">
              <Statistic
                title={item.title}
                value={item.value}
                suffix={item.suffix}
                valueStyle={{ color: item.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <EchartBox title="全校师资统计" option={teacherStatsOption} height={340} />
        </Col>
        <Col xs={24} lg={12}>
          <EchartBox title="各专业招生数据" option={majorEnrollmentOption} height={340} />
        </Col>
        <Col xs={24} lg={12}>
          <EchartBox title="学生整体学习完成均值" option={skillAverageOption} height={340} />
        </Col>
        <Col xs={24} lg={12}>
          <EchartBox title="题库 & 课程总量" option={resourceTotalOption} height={340} />
        </Col>
      </Row>
    </Space>
  );
}
