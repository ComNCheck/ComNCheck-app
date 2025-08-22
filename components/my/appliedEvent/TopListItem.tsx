import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import LikePill from "./LikePill";
import RankBadge from "./RankBadge";
import { TopItem } from "./types";

export default function TopListItem({
  item,
  onToggleLike,
  onPress,
}: {
  item: TopItem;
  onToggleLike: (id: string) => void;
  onPress?: (id: string) => void;
}) {
  return (
    <View className="flex-row items-center w-full mb-3">
      <RankBadge rank={item.rank} />
      <Pressable
        className="flex-1 ml-2 p-4 bg-white rounded-xl border border-[#E5E7EB]"
        onPress={() => onPress?.(item.id)}
      >
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row items-center">
            {item.rank <= 3 && (
              <MaterialCommunityIcons
                name="medal-outline"
                size={18}
                color={
                  item.rank === 1
                    ? "#F59E0B"
                    : item.rank === 2
                      ? "#9CA3AF"
                      : "#B45309"
                }
              />
            )}
            <Text className="ml-2 text-lg font-extrabold text-text">
              {item.title}
            </Text>
          </View>
          <LikePill
            active={!!item.liked}
            onPress={() => onToggleLike(item.id)}
          />
        </View>
        <Text className="text-base font-medium text-[#6B7280]">
          좋아요 {item.likes}
          {typeof item.comments === "number" ? ` 댓글 ${item.comments}` : ""}
        </Text>
      </Pressable>
    </View>
  );
}
