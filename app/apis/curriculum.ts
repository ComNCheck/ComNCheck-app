export interface Subject {
  name: string;
  credits?: number;
}

export interface Track {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Curriculum {
  semester: string;
  tracks: Track[];
}

const curriculumData: Curriculum[] = [
  {
    semester: "1-1",
    tracks: [
      {
        id: "liberal-arts",
        name: "교양",
        subjects: [
          { name: "대학영어1" },
          { name: "대학생활과진로설계" },
          { name: "컴퓨터활용" },
        ],
      },
      {
        id: "major-required",
        name: "전공필수",
        subjects: [{ name: "컴퓨터개론" }, { name: "프로그래밍기초" }],
      },
      {
        id: "foundation",
        name: "기초",
        subjects: [{ name: "미적분학1" }, { name: "일반물리학1" }],
      },
    ],
  },
  {
    semester: "1-2",
    tracks: [
      {
        id: "liberal-arts",
        name: "교양",
        subjects: [{ name: "대학영어2" }, { name: "글쓰기" }],
      },
      {
        id: "major-required",
        name: "전공필수",
        subjects: [{ name: "자료구조" }, { name: "객체지향프로그래밍" }],
      },
      {
        id: "foundation",
        name: "기초",
        subjects: [
          { name: "미적분학2" },
          { name: "일반물리학2" },
          { name: "확률과통계" },
        ],
      },
    ],
  },
  {
    semester: "2-1",
    tracks: [
      {
        id: "major-required",
        name: "전공필수",
        subjects: [
          { name: "알고리즘" },
          { name: "컴퓨터구조" },
          { name: "시스템프로그래밍" },
        ],
      },
      {
        id: "foundation",
        name: "기초",
        subjects: [{ name: "선형대수" }, { name: "이산수학" }],
      },
      {
        id: "major-elective",
        name: "전공선택 공통",
        subjects: [{ name: "웹프로그래밍" }],
      },
    ],
  },
  {
    semester: "2-2",
    tracks: [
      {
        id: "major-required",
        name: "전공필수",
        subjects: [{ name: "운영체제" }, { name: "데이터베이스" }],
      },
      {
        id: "major-elective",
        name: "전공선택 공통",
        subjects: [{ name: "컴퓨터네트워크" }, { name: "소프트웨어공학" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [{ name: "모바일프로그래밍" }],
      },
    ],
  },
  {
    semester: "3-1",
    tracks: [
      {
        id: "major-elective",
        name: "전공선택 공통",
        subjects: [{ name: "컴파일러" }, { name: "정보보안" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [{ name: "풀스택개발" }, { name: "게임프로그래밍" }],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [{ name: "기계학습" }, { name: "인공지능" }],
      },
    ],
  },
  {
    semester: "3-2",
    tracks: [
      {
        id: "major-elective",
        name: "전공선택 공통",
        subjects: [{ name: "캡스톤디자인1" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [{ name: "클라우드컴퓨팅" }, { name: "빅데이터처리" }],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [{ name: "딥러닝" }, { name: "컴퓨터비전" }],
      },
    ],
  },
  {
    semester: "4-1",
    tracks: [
      {
        id: "major-elective",
        name: "전공선택 공통",
        subjects: [{ name: "캡스톤디자인2" }, { name: "현장실습" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [{ name: "고급웹개발" }],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [{ name: "자연어처리" }, { name: "로봇공학" }],
      },
    ],
  },
  {
    semester: "4-2",
    tracks: [
      {
        id: "major-elective",
        name: "전공선택 공통",
        subjects: [{ name: "졸업프로젝트" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [{ name: "소프트웨어창업" }],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [{ name: "AI응용프로젝트" }],
      },
    ],
  },
];

export default curriculumData;
