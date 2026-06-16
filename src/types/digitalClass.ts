/** 课堂授课模式 */
export type DigitalLessonMode = "vod" | "live" | "tutor";

export interface DigitalPresenter {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  avatarColor: string;
}

export interface DigitalLessonMeta {
  courseKey: string;
  title: string;
  contentVersion: string;
  updatedAt: string;
  changelog: string;
  durationSec: number;
  chapters: Array<{ label: string; startSec: number }>;
}

export interface DigitalAskRequest {
  question: string;
  courseKey: string;
  courseTitle: string;
  presenterId: string;
  mode: DigitalLessonMode;
  playbackPositionSec?: number;
}

export interface DigitalAskResponse {
  answer: string;
  knowledgePoints: string[];
}

export interface DigitalReplayItem {
  id: string;
  title: string;
  recordedAt: string;
  durationLabel: string;
}
