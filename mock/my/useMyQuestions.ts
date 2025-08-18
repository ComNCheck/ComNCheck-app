import { useEffect, useState } from "react";
import { MyQuestionItem } from "./types";

export const useMyQuestions = () => {
  const [questions, setQuestions] = useState<MyQuestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // TODO: 실제 API로 교체
        const mock: MyQuestionItem[] = [
          {
            id: 1,
            title: "기간 내에 아직 행사 신청을 못했는데...",
            createdAt: "2025.07.03",
            status: "answered",
            isPublic: true,
            answer: {
              content:
                "저번 구글폼 을 통해 참여자를 받았었는데, 예산문제로 더이상 추가 모집은 없습니다. 감사합니다.",
              answeredAt: "2025.08.00",
            },
          },
          {
            id: 2,
            title: "기간 내에 아직 행사 신청을 못했는데 가능한가요?",
            createdAt: "2025.07.03",
            status: "answered",
            isPublic: false,
            answer: {
              content:
                "담당 부서와 협의 중이라 당분간 추가 접수는 어렵습니다. 공지 확인 부탁드립니다.",
              answeredAt: "2025.08.01",
            },
          },
          {
            id: 3,
            title: "기간 내에 아직 행사 신청을 못했는데 가능한가요?",
            createdAt: "2025.07.03",
            status: "pending",
            isPublic: true,
          },
          {
            id: 4,
            title: "기간 내에 아직 행사 신청을 못했는데...",
            createdAt: "2025.07.03",
            status: "pending",
            isPublic: false,
          },
          {
            id: 5,
            title: "기간 내에 아직 행사 신청을 못했는데...",
            createdAt: "2025.07.03",
            status: "answered",
            isPublic: true,
            answer: {
              content: "현재 예산이 모두 소진되어 추가 신청은 불가합니다.",
              answeredAt: "2025.08.02",
            },
          },
        ];
        setQuestions(mock);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading };
};
