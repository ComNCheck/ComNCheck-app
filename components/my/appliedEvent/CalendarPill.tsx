import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export default function CalendarPill({
  active = false,
  onPress,
}: {
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <View
        className="w-12 h-12 rounded-full items-center justify-center border"
        style={{
          backgroundColor: active ? "#0066FF" : "#ffffff",
          borderColor: "#E5E7EB",
          borderWidth: 1,
        }}
      >
        <MaterialCommunityIcons
          name="calendar-month"
          size={22}
          color={active ? "#ffffff" : "#111827"}
        />
      </View>
    </Pressable>
  );
}
