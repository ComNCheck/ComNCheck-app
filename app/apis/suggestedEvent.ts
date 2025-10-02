import { client } from "./client";
import {
  CreateSuggestedEventRequest,
  LikeResponseDTO,
  MySuggestedEventListParams,
  PageSuggestedEventResponseDTO,
  SuggestedEventListParams,
  SuggestedEventResponseDTO,
  UpdateSuggestedEventRequest,
} from "./suggestedEvent.type";

// 전체 제안 행사 목록 조회 (페이징)
export const getAllSuggestedEvents = async (
  params?: SuggestedEventListParams
): Promise<PageSuggestedEventResponseDTO> => {
  const response = await client.get("/api/v1/suggested-event", {
    params,
  });
  return response.data;
};

// 새로운 행사 제안 등록
export const createSuggestedEvent = async (
  data: CreateSuggestedEventRequest
): Promise<SuggestedEventResponseDTO> => {
  const response = await client.post("/api/v1/suggested-event", data);
  return response.data;
};

// 제안된 행사 수정
export const updateSuggestedEvent = async (
  eventId: number,
  data: UpdateSuggestedEventRequest
): Promise<SuggestedEventResponseDTO> => {
  const response = await client.put(`/api/v1/suggested-event/${eventId}`, data);
  return response.data;
};

// 제안 행사 '좋아요' 상태 변경
export const toggleEventLike = async (
  eventId: number
): Promise<LikeResponseDTO> => {
  const response = await client.post(`/api/v1/suggested-event/${eventId}/like`);
  return response.data;
};

// 제안 행사 랭킹 TOP 5 조회
export const getTopSuggestedEvents = async (): Promise<
  SuggestedEventResponseDTO[]
> => {
  const response = await client.get("/api/v1/suggested-event/top");
  return response.data;
};

// 내가 제안한 행사 목록 조회 (페이징)
export const getMySuggestedEvents = async (
  params?: MySuggestedEventListParams
): Promise<PageSuggestedEventResponseDTO> => {
  const response = await client.get("/api/v1/suggested-event/my", {
    params,
  });
  return response.data;
};
