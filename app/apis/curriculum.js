const curriculumData = [
  {
    semester: "1-1",
    tracks: [
      {
        id: "liberal-arts",
        name: "교양",
        subjects: [{ name: "소프트웨어기초" }],
      },
      {
        id: "foundation",
        name: "기초",
        subjects: [
          { name: "컴퓨터사고(Python)" },
          { name: "정보통신기술의사회적영향" },
          { name: "컴퓨터프로그래밍(C)" },
          { name: "공업수학1" },
        ],
      },
    ],
  },
  {
    semester: "1-2",
    tracks: [
      {
        id: "foundation",
        name: "기초",
        subjects: [
          { name: "공업수학2" },
          { name: "자료구조" },
          { name: "논리회로" },
        ],
      },
      {
        id: "major-required",
        name: "전공필수",
        subjects: [{ name: "확률과통계" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [{ name: "컴퓨터프로그래밍\n및 실습(C++)" }],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [{ name: "인공지능입문" }],
      },
    ],
  },
  {
    semester: "2-1",
    tracks: [
      {
        id: "major-required",
        name: "전공필수",
        subjects: [{ name: "자료구조와알고리즘" }, { name: "컴퓨터구조" }],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [{ name: "데이터사이언스기초" }, { name: "기계학습" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [
          { name: "알고리즘" },
          { name: "객체지향프로그래밍" },
          { name: "웹프로그래밍" },
        ],
      },
    ],
  },
  {
    semester: "2-2",
    tracks: [
      {
        id: "major-required",
        name: "전공필수",
        subjects: [{ name: "운영체제" }],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [{ name: "딥러닝" }, { name: "강화학습" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [
          { name: "컴퓨터네트워크" },
          { name: "소프트웨어공학" },
          { name: "컴퓨터그래픽스" },
        ],
      },
    ],
  },
  {
    semester: "3-1",
    tracks: [
      {
        id: "major-required",
        name: "전공필수",
        subjects: [
          { name: "데이터베이스" },
          { name: "컴파일러구성론" },
          { name: "시스템프로그래밍" },
        ],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [
          { name: "컴퓨터비전개론" },
          { name: "자연어처리" },
          { name: "빅데이터처리" },
        ],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [
          { name: "클라우드컴퓨팅" },
          { name: "게임프로그래밍" },
          { name: "IoT시스템" },
        ],
      },
    ],
  },
  {
    semester: "3-2",
    tracks: [
      {
        id: "major-required",
        name: "전공필수",
        subjects: [{ name: "SW산학프로젝트" }, { name: "소프트웨어프로젝트" }],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [
          { name: "인공지능" },
          { name: "그래프이론" },
          { name: "인공지능특강" },
        ],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [
          { name: "모바일프로그래밍" },
          { name: "정보보안" },
          { name: "컴퓨터보안" },
        ],
      },
    ],
  },
  {
    semester: "4-1",
    tracks: [
      {
        id: "major-required",
        name: "전공필수",
        subjects: [
          { name: "인간컴퓨터상호작용" },
          { name: "SW프로젝트\n및 실습" },
        ],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [{ name: "온디바이스AI" }, { name: "심층학습모델" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [{ name: "소프트웨어프로그래밍" }],
      },
    ],
  },
  {
    semester: "4-2",
    tracks: [
      {
        id: "major-required",
        name: "전공필수",
        subjects: [{ name: "소프트웨어프로젝트\n(확장)" }],
      },
      {
        id: "major-elective-ai",
        name: "전공선택AI",
        subjects: [{ name: "자연어처리심화" }, { name: "머신러닝응용" }],
      },
      {
        id: "major-elective-sw",
        name: "전공선택SW",
        subjects: [{ name: "모바일프로그래밍" }, { name: "졸업프로젝트" }],
      },
    ],
  },
];
export default curriculumData;
