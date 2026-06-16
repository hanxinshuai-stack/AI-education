import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  App,
  Button,
  Card,
  Col,
  Drawer,
  List,
  Row,
  Segmented,
  Space,
  Typography,
} from "antd";
import {
  ArrowLeftOutlined,
  HeartFilled,
  HeartOutlined,
  PlaySquareOutlined,
  ReadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ClassQAPanel } from "@/components/ClassQAPanel";
import { DigitalHumanPlayer } from "@/components/DigitalHumanPlayer";
import {
  getDigitalLessonMeta,
  getDigitalPresenters,
  getDigitalReplayList,
} from "@/api/digitalClassApi";
import { getCourseTree } from "@/api/platformApi";
import type {
  DigitalLessonMeta,
  DigitalLessonMode,
  DigitalPresenter,
  DigitalReplayItem,
} from "@/types/digitalClass";
import type { TreeDataNode } from "antd";

const modeOptions: Array<{ label: string; value: DigitalLessonMode }> = [
  { label: "标准视频课", value: "vod" },
  { label: "直播回放", value: "live" },
  { label: "重点答疑课", value: "tutor" },
];

function findTitleByKey(nodes: TreeDataNode[], key: string): string | undefined {
  for (const node of nodes) {
    if (node.key === key) return String(node.title);
    const child = node.children ? findTitleByKey(node.children, key) : undefined;
    if (child) return child;
  }
  return undefined;
}

export function LessonPage() {
  const { message } = App.useApp();
  const { courseKey = "python-intro" } = useParams<{ courseKey: string }>();
  const navigate = useNavigate();

  const [courseTree, setCourseTree] = useState<TreeDataNode[]>([]);
  const [mode, setMode] = useState<DigitalLessonMode>("vod");
  const [isCollected, setIsCollected] = useState(false);
  const [presenters, setPresenters] = useState<DigitalPresenter[]>([]);
  const [presenterId, setPresenterId] = useState("presenter-cs");
  const [lessonMeta, setLessonMeta] = useState<DigitalLessonMeta | undefined>();
  const [playbackPositionSec, setPlaybackPositionSec] = useState(0);
  const [qaFocusSignal, setQaFocusSignal] = useState(0);
  const [replayOpen, setReplayOpen] = useState(false);
  const [replayList, setReplayList] = useState<DigitalReplayItem[]>([]);

  useEffect(() => {
    void getCourseTree().then(setCourseTree);
    void getDigitalPresenters().then((data) => {
      setPresenters(data);
      if (data[0]) setPresenterId(data[0].id);
    });
    void getDigitalReplayList().then(setReplayList);
  }, []);

  // 检查当前课程是否已收藏
  useEffect(() => {
    const stored = localStorage.getItem("collectedCourses");
    if (stored) {
      const collected: Array<{ courseKey: string }> = JSON.parse(stored);
      setIsCollected(collected.some((item) => item.courseKey === courseKey));
    }
  }, [courseKey]);

  const courseTitle = useMemo(
    () => findTitleByKey(courseTree, courseKey) ?? "课程学习",
    [courseTree, courseKey]
  );

  useEffect(() => {
    void getDigitalLessonMeta(courseKey, courseTitle).then(setLessonMeta);
  }, [courseKey, courseTitle]);

  const playerHeight = mode === "tutor" ? 420 : 360;

  // 获取当前课程的分类
  const currentCategory = useMemo(() => {
    const findCategory = (nodes: TreeDataNode[], targetKey: string, parentTitle = "未分组"): string | undefined => {
      for (const node of nodes) {
        if (node.key === targetKey) return parentTitle;
        if (node.children) {
          const found = findCategory(node.children, targetKey, node.title as string);
          if (found) return found;
        }
      }
      return undefined;
    };
    return findCategory(courseTree, courseKey) ?? "课程";
  }, [courseTree, courseKey]);

  const handleToggleCollect = () => {
    const stored = localStorage.getItem("collectedCourses");
    const collected: Array<{ courseKey: string; courseTitle: string; category: string; collectedAt: string }> =
      stored ? JSON.parse(stored) : [];

    if (isCollected) {
      // 取消收藏
      const updated = collected.filter((item) => item.courseKey !== courseKey);
      localStorage.setItem("collectedCourses", JSON.stringify(updated));
      setIsCollected(false);
      message.success("已取消收藏");
    } else {
      // 添加收藏
      const newItem = {
        courseKey,
        courseTitle,
        category: currentCategory,
        collectedAt: new Date().toISOString(),
      };
      const updated = [...collected, newItem];
      localStorage.setItem("collectedCourses", JSON.stringify(updated));
      setIsCollected(true);
      message.success("收藏成功，可在个人中心查看");
    }
  };

  return (
    <Space direction="vertical" size={16} className="w-full">
      <div className="flex items-center gap-3">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/student/digitalClass")}
        >
          返回课程中心
        </Button>
        <Typography.Title level={4} className="!mb-0">
          {courseTitle}
        </Typography.Title>
      </div>

      <Segmented
        options={modeOptions}
        value={mode}
        onChange={(value) => setMode(value as DigitalLessonMode)}
      />

      {lessonMeta && (
        <Alert
          type="info"
          showIcon
          icon={<SyncOutlined />}
          message={`课程内容已更新至 ${lessonMeta.contentVersion}（${lessonMeta.updatedAt}）`}
          description={lessonMeta.changelog}
        />
      )}

      <Row gutter={[16, 16]} align="stretch">
        <Col xs={24} lg={15}>
          <Space direction="vertical" size={16} className="w-full">
            <DigitalHumanPlayer
              lessonTitle={courseTitle}
              mode={mode}
              presenters={presenters}
              presenterId={presenterId}
              lessonMeta={lessonMeta}
              height={playerHeight}
              onPresenterChange={setPresenterId}
              onInterruptAsk={() => setQaFocusSignal((prev) => prev + 1)}
              onPlaybackPositionChange={setPlaybackPositionSec}
            />
            <Card bordered={false} className="shadow-sm">
              <Space wrap>
                <Button
                  type={isCollected ? "default" : "primary"}
                  icon={isCollected ? <HeartFilled /> : <HeartOutlined />}
                  onClick={handleToggleCollect}
                >
                  {isCollected ? "已收藏" : "收藏课程视频"}
                </Button>
                <Button icon={<PlaySquareOutlined />} onClick={() => setReplayOpen(true)}>
                  查看课程回放
                </Button>
                <Button icon={<ReadOutlined />}>随堂测验</Button>
              </Space>
            </Card>
          </Space>
        </Col>

        <Col xs={24} lg={9}>
          <ClassQAPanel
            courseKey={courseKey}
            courseTitle={courseTitle}
            presenterId={presenterId}
            mode={mode}
            playbackPositionSec={playbackPositionSec}
            focusSignal={qaFocusSignal}
          />
        </Col>
      </Row>

      <Drawer
        title="我的课程回放"
        open={replayOpen}
        onClose={() => setReplayOpen(false)}
        width={400}
      >
        <List
          dataSource={replayList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={`录制于 ${item.recordedAt} · 时长 ${item.durationLabel}`}
              />
              <Button type="link" size="small">
                播放
              </Button>
            </List.Item>
          )}
        />
      </Drawer>
    </Space>
  );
}
