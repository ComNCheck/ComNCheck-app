import { Pressable, Text } from "react-native";

interface ButtonProps {
  content: React.ReactNode;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  disabled?: boolean;
}
export default function CompleteButton({
  content,
  onPress,
  backgroundColor = "#0077ff",
  textColor = "#ffffff",
  borderColor = "#0077ff",
  borderWidth = 1,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      className="w-full h-[60px] rounded-xl items-center justify-center"
      style={{
        backgroundColor,
        borderColor,
        borderWidth,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <Text className="font-bold text-[22px]" style={{ color: textColor }}>
        {content}
      </Text>
    </Pressable>
  );
}
