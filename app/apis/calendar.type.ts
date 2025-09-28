// 달력 관련 타입 정의

// 실제 API 응답 타입
export interface CalendarApiResponse {
  id: number;
  eventName: string | null;
  startDate: string; // YYYY-MM-DD 형식
  endDate: string; // YYYY-MM-DD 형식
  eventStatus: "CONFIRMED" | "TEMPORARY";
}

// 내부에서 사용하는 달력 이벤트 타입
export interface CalendarResponseDTO {
  id: number;
  eventName: string;
  date: string; // YYYY-MM-DD 형식
  location?: string;
  description?: string;
  isConfirmed: boolean; // 확정/임시 여부
  startTime?: string; // HH:mm 형식
  endTime?: string; // HH:mm 형식
  category?: string; // 행사 카테고리
  startDate?: string; // 시작일
  endDate?: string; // 종료일
}

export interface CalendarRequestParams {
  year: number;
  month: number;
}
