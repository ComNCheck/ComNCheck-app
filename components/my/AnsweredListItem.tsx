import { Pressable, Text, View } from "react-native";

interface AnsweredListItemProps {
  index: number;
  title: string;
  createdAt: string;
  onPress?: () => void;
}

export default function AnsweredListItem({
  index,
  title,
  createdAt,
  onPress,
}: AnsweredListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full flex-row items-center gap-4 p-4 bg-white rounded-lg border-[#E5E7EB] border-[0.5px] active:opacity-80"
    >
      <View className="items-center justify-center w-9 h-9 rounded-full border-[0.5px] border-[#E5E7EB] bg-white">
        <Text className="font-extrabold text-blue-500">{index}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold text-text" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-sm font-medium text-gray-500">{createdAt}</Text>
      </View>
    </Pressable>
  );
}
