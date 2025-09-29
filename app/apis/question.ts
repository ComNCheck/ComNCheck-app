import { api } from "./client";
import { QuestionRequestDTO, QuestionResponseDTO } from "./question.type";

/**
 * FAQ의 답변이 달린 게시글 목록 조회 (공유가 true인 경우만)
 */
export const getAnsweredQuestions = async (): Promise<
  QuestionResponseDTO[]
> => {
  const response = await api.get<QuestionResponseDTO[]>(
    "/api/v1/major/questions"
  );
  return response.data;
};

/**
 * FAQ 게시글 작성
 */
export const createQuestion = async (
  questionData: QuestionRequestDTO
): Promise<QuestionResponseDTO> => {
  const response = await api.post<QuestionResponseDTO>(
    "/api/v1/major/questions",
    questionData
  );
  return response.data;
};

/**
 * FAQ 특정 게시글 조회
 */
export const getQuestion = async (
  majorQuestionId: number
): Promise<QuestionResponseDTO> => {
  const response = await api.get<QuestionResponseDTO>(
    `/api/v1/major/questions/${majorQuestionId}`
  );
  return response.data;
};

/**
 * FAQ 게시글 수정
 */
export const updateQuestion = async (
  majorQuestionId: number,
  questionData: QuestionRequestDTO
): Promise<QuestionResponseDTO> => {
  const response = await api.put<QuestionResponseDTO>(
    `/api/v1/major/questions/${majorQuestionId}`,
    questionData
  );
  return response.data;
};

/**
 * 내가 작성한 FAQ 게시글 목록 조회
 */
export const getMyQuestions = async (): Promise<QuestionResponseDTO[]> => {
  const response = await api.get<QuestionResponseDTO[]>(
    "/api/v1/major/questions/my"
  );
  return response.data;
};
