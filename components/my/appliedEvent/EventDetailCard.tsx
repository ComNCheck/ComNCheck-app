import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function EventDetailCard({
  title,
  subtitle,
  description,
  likes,
}: {
  title: string;
  subtitle?: string;
  description: string;
  likes: number;
}) {
  return (
    <View className="p-4 bg-white rounded-xl border border-[#E5E7EB]">
      <View className="flex-row items-center mb-1">
        <MaterialCommunityIcons
          name="medal-outline"
          size={18}
          color="#F59E0B"
        />
        <Text className="ml-2 text-lg font-extrabold text-text">{title}</Text>
      </View>
      {subtitle ? (
        <Text className="text-base font-semibold text-text mb-2">
          {subtitle}
        </Text>
      ) : null}
      <Text className="text-base font-medium text-[#111827] mb-3">
        {description}
      </Text>
      <Text className="text-base font-medium text-[#6B7280]">
        좋아요 {likes}
      </Text>
    </View>
  );
}
