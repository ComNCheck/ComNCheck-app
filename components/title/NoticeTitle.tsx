import { Pressable, Text, View } from "react-native";

interface SubTitleProps {
  title: string;
  show?: string;
  onPress?: () => void;
}
export default function NoticeTitle({ title, show, onPress }: SubTitleProps) {
  return (
    <View className="flex-row w-full justify-between items-center gap-1">
      <Text className="font-bold text-lg text-text">| {title}</Text>
      <Pressable>
        <Text onPress={onPress} className="font-medium text-sm text-text">
          {show}
        </Text>
      </Pressable>
    </View>
  );
}
