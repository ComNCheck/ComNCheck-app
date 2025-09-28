// 질문 관련 API 타입 정의

export interface QuestionRequestDTO {
  title: string;
  shared: boolean;
}

export interface QuestionResponseDTO {
  id: number;
  title: string;
  shared: boolean;
  createdAt: string;
  updatedAt: string;
  content?: string;
  answer?: {
    content: string;
    createdAt: string;
  };
}

export interface QuestionListResponse {
  questions: QuestionResponseDTO[];
}
