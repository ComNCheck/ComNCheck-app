import React from "react";
import { View } from "react-native";

interface HeaderBarProps {
  left?: React.ReactNode; // 왼쪽에 들어갈 (텍스트/이미지)
  children?: React.ReactNode; // 오른쪽 (버튼/아이콘 등)
}

export default function HeaderBar({ left, children }: HeaderBarProps) {
  return (
    <View className="absolute top-0 left-0 right-0 bg-white z-50 h-50 pt-12 px-6 flex-row justify-between items-center">
      <View className="flex-row items-center">{left}</View>
      <View className="flex-row items-center">{children}</View>
    </View>
  );
}
