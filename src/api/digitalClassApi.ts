import { http } from "@/api/http";
import type {
  DigitalAskRequest,
  DigitalAskResponse,
  DigitalLessonMeta,
  DigitalPresenter,
  DigitalReplayItem,
} from "@/types/digitalClass";

export async function getDigitalPresenters() {
  const response = await http.get<DigitalPresenter[]>("/digital-class/presenters");
  return response.data;
}

export async function getDigitalLessonMeta(courseKey: string, courseTitle: string) {
  const response = await http.get<DigitalLessonMeta>("/digital-class/lesson-meta", {
    params: { courseKey, courseTitle },
  });
  return response.data;
}

export async function askDigitalClassQuestion(payload: DigitalAskRequest) {
  const response = await http.post<DigitalAskResponse>("/digital-class/ask", payload);
  return response.data;
}

export async function getDigitalReplayList() {
  const response = await http.get<DigitalReplayItem[]>("/digital-class/replays");
  return response.data;
}
