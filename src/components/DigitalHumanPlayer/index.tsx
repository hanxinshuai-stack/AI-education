import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Progress,
  Select,
  Slider,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  SoundOutlined,
  SubnodeOutlined,
} from "@ant-design/icons";
import { PageCard } from "@/components/PageCard";
import { BRAND_COLORS } from "@/config/brand";
import type { DigitalLessonMeta, DigitalLessonMode, DigitalPresenter } from "@/types/digitalClass";

interface DigitalHumanPlayerProps {
  lessonTitle: string;
  mode: DigitalLessonMode;
  presenters: DigitalPresenter[];
  presenterId: string;
  lessonMeta?: DigitalLessonMeta;
  height?: number;
  onPresenterChange: (presenterId: string) => void;
  onInterruptAsk?: () => void;
  onPlaybackPositionChange?: (sec: number) => void;
}

const modeLabels: Record<DigitalLessonMode, { tag: string; color: "processing" | "success" | "warning" }> = {
  vod: { tag: "标准视频课", color: "success" },
  live: { tag: "直播回放", color: "processing" },
  tutor: { tag: "重点答疑课", color: "warning" },
};

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function DigitalHumanPlayer({
  lessonTitle,
  mode,
  presenters,
  presenterId,
  lessonMeta,
  height = 360,
  onPresenterChange,
  onInterruptAsk,
  onPlaybackPositionChange,
}: DigitalHumanPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [positionSec, setPositionSec] = useState(0);
  const [subtitleOn, setSubtitleOn] = useState(true);

  const durationSec = lessonMeta?.durationSec ?? 900;
  const presenter = presenters.find((item) => item.id === presenterId) ?? presenters[0];
  const modeLabel = modeLabels[mode];

  const subtitle = useMemo(() => {
    if (!playing) {
      return "点击播放开始课程视频（演示占位，后续可接入 HLS / 点播流媒体服务）";
    }
    const chapter =
      [...(lessonMeta?.chapters ?? [])].reverse().find((item) => positionSec >= item.startSec)?.label ??
      "课程讲解";
    return `【${chapter}】${presenter?.name ?? "课程讲师"}：正在讲解「${lessonTitle}」核心要点…`;
  }, [playing, lessonMeta?.chapters, positionSec, presenter?.name, lessonTitle]);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timer = window.setInterval(() => {
      setPositionSec((prev) => {
        const next = prev >= durationSec ? durationSec : prev + 1;
        onPlaybackPositionChange?.(next);
        if (next >= durationSec) {
          setPlaying(false);
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing, durationSec, onPlaybackPositionChange]);

  useEffect(() => {
    setPositionSec(0);
    setPlaying(false);
    onPlaybackPositionChange?.(0);
  }, [lessonTitle, mode, onPlaybackPositionChange]);

  const progressPercent = durationSec > 0 ? Math.round((positionSec / durationSec) * 100) : 0;

  return (
    <PageCard title="视频教学">
      <Space direction="vertical" size={12} className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Typography.Text strong>{lessonTitle}</Typography.Text>
          <Tag color={modeLabel.color}>{modeLabel.tag}</Tag>
        </div>

        <Select
          value={presenterId}
          onChange={onPresenterChange}
          className="w-full"
          placeholder="选择主讲老师"
          options={presenters.map((item) => ({
            value: item.id,
            label: (
              <Space>
                <Avatar size="small" style={{ backgroundColor: item.avatarColor }}>
                  {item.name.slice(0, 1)}
                </Avatar>
                <span>
                  {item.name} · {item.title}
                </span>
              </Space>
            ),
          }))}
        />

        <div
          className="relative grid place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg"
          style={{ height }}
        >
          <Tag color="blue" className="absolute left-3 top-3">
            视频教学演示
          </Tag>
          <Space direction="vertical" align="center" size={8}>
            <Avatar size={72} style={{ backgroundColor: presenter?.avatarColor ?? BRAND_COLORS.primary }}>
              {presenter?.name.slice(0, 1) ?? "讲"}
            </Avatar>
            <Typography.Text className="text-white opacity-90">
              {presenter?.name}（主讲老师）
            </Typography.Text>
            {playing ? (
              <PauseCircleOutlined style={{ fontSize: 32 }} />
            ) : (
              <PlayCircleOutlined style={{ fontSize: 32 }} />
            )}
          </Space>
          {subtitleOn && (
            <div className="absolute inset-x-0 bottom-0 bg-black/55 px-4 py-2 text-center text-sm text-white">
              {subtitle}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="primary"
            icon={playing ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            onClick={() => setPlaying((prev) => !prev)}
          >
            {playing ? "暂停" : "播放"}
          </Button>
          <Tooltip title="字幕开关">
            <Button
              icon={<SubnodeOutlined />}
              type={subtitleOn ? "primary" : "default"}
              ghost={subtitleOn}
              onClick={() => setSubtitleOn((prev) => !prev)}
            />
          </Tooltip>
          <Button icon={<SoundOutlined />}>音量</Button>
          {onInterruptAsk && (
            <Button type="primary" ghost onClick={onInterruptAsk}>
              中断提问
            </Button>
          )}
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>{formatTime(positionSec)}</span>
            <span>{formatTime(durationSec)}</span>
          </div>
          <Slider
            min={0}
            max={durationSec}
            value={positionSec}
            tooltip={{ formatter: (value) => formatTime(value ?? 0) }}
            onChange={(value) => {
              setPositionSec(value);
              onPlaybackPositionChange?.(value);
            }}
          />
          <Progress percent={progressPercent} showInfo={false} strokeColor={BRAND_COLORS.primary} size="small" />
        </div>

        {lessonMeta && (
          <Typography.Text type="secondary" className="text-xs">
            内容版本 {lessonMeta.contentVersion} · 更新于 {lessonMeta.updatedAt}
          </Typography.Text>
        )}
      </Space>
    </PageCard>
  );
}
