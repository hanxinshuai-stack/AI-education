import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

export const publicMenuItems: MenuProps["items"] = [
  { key: "home", label: <Link to="/">首页</Link> },
];

export const studentMenuItems: MenuProps["items"] = [
  { key: "home", label: <Link to="/">首页</Link> },
  { key: "courses", label: <Link to="/student/digitalClass">课程中心</Link> },
  { key: "homework", label: <Link to="/student/homework">课后作业</Link> },
  { key: "exams", label: <Link to="/student/exams">在线考试</Link> },
  { key: "analysis", label: <Link to="/student/analysis">学习报告</Link> },
];

export const adminMenuItems: MenuProps["items"] = [
  { key: "admin", label: <Link to="/admin">管理首页</Link> },
  { key: "dashboard", label: <Link to="/admin/dashboard">数据大盘</Link> },
];
