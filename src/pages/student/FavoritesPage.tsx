import { useEffect, useState } from "react";
import { Button, Card, Col, Empty, Row, Space, Tag, Typography } from "antd";
import { DeleteOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface CollectedCourse {
  courseKey: string;
  courseTitle: string;
  category: string;
  collectedAt: string;
}

const cardThemes = [
  { bg: "from-[#0e1a35] to-[#102e6a]", icon: "#2996FF" },
  { bg: "from-[#151738] to-[#233f8b]", icon: "#2980b9" },
  { bg: "from-[#0f2f2a] to-[#0f5e4f]", icon: "#6EE7A4" },
  { bg: "from-[#2b1b10] to-[#5d2f0b]", icon: "#e67e22" },
];

export function FavoritesPage() {
  const navigate = useNavigate();
  const [collectedCourses, setCollectedCourses] = useState<CollectedCourse[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("collectedCourses");
    if (stored) {
      setCollectedCourses(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (courseKey: string) => {
    const updated = collectedCourses.filter((item) => item.courseKey !== courseKey);
    setCollectedCourses(updated);
    localStorage.setItem("collectedCourses", JSON.stringify(updated));
  };

  const handlePlay = (courseKey: string) => {
    navigate(`/student/lesson/${courseKey}`);
  };

  return (
    <Space direction="vertical" size={16} className="w-full">
      <div>
        <Typography.Title level={3} className="!mb-2">
          课程收藏
        </Typography.Title>
        <Typography.Text type="secondary">管理你收藏的课程，随时继续学习</Typography.Text>
      </div>

      {collectedCourses.length === 0 ? (
        <Card bordered={false} className="shadow-sm">
          <Empty description="暂无收藏课程，去课程中心收藏你喜欢的课程吧" />
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {collectedCourses.map((item, index) => {
            const theme = cardThemes[index % cardThemes.length];
            return (
              <Col xs={24} md={12} xl={8} key={item.courseKey}>
                <Card
                  bordered={false}
                  className="overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-md"
                  styles={{ body: { padding: 0 } }}
                >
                  <div className={`h-20 bg-gradient-to-r ${theme.bg} p-3`}>
                    <Space className="w-full items-start justify-between">
                      <Tag color="green" className="m-0 border-0 bg-black/30 text-white">
                        已收藏
                      </Tag>
                      <Space>
                        <Button
                          type="primary"
                          size="small"
                          icon={<PlayCircleOutlined />}
                          onClick={() => handlePlay(item.courseKey)}
                        >
                          继续学习
                        </Button>
                        <Button
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemove(item.courseKey)}
                        />
                      </Space>
                    </Space>
                  </div>
                  <div className="p-4">
                    <Typography.Text className="text-xs text-[#6b7a99]">{item.category}</Typography.Text>
                    <Typography.Title level={5} className="!mb-1 !mt-1 !text-[16px]">
                      {item.courseTitle}
                    </Typography.Title>
                    <Typography.Text type="secondary" className="text-xs">
                      收藏于 {new Date(item.collectedAt).toLocaleDateString()}
                    </Typography.Text>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Space>
  );
}
