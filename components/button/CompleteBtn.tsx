import { Pressable, Text } from "react-native";

interface ButtonProps {
  content: React.ReactNode;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
}
export default function CompleteButton({
  content,
  onPress,
  backgroundColor = "#0077ff",
  textColor = "#ffffff",
  borderColor = "#0077ff",
  borderWidth = 1,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full h-[60px] rounded-xl items-center justify-center"
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
      }}
    >
      <Text className="font-bold text-[22px]" style={{ color: textColor }}>
        {content}
      </Text>
    </Pressable>
  );
}
