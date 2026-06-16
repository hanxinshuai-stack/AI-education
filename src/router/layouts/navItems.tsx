import type { MenuProps } from "antd";

export const publicMenuItems: MenuProps["items"] = [
  { key: "home", label: <a href="/">首页</a> },
];

export const studentMenuItems: MenuProps["items"] = [
  { key: "home", label: <a href="/">首页</a> },
  { key: "courses", label: <a href="/student/digitalClass">课程中心</a> },
  { key: "homework", label: <a href="/student/homework">课后作业</a> },
  { key: "exams", label: <a href="/student/exams">在线考试</a> },
  { key: "analysis", label: <a href="/student/analysis">学习报告</a> },
];

export const adminMenuItems: MenuProps["items"] = [
  { key: "admin", label: <a href="/admin">管理首页</a> },
  { key: "dashboard", label: <a href="/admin/dashboard">数据大盘</a> },
];
