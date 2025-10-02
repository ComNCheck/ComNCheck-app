// Suggested Event API 타입 정의

export interface SuggestedEventResponseDTO {
  id: number;
  eventName: string;
  description: string;
  messageToCouncil?: string;
  proposerId: number;
  likeCount: number;
  likedByCurrentUser: boolean;
}

export interface CreateSuggestedEventRequest {
  eventName: string;
  description: string;
  messageToCouncil?: string;
}

export interface UpdateSuggestedEventRequest {
  eventName: string;
  description: string;
  messageToCouncil?: string;
}

export interface LikeResponseDTO {
  likeCount: number;
  liked: boolean;
}

export interface PageSuggestedEventResponseDTO {
  totalElements: number;
  totalPages: number;
  size: number;
  content: SuggestedEventResponseDTO[];
  number: number;
  sort: SortObject;
  pageable: PageableObject;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

// 페이지네이션 파라미터
export interface SuggestedEventListParams {
  page?: number;
  size?: number;
  sort?: string[];
}

// 내가 제안한 행사 목록 파라미터
export interface MySuggestedEventListParams {
  page?: number;
  size?: number;
  sort?: string[];
}
