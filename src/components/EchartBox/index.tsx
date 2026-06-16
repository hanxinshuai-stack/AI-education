import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { Card } from "antd";

interface EchartBoxProps {
  title: string;
  option: EChartsOption;
  height?: number;
}

export function EchartBox({ title, option, height = 280 }: EchartBoxProps) {
  return (
    <Card title={title} bordered className="safe-card">
      <ReactECharts option={option} style={{ height }} />
    </Card>
  );
}
