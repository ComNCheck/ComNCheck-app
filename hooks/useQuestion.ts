import { getQuestion } from "@/app/apis/question";
import { QuestionResponseDTO } from "@/app/apis/question.type";
import { useEffect, useState } from "react";

export const useQuestion = (questionId: number | null) => {
  const [question, setQuestion] = useState<QuestionResponseDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!questionId) return;

    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getQuestion(questionId);
        setQuestion(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "질문을 불러오는데 실패했습니다."
        );
        console.error("Failed to fetch question:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  return { question, loading, error };
};
