import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type PretendardWeight = "Regular" | "Medium" | "SemiBold" | "Bold";

const FONT_MAP: Record<PretendardWeight, string> = {
  Regular: "Pretendard-Regular",
  Medium: "Pretendard-Medium",
  SemiBold: "Pretendard-SemiBold",
  Bold: "Pretendard-Bold",
};

interface AppTextProps extends TextProps {
  weight?: PretendardWeight;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export function AppText({
  weight = "Regular",
  style,
  children,
  ...rest
}: AppTextProps) {
  return (
    <Text style={[{ fontFamily: FONT_MAP[weight] }, style]} {...rest}>
      {children}
    </Text>
  );
}
export default AppText;
