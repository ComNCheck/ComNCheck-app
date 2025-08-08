import React from "react";
import { View } from "react-native";

interface HeaderBarProps {
  left?: React.ReactNode; // 왼쪽에 들어갈 (텍스트/이미지)
  children?: React.ReactNode; // 오른쪽 (버튼/아이콘 등)
  backgroundColor?: string;
}

export default function HeaderBar({
  left,
  children,
  backgroundColor = "white",
}: HeaderBarProps) {
  return (
    <View
      style={{ backgroundColor: backgroundColor }}
      className="absolute top-0 left-0 right-0 z-50 h-55 pt-16 pb-6 px-4 flex-row justify-between items-center"
    >
      <View className="flex-row items-center">{left}</View>
      <View className="flex-row items-center">{children}</View>
    </View>
  );
}
