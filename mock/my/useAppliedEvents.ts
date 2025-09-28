import {
  getMySuggestedEvents,
  toggleEventLike,
} from "@/app/apis/suggestedEvent";
import { SuggestedEventResponseDTO } from "@/app/apis/suggestedEvent.type";
import { TopItem } from "@/components/my/appliedEvent/types";
import { useEffect, useState } from "react";

// API 응답을 TopItem 형태로 변환하는 함수
const convertToTopItem = (
  event: SuggestedEventResponseDTO,
  index: number
): TopItem => ({
  id: event.id.toString(),
  rank: index + 1,
  title: event.eventName,
  subtitle: undefined,
  description: event.description,
  likes: event.likeCount,
  liked: event.likedByCurrentUser,
});

export const useAppliedEvents = () => {
  const [items, setItems] = useState<TopItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMySuggestedEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMySuggestedEvents();
      const convertedItems = response.content.map(convertToTopItem);
      setItems(convertedItems);
    } catch (err) {
      console.error("Failed to fetch my suggested events:", err);
      setError("행사 목록을 불러오는데 실패했습니다.");
      // 에러 발생 시 빈 배열로 설정
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMySuggestedEvents();
  }, []);

  const toggleLike = async (id: string) => {
    try {
      const eventId = parseInt(id);
      const response = await toggleEventLike(eventId);

      // 성공적으로 토글된 경우 로컬 상태 업데이트
      setItems((prev) =>
        prev.map((it) =>
          it.id === id
            ? {
                ...it,
                liked: response.liked,
                likes: response.likeCount,
              }
            : it
        )
      );
    } catch (err) {
      console.error("Failed to toggle like:", err);
      // 에러 발생 시 사용자에게 알림 (선택사항)
    }
  };

  return {
    items,
    setItems,
    toggleLike,
    loading,
    error,
    refetch: fetchMySuggestedEvents,
  };
};
