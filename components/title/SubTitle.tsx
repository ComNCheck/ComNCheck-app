import { Text, View } from "react-native";

interface SubTitleProps {
  title: string;
  description: string;
}
export default function SubTitle({ title, description }: SubTitleProps) {
  return (
    <View className="flex-col items-start gap-1 my-2">
      <Text className="font-semibold text-xl text-text">{title}</Text>
      <Text className="font-medium text-lg text-[#b6b6b6]">
        {String(description).replace(/\\n/g, "\n")}
      </Text>
    </View>
  );
}
