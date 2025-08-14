import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface EventCardProps {
  eventName: string;
  dDay: string;
  description: string;
}
export default function EventCard({
  eventName,
  dDay,
  description,
}: EventCardProps) {
  return (
    <View className="items-start justify-center h-28 w-52 p-4 bg-white rounded-lg border-[#E5E7EB] border-[0.5px]">
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-lg font-bold text-text">{eventName}</Text>
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={24}
          color="black"
        />
      </View>
      <Text className="text-lg font-bold text-tint">{dDay}</Text>
      <Text className="text-base font-medium text-[#666]">{description}</Text>
    </View>
  );
}
