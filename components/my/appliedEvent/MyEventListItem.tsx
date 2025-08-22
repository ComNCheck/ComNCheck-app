import { Pressable, Text, View } from "react-native";
import CalendarPill from "./CalendarPill";
import RankBadge from "./RankBadge";
import { TopItem } from "./types";

export default function MyEventListItem({
  item,
  onPress,
  onPressCalendar,
}: {
  item: TopItem;
  onPress?: (id: string) => void;
  onPressCalendar?: (id: string) => void;
}) {
  return (
    <View className="flex-row items-center w-full mb-3">
      <RankBadge rank={item.rank} />
      <Pressable
        className="flex-1 ml-2 p-4 bg-white rounded-xl border border-[#E5E7EB]"
        onPress={() => onPress?.(item.id)}
      >
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-lg font-extrabold text-text">{item.title}</Text>
          <CalendarPill
            active={false}
            onPress={() => onPressCalendar?.(item.id)}
          />
        </View>
        <Text className="text-base font-medium text-[#6B7280]">
          좋아요 {item.likes}
        </Text>
      </Pressable>
    </View>
  );
}
