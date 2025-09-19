import { api } from "./client";
import { DetailNoticeType, NoticeType } from "./notice.type";

export async function getAnotherEvent(): Promise<NoticeType[]> {
  //타 주최 행사 확인하기
  const res = await api.get<NoticeType[]>("/api/v1/another-event");
  return res.data;
}

export function DetailAnotherEvent(anotherEventId: number) {
  //타 주최 행사 상세확인하기
  return api.get<DetailNoticeType>(`/api/v1/another-event/${anotherEventId}`);
}

export async function getMajorEvent(): Promise<NoticeType[]> {
  //과행사 확인하기
  const res = await api.get<NoticeType[]>("/api/v1/major-event");
  return res.data;
}

export function DetailMajorEvent(majorEventId: number) {
  //과행사 상세 확인하기
  return api.get<DetailNoticeType>(`/api/v1/major-event/${majorEventId}`);
}
