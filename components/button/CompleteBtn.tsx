import { Pressable, Text } from "react-native";

interface ButtonProps {
  content: React.ReactNode;
  onPress: () => void;
  backgroundColor?: string;
}
export default function CompleteButton({
  content,
  onPress,
  backgroundColor = "#0077ff",
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full h-[60px] rounded-xl items-center justify-center"
      style={{ backgroundColor: backgroundColor }}
    >
      <Text className="font-bold text-[22px] text-white">{content}</Text>
    </Pressable>
  );
}
