import {
  CalendarApiResponse,
  CalendarRequestParams,
  CalendarResponseDTO,
} from "./calendar.type";
import { api } from "./client";

/**
 * 월별 달력 조회 API
 * 특정 연도와 월에 해당하는 모든 행사(확정/임시) 목록을 조회합니다.
 * 권한에 따라 임시 행사 포함 여부가 결정됩니다.
 */
export const getCalendarEvents = async (
  params: CalendarRequestParams
): Promise<CalendarResponseDTO[]> => {
  try {
    console.log("API 호출 파라미터:", params);
    const response = await api.get<CalendarApiResponse[]>(
      "/api/v1/major-event/calendar",
      {
        params: {
          year: params.year,
          month: params.month,
        },
      }
    );

    console.log("API 응답 상태:", response.status);
    console.log("API 응답 데이터:", response.data);

    // API 응답을 CalendarResponseDTO로 변환
    const transformedData = response.data.map(transformApiResponseToDTO);
    console.log("변환된 데이터:", transformedData);

    return transformedData;
  } catch (error) {
    console.error("달력 행사 조회 실패:", error);
    console.error("에러 상세:", error.response?.data);

    // API 서버가 작동하지 않을 경우 Mock 데이터 반환
    console.log("API 서버 연결 실패, Mock 데이터 사용");
    return getMockCalendarEvents(params);
  }
};

// API 응답을 CalendarResponseDTO로 변환하는 함수
const transformApiResponseToDTO = (
  apiData: CalendarApiResponse
): CalendarResponseDTO => {
  return {
    id: apiData.id,
    eventName: apiData.eventName || "제목 없음", // null인 경우 기본값 설정
    date: apiData.startDate, // startDate를 date로 사용
    startDate: apiData.startDate,
    endDate: apiData.endDate,
    isConfirmed: apiData.eventStatus === "CONFIRMED",
    location: undefined, // API에서 제공하지 않음
    description: undefined, // API에서 제공하지 않음
    startTime: undefined, // API에서 제공하지 않음
    endTime: undefined, // API에서 제공하지 않음
    category: undefined, // API에서 제공하지 않음
  };
};

// Mock 데이터 함수 (API 서버가 작동하지 않을 때 사용)
const getMockCalendarEvents = (
  params: CalendarRequestParams
): CalendarResponseDTO[] => {
  const mockEvents: CalendarResponseDTO[] = [
    {
      id: 1,
      eventName: "학과 오리엔테이션",
      date: `${params.year}-${String(params.month).padStart(2, "0")}-01`,
      location: "대강당",
      description: "신입생을 위한 학과 소개 및 안내",
      isConfirmed: true,
      startTime: "09:00",
      endTime: "12:00",
      category: "학과행사",
    },
    {
      id: 2,
      eventName: "신입생 환영회",
      date: `${params.year}-${String(params.month).padStart(2, "0")}-05`,
      location: "학생회관",
      description: "신입생과 선배들의 교류 행사",
      isConfirmed: true,
      startTime: "14:00",
      endTime: "18:00",
      category: "학과행사",
    },
    {
      id: 3,
      eventName: "봄 축제",
      date: `${params.year}-${String(params.month).padStart(2, "0")}-20`,
      location: "캠퍼스 전체",
      description: "봄을 맞이하는 대학 축제",
      isConfirmed: true,
      startTime: "10:00",
      endTime: "22:00",
      category: "축제",
    },
    {
      id: 4,
      eventName: "학술제",
      date: `${params.year}-${String(params.month).padStart(2, "0")}-20`,
      location: "도서관",
      description: "학생들의 연구 성과 발표",
      isConfirmed: true,
      startTime: "09:00",
      endTime: "17:00",
      category: "학술",
    },
    {
      id: 5,
      eventName: "동아리 박람회",
      date: `${params.year}-${String(params.month).padStart(2, "0")}-10`,
      location: "학생회관 앞",
      description: "각 동아리 소개 및 신입 모집",
      isConfirmed: true,
      startTime: "10:00",
      endTime: "16:00",
      category: "동아리",
    },
  ];

  console.log("Mock 데이터 반환:", mockEvents);
  return mockEvents;
};

/**
 * 현재 월의 달력 행사 조회 (편의 함수)
 */
export const getCurrentMonthEvents = async (): Promise<
  CalendarResponseDTO[]
> => {
  const now = new Date();
  return getCalendarEvents({
    year: now.getFullYear(),
    month: now.getMonth() + 1, // JavaScript는 0부터 시작하므로 +1
  });
};

/**
 * 특정 날짜의 행사 조회 (편의 함수)
 */
export const getEventsByDate = async (
  date: Date
): Promise<CalendarResponseDTO[]> => {
  const events = await getCalendarEvents({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  });

  const targetDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  return events.filter((event) => event.date === targetDate);
};
