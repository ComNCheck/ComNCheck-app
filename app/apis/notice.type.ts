export interface NoticeType {
  id: number;
  eventName: string;
  date: string;
  time: Time;
  location: string;
}
export interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface DetailNoticeType {
  //행사 상세 조회
  id: number;
  eventName: string;
  category: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  notice: string;
  googleFormLink: string;
  cardNewsImageUrls?: string[];
}
