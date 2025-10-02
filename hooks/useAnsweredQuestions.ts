import { getAnsweredQuestions } from "@/app/apis/question";
import { QuestionResponseDTO } from "@/app/apis/question.type";
import { useEffect, useState } from "react";

export const useAnsweredQuestions = () => {
  const [questions, setQuestions] = useState<QuestionResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAnsweredQuestions();
        setQuestions(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "질문을 불러오는데 실패했습니다."
        );
        console.error("Failed to fetch answered questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading, error };
};
