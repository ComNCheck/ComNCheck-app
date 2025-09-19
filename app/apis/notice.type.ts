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
export interface majorNoticeList {
  //학부 공지사항,취업정보 목록 api
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  content: Content[];
}
export interface Content {
  title: string;
  date: string;
  link: string;
  notice_id: number;
}
