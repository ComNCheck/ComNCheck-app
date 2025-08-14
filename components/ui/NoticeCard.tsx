import { Text, View } from "react-native";

interface NoticeCardProps {
  title: string;
  Date: string;
  place?: string;
  dDay?: string;
}
export default function NoticeCard({
  title,
  Date,
  place,
  dDay,
}: NoticeCardProps) {
  return (
    <View className="w-full items-start justify-between p-4 bg-white rounded-lg border-[#E5E7EB] border-[0.5px]">
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-col">
          <Text className="text-sm font-bold text-text">{title}</Text>
          {place ? (
            <Text className="text-sm font-medium text-[#666]">
              {Date} • {place}
            </Text>
          ) : (
            <Text className="text-sm font-medium text-[#666]">{Date}</Text>
          )}
        </View>
        <Text className="text-lg font-bold text-tint">{dDay}</Text>
      </View>
    </View>
  );
}
