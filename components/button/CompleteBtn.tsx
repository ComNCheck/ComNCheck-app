import { Pressable, Text } from "react-native";

interface ButtonProps {
  content: string;
  onPress: () => void;
}
export default function CompleteButton({ content, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full h-[60px] rounded-xl items-center justify-center bg-tint"
    >
      <Text className="font-bold text-[22px] text-white">{content}</Text>
    </Pressable>
  );
}
