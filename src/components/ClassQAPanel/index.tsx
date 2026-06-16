import { useEffect, useRef, useState } from "react";
import { Card, Input, List, Space, Spin, Tag, Typography } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { askDigitalClassQuestion } from "@/api/digitalClassApi";
import { BRAND_COLORS } from "@/config/brand";
import type { DigitalAskRequest, DigitalLessonMode } from "@/types/digitalClass";
import { mockStreamText } from "@/utils/mockStreamText";

export interface ChatMessage {
  id: string;
  role: "student" | "ai";
  content: string;
  knowledgePoints?: string[];
  streaming?: boolean;
}

interface ClassQAPanelProps {
  courseKey: string;
  courseTitle: string;
  presenterId: string;
  mode: DigitalLessonMode;
  playbackPositionSec: number;
  focusSignal?: number;
}

const defaultMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "ai",
    content: "你好，我是课堂助教。看视频时可随时中断提问，我会结合课程知识点即时解答。",
  },
];

let messageSeq = 1;
function nextMessageId() {
  messageSeq += 1;
  return `msg-${messageSeq}`;
}

export function ClassQAPanel({
  courseKey,
  courseTitle,
  presenterId,
  mode,
  playbackPositionSec,
  focusSignal = 0,
}: ClassQAPanelProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [asking, setAsking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (focusSignal > 0) {
      setQuestion((prev) => prev || "请讲解当前片段的重点");
    }
  }, [focusSignal]);

  const handleAsk = async (rawQuestion?: string) => {
    const trimmedQuestion = (rawQuestion ?? question).trim();
    if (!trimmedQuestion || asking) {
      return;
    }

    const studentMessage: ChatMessage = {
      id: nextMessageId(),
      role: "student",
      content: trimmedQuestion,
    };
    const aiMessageId = nextMessageId();
    const streamingMessage: ChatMessage = {
      id: aiMessageId,
      role: "ai",
      content: "",
      streaming: true,
    };

    setMessages((prev) => [...prev, studentMessage, streamingMessage]);
    setQuestion("");
    setAsking(true);

    const payload: DigitalAskRequest = {
      question: trimmedQuestion,
      courseKey,
      courseTitle,
      presenterId,
      mode,
      playbackPositionSec,
    };

    try {
      const response = await askDigitalClassQuestion(payload);
      await mockStreamText(response.answer, (partial) => {
        setMessages((prev) =>
          prev.map((item) => (item.id === aiMessageId ? { ...item, content: partial, streaming: true } : item))
        );
      });
      setMessages((prev) =>
        prev.map((item) =>
          item.id === aiMessageId
            ? { ...item, content: response.answer, knowledgePoints: response.knowledgePoints, streaming: false }
            : item
        )
      );
    } finally {
      setAsking(false);
    }
  };

  return (
    <Card
      title={
        <Space>
          <MessageOutlined />
          课堂中断问答
        </Space>
      }
      bordered={false}
      className="flex h-full flex-col shadow-sm"
      styles={{ body: { display: "flex", flexDirection: "column", minHeight: 500 } }}
    >
      <div ref={listRef} className="mb-3 flex-1 overflow-auto">
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item className={item.role === "student" ? "justify-end border-0" : "justify-start border-0"}>
              <div className={item.role === "student" ? "max-w-[90%]" : "max-w-[90%]"}>
                <div
                  className={
                    item.role === "student"
                      ? "rounded-2xl px-4 py-2 text-white"
                      : "rounded-2xl bg-slate-100 px-4 py-2 text-slate-700"
                  }
                  style={item.role === "student" ? { backgroundColor: BRAND_COLORS.primary } : undefined}
                >
                  {item.content || (item.streaming ? <Spin size="small" /> : "")}
                </div>
                {item.role === "ai" && item.knowledgePoints && item.knowledgePoints.length > 0 && (
                  <Space wrap className="mt-2">
                    {item.knowledgePoints.map((point) => (
                      <Tag key={point} color="blue">
                        {point}
                      </Tag>
                    ))}
                  </Space>
                )}
              </div>
            </List.Item>
          )}
        />
      </div>

      <Input.Search
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onSearch={() => void handleAsk()}
        enterButton="提问"
        loading={asking}
        placeholder="输入你的问题，例如：这个章节的关键知识点是什么？"
      />
      <Typography.Text type="secondary" className="mt-2 block text-xs">
        演示阶段为 mock 流式回答；接入后端后替换为 SSE / WebSocket。
      </Typography.Text>
    </Card>
  );
}
