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
          },
          {
            id: 2,
            title: "기간 내에 아직 행사 신청을 못했는데...",
            createdAt: "2025.07.03",
            status: "answered",
          },
          {
            id: 3,
            title: "기간 내에 아직 행사 신청을 못했는데...",
            createdAt: "2025.07.03",
            status: "pending",
          },
          {
            id: 4,
            title: "기간 내에 아직 행사 신청을 못했는데...",
            createdAt: "2025.07.03",
            status: "pending",
          },
          {
            id: 5,
            title: "기간 내에 아직 행사 신청을 못했는데...",
            createdAt: "2025.07.03",
            status: "answered",
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
