import { View } from "react-native";

export default function InnerBox({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 border-[#FAFAFA] border-[2px] rounded-xl p-4">
      {children}
    </View>
  );
}
