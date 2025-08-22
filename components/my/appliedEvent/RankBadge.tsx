import { Text, View } from "react-native";

export default function RankBadge({ rank }: { rank: number }) {
  const isTopThree = rank <= 3;
  const backgroundColor =
    rank === 1
      ? "#FDCB58"
      : rank === 2
        ? "#D1D5DB"
        : rank === 3
          ? "#F59E0B"
          : "transparent";
  const textColor = isTopThree ? "#1F2937" : "#9CA3AF";

  return (
    <View className="w-8 items-center">
      {isTopThree ? (
        <View
          className="w-6 h-6 rounded-full items-center justify-center"
          style={{ backgroundColor }}
        >
          <Text className="text-xs font-bold" style={{ color: textColor }}>
            {rank}
          </Text>
        </View>
      ) : (
        <Text className="text-xl font-semibold text-[#9CA3AF]">{rank}</Text>
      )}
    </View>
  );
}
