import { Text, View } from "react-native";

interface NameProps {
  name: string;
  position: string;
}
export default function CouncilName({ name, position }: NameProps) {
  return (
    <View className="flex-row items-end gap-2 w-[50%]">
      <Text className="font-semibold text-lg text-text">{name}</Text>
      <Text className="font-regular text-base text-[#B6B6B6]">{position}</Text>
    </View>
  );
}
