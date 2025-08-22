import { Pressable, Text, View } from "react-native";
import LikePill from "./LikePill";
import { TopItem } from "./types";

export default function AppliedEventCard({
  item,
  expanded,
  onToggleLike,
  onToggleExpand,
  useEmojiForTopThree,
}: {
  item: TopItem;
  expanded: boolean;
  onToggleLike: (id: string) => void;
  onToggleExpand: (id: string) => void;
  useEmojiForTopThree: boolean;
}) {
  const renderRankToken = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return String(rank);
  };

  const isTopThree = item.rank <= 3;

  return (
    <Pressable
      className="w-full mb-3"
      onPress={() => onToggleExpand(item.id)}
      accessibilityRole="button"
    >
      <View className="p-4 bg-white rounded-xl border border-[#E5E7EB]">
        <View className="flex-row items-center">
          <View className="w-8 items-center mr-3">
            {useEmojiForTopThree && isTopThree ? (
              <Text
                className="text-lg"
                accessibilityLabel={`rank ${item.rank}`}
              >
                {renderRankToken(item.rank)}
              </Text>
            ) : (
              <Text className="text-xl font-semibold text-[#9CA3AF]">
                {String(item.rank)}
              </Text>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-lg font-extrabold text-text">
              {item.title}
            </Text>
            {expanded && item.description ? (
              <Text className="text-base font-medium text-[#111827] mt-2">
                {item.description}
              </Text>
            ) : null}
            <Text className="text-base font-medium text-[#6B7280] mt-1">
              좋아요 {item.likes}
            </Text>
          </View>

          <View className="ml-2">
            <LikePill
              active={!!item.liked}
              onPress={() => onToggleLike(item.id)}
              variant="plain"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
