import { TopItem } from "@/components/my/appliedEvent/types";
import { useEffect, useState } from "react";

export const useAppliedEvents = () => {
  const [items, setItems] = useState<TopItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: replace with real API call
    const mock: TopItem[] = [
      {
        id: "1",
        rank: 1,
        title: "짝선짝후",
        subtitle: undefined,
        description: "짝선짝후 ㄱㄱ",
        likes: 3,
        liked: false,
      },
      {
        id: "2",
        rank: 2,
        title: "해커톤",
        subtitle: undefined,
        description:
          "솔직히 하루는 너무 짧음. 일주일 정도로 제작되게 했으면 좋겠어요 그리고 간식같은것도 더 많이 많이 준비해주시고요",
        likes: 3,
        liked: true,
      },
      {
        id: "3",
        rank: 3,
        title: "알고리즘 대회",
        subtitle: undefined,
        description: "알고리즘 대회 개최부탁",
        likes: 3,
        liked: true,
      },
      {
        id: "4",
        rank: 4,
        title: "일주일 해커톤",
        subtitle: undefined,
        description: "일주일 해커톤 원해요",
        likes: 3,
        liked: false,
      },
      {
        id: "5",
        rank: 5,
        title: "세미나",
        subtitle: undefined,
        description: "세미나 원해요 선배들(졸업o x 둘다o) ",
        likes: 3,
        liked: false,
      },
    ];

    setItems(mock);
    setLoading(false);
  }, []);

  const toggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, liked: !it.liked, likes: it.likes + (it.liked ? -1 : 1) }
          : it
      )
    );
  };

  return { items, setItems, toggleLike, loading };
};
