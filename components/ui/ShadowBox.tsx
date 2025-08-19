import { View } from "react-native";

export default function ShadowBox({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 bg-white rounded-xl p-4 shadow-md">{children}</View>
  );
}
