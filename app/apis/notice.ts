import { api } from "./client";
import {
  Content,
  DetailNoticeType,
  majorNoticeList,
  NoticeType,
} from "./notice.type";

export function DetailAnotherEvent(anotherEventId: number) {
  //타 주최 행사 상세확인하기
  return api.get<DetailNoticeType>(`/api/v1/another-event/${anotherEventId}`);
}

export async function getMajorEvent(
  hostCategory: string
): Promise<NoticeType[]> {
  const params: Record<string, any> = {};
  if (hostCategory !== undefined) params.hostCategory = hostCategory;

  const res = await api.get<NoticeType[]>("/api/v1/major-event", { params });
  return res.data;
}

export function DetailMajorEvent(majorEventId: number) {
  //과행사 상세 확인하기
  return api.get<DetailNoticeType>(`/api/v1/major-event/${majorEventId}`);
}

export async function getMajorNotice(): Promise<Content[]> {
  //학부 공지사항
  const res = await api.get<Content[]>("/api/v1/major/notices");
  return res.data;
}
export async function getMajorNoticePagination(
  //학부 공지사항 페이징
  page: number = 1,
  size: number = 10
): Promise<majorNoticeList> {
  const res = await api.get<majorNoticeList>("/api/v1/major/notices/pages", {
    params: { page, size },
  });
  return res.data;
}
export async function getEmploymentNotice(): Promise<Content[]> {
  //취업 공지사항
  const res = await api.get<Content[]>("/api/v1/employment/notices");
  return res.data;
}
export async function getEmployNoticePagination(
  page: number = 1,
  size: number = 10
): Promise<majorNoticeList> {
  const res = await api.get<majorNoticeList>(
    "/api/v1/employment/notices/pages",
    {
      params: { page, size },
    }
  );
  return res.data;
}
