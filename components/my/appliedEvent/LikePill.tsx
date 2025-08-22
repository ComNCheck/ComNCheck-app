import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export default function LikePill({
  active = false,
  onPress,
  variant = "pill",
}: {
  active?: boolean;
  onPress?: () => void;
  variant?: "pill" | "plain";
}) {
  return (
    <Pressable onPress={onPress} hitSlop={8} accessibilityRole="button">
      {variant === "plain" ? (
        <MaterialCommunityIcons
          name={active ? "heart" : "heart-outline"}
          size={22}
          color={active ? "#0077FF" : "#111827"}
        />
      ) : (
        <View
          className="w-12 h-12 rounded-full items-center justify-center border"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#E5E7EB",
            borderWidth: 1,
          }}
        >
          <MaterialCommunityIcons
            name={active ? "heart" : "heart-outline"}
            size={22}
            color={active ? "#EF4444" : "#111827"}
          />
        </View>
      )}
    </Pressable>
  );
}
