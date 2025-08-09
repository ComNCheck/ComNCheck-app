import { ScrollView, View } from "react-native";

export default function ScrollBox({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 border-[#FAFAFA] border-[2px] rounded-xl p-4">
      <ScrollView>{children}</ScrollView>
    </View>
  );
}
