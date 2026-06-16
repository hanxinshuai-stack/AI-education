import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Carousel, Col, Progress, Rate, Row, Space, Statistic, Tag, Typography } from "antd";
import {
  AppstoreOutlined,
  BookOutlined,
  LeftOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { CarouselRef } from "antd/es/carousel";
import { PageCard } from "@/components/PageCard";
import { getCourseTree } from "@/api/platformApi";
import type { CourseTreeNode } from "@/api/mockData";

function collectLeafCourses(nodes: CourseTreeNode[], parent = "未分组"): Array<{ title: string; key: string; category: string }> {
  const result: Array<{ title: string; key: string; category: string }> = [];

  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      result.push(...collectLeafCourses(node.children, node.title));
    } else {
      result.push({ title: node.title, key: node.key, category: parent });
    }
  }

  return result;
}

function chunkCourses<T>(list: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
}

export function TeacherDashboardPage() {
  const navigate = useNavigate();
  const [courseTree, setCourseTree] = useState<CourseTreeNode[]>([]);
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    void getCourseTree().then(setCourseTree);
  }, []);

  const allCourses = useMemo(() => collectLeafCourses(courseTree), [courseTree]);

  const categoryCount = useMemo(() => {
    const categories = new Set(allCourses.map((item) => item.category));
    return categories.size;
  }, [allCourses]);

  const highlightedCourses = allCourses.slice(0, 12);
  const courseSlides = useMemo(() => chunkCourses(highlightedCourses, 4), [highlightedCourses]);

  const cardThemes = [
    { bg: "from-[#0e1a35] to-[#102e6a]", progress: "#2996FF", icon: "#2996FF" },
    { bg: "from-[#151738] to-[#233f8b]", progress: "#2980b9", icon: "#2980b9" },
    { bg: "from-[#0f2f2a] to-[#0f5e4f]", progress: "#6EE7A4", icon: "#6EE7A4" },
    { bg: "from-[#2b1b10] to-[#5d2f0b]", progress: "#e67e22", icon: "#e67e22" },
  ];

  return (
    <Space direction="vertical" className="w-full" size={16}>
      <div className="rounded-2xl bg-gradient-to-r from-[#0f1f3d] via-[#1c2e52] to-[#0f1f3d] p-6 text-white shadow-lg">
        <Typography.Title level={3} className="!mb-2 !text-white">
          课程端总览
        </Typography.Title>
        <Typography.Text className="text-[#d6ddf0]">
          统一查看课程库、课程进度与教学入口，快速进入课程中心进行视频教学和课堂中断问答。
        </Typography.Text>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag color="blue">课程汇总</Tag>
          <Tag color="cyan">视频教学</Tag>
          <Tag color="green">课堂中断问答</Tag>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card bordered={false} className="h-full shadow-sm">
            <Statistic title="课程总数（可用）" value={allCourses.length} prefix={<BookOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} className="h-full shadow-sm">
            <Statistic title="课程分类" value={categoryCount} prefix={<AppstoreOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} className="h-full shadow-sm">
            <Statistic title="课程中心接入率" value={100} suffix="%" />
          </Card>
        </Col>
      </Row>

      <PageCard
        title="全部课程汇总"
        extra={
          <Space>
            <Button icon={<LeftOutlined />} onClick={() => carouselRef.current?.prev()} />
            <Button icon={<RightOutlined />} onClick={() => carouselRef.current?.next()} />
            <Button icon={<PlayCircleOutlined />} onClick={() => navigate("/student/digitalClass")}>
              进入课程中心
            </Button>
            <Button type="primary" icon={<ReadOutlined />} onClick={() => navigate("/course/createPaper")}>
              课程出题
            </Button>
          </Space>
        }
      >
        <Carousel ref={carouselRef} dots autoplay draggable>
          {courseSlides.map((slide, slideIndex) => (
            <div key={`slide-${slideIndex}`}>
              <Row gutter={[14, 14]}>
                {slide.map((course, index) => {
                  const absoluteIndex = slideIndex * 4 + index;
                  const theme = cardThemes[absoluteIndex % cardThemes.length];
                  const learnerCount = 8500 + absoluteIndex * 713;
                  const progressValue = 42 + (absoluteIndex % 5) * 11;

                  return (
                    <Col xs={24} md={12} xl={6} key={course.key}>
                      <Card
                        bordered={false}
                        className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        styles={{ body: { padding: 0 } }}
                      >
                        <div className={`h-24 bg-gradient-to-r ${theme.bg} p-4`}>
                          <Space className="w-full items-start justify-between">
                            <Tag color="geekblue" className="m-0 border-0 bg-black/35 text-white">
                              认证课程
                            </Tag>
                            <div
                              className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                              style={{ background: theme.icon }}
                            >
                              <BookOutlined />
                            </div>
                          </Space>
                        </div>
                        <div className="p-4">
                          <Typography.Text className="text-xs text-[#6b7a99]">{course.category}</Typography.Text>
                          <Typography.Title level={5} className="!mb-2 !mt-1 !text-[17px]">
                            {course.title}
                          </Typography.Title>
                          <div className="mb-2 flex items-center justify-between text-xs text-[#8a94a8]">
                            <Rate disabled allowHalf defaultValue={5} className="text-[12px]" />
                            <span>{learnerCount.toLocaleString()} 人学习</span>
                          </div>
                          <div className="mb-1 flex items-center justify-between text-xs text-[#9aa4b5]">
                            <span>完成进度</span>
                            <span style={{ color: theme.progress }}>{progressValue}%</span>
                          </div>
                          <Progress
                            percent={progressValue}
                            showInfo={false}
                            strokeColor={theme.progress}
                            trailColor="#edf1f6"
                            size="small"
                          />
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          ))}
        </Carousel>
      </PageCard>
    </Space>
  );
}
