import { View } from "react-native";

export default function ShadowBox({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 bg-white rounded-xl p-4 border-[#E5E7EB] border-[1px]">
      {children}
    </View>
  );
}
