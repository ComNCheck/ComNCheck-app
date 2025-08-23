export interface majorEventItem {
  id: number;
  eventName: string;
  date: string;
  location?: string;
  description?: string;
}

// Mock 데이터
const majorEvents: majorEventItem[] = [
  {
    id: 1,
    eventName: "학과 오리엔테이션",
    date: "2025-08-01",
    location: "대강당",
    description: "신입생을 위한 학과 소개 및 안내",
  },
  {
    id: 2,
    eventName: "신입생 환영회",
    date: "2025-08-05",
    location: "학생회관",
    description: "신입생과 선배들의 교류 행사",
  },
  {
    id: 3,
    eventName: "봄 축제",
    date: "2025-08-20",
    location: "캠퍼스 전체",
    description: "봄을 맞이하는 대학 축제",
  },
  {
    id: 4,
    eventName: "학술제",
    date: "2025-08-20",
    location: "도서관",
    description: "학생들의 연구 성과 발표",
  },
  {
    id: 5,
    eventName: "동아리 박람회",
    date: "2025-08-10",
    location: "학생회관 앞",
    description: "각 동아리 소개 및 신입 모집",
  },
];

const anotherEvents: majorEventItem[] = [
  {
    id: 6,
    eventName: "졸업식",
    date: "2025-08-20",
    location: "대강당",
    description: "졸업생을 위한 졸업식",
  },
  {
    id: 7,
    eventName: "입학식",
    date: "2025-08-02",
    location: "대강당",
    description: "신입생 입학식",
  },
  {
    id: 8,
    eventName: "체육대회",
    date: "2025-08-15",
    location: "운동장",
    description: "학과간 체육대회",
  },
  {
    id: 9,
    eventName: "가을 축제",
    date: "2025-08-25",
    location: "캠퍼스 전체",
    description: "가을 축제",
  },
  {
    id: 10,
    eventName: "겨울 축제",
    date: "2025-08-15",
    location: "학생회관",
    description: "연말을 맞이하는 겨울 축제",
  },
];

// API 함수들
export const getMajorEvent = async (): Promise<majorEventItem[]> => {
  // 실제 API 호출 시뮬레이션을 위한 delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(majorEvents);
    }, 100);
  });
};

export const getAnotherMajorEvent = async (): Promise<majorEventItem[]> => {
  // 실제 API 호출 시뮬레이션을 위한 delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(anotherEvents);
    }, 100);
  });
};
