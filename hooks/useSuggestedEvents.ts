import {
  getAllSuggestedEvents,
  getTopSuggestedEvents,
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

export const useSuggestedEvents = (tab: "all" | "top5") => {
  const [items, setItems] = useState<TopItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [participantCount, setParticipantCount] = useState<number>(0);

  const fetchSuggestedEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      if (tab === "top5") {
        // TOP 5 조회
        const response = await getTopSuggestedEvents();
        const convertedItems = response.map(convertToTopItem);
        setItems(convertedItems);
        // TOP 5의 경우 좋아요 수 합계를 참여자로 표시
        const totalLikes = response.reduce(
          (sum, event) => sum + event.likeCount,
          0
        );
        setParticipantCount(totalLikes);
      } else {
        // 전체 목록 조회 (좋아요 많은 순으로 정렬)
        const response = await getAllSuggestedEvents({
          page: 0,
          size: 100,
          sort: ["likeCount,desc"],
        });
        const convertedItems = response.content.map(convertToTopItem);
        setItems(convertedItems);
        setTotalCount(response.totalElements);
      }
    } catch (err) {
      console.error("Failed to fetch suggested events:", err);
      setError("행사 목록을 불러오는데 실패했습니다.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestedEvents();
  }, [tab]);

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

      // TOP 5의 경우 참여자 수도 업데이트
      if (tab === "top5") {
        setParticipantCount((prev) => (response.liked ? prev + 1 : prev - 1));
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return {
    items,
    toggleLike,
    loading,
    error,
    totalCount,
    participantCount,
    refetch: fetchSuggestedEvents,
  };
};
