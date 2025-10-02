import { api } from "./client";
import {
  AnswerRequestDTO,
  AnswerResponseDTO,
  AnswerUpdateRequestDTO,
} from "./question.type";

/**
 * FAQ 답변 작성
 */
export const createAnswer = async (
  answerData: AnswerRequestDTO
): Promise<AnswerResponseDTO> => {
  const response = await api.post<AnswerResponseDTO>(
    "/api/v1/major/answers",
    answerData
  );
  return response.data;
};

/**
 * FAQ 답변 수정
 */
export const updateAnswer = async (
  answerId: number,
  answerData: AnswerUpdateRequestDTO
): Promise<AnswerResponseDTO> => {
  const response = await api.put<AnswerResponseDTO>(
    `/api/v1/major/answers/${answerId}`,
    answerData
  );
  return response.data;
};

/**
 * FAQ 답변 삭제
 */
export const deleteAnswer = async (answerId: number): Promise<void> => {
  await api.delete(`/api/v1/major/answers/${answerId}`);
};
