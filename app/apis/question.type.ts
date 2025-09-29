// 질문 관련 API 타입 정의

export interface QuestionRequestDTO {
  title: string;
  shared: boolean;
}

export interface AnswerResponseDTO {
  answerId: number;
  content: string;
  majorQuestionId: number;
  writerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionResponseDTO {
  majorQuestionId: number;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  answer?: AnswerResponseDTO;
  shared: boolean;
}

export interface QuestionListResponse {
  questions: QuestionResponseDTO[];
}
