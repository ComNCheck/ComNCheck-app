import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface ActionButtonProps {
  icon: string;
  text: string;
  total: number;
  route?: string;
  action?: "openModal";
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "question":
      return <Fontisto name="quote-left" size={16} color="white" />;
    case "answer":
      return <Fontisto name="quote-right" size={16} color="white" />;
    case "modify-role":
      return <FontAwesome6 name="user-tag" size={18} color="white" />;
    case "applied-event":
      return <MaterialIcons name="event-note" size={24} color="white" />;
    case "my-text":
      return (
        <MaterialCommunityIcons
          name="check-underline-circle-outline"
          size={24}
          color="white"
        />
      );
    default:
      return <FontAwesome size={20} name="question" color="white" />;
  }
};

export default function ActionButton({
  icon,
  text,
  total,
  route,
  action,
}: ActionButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (route) {
      router.push(route as any);
      return;
    }
    if (icon === "question") {
      router.push("/(tabs)/my/question");
      return;
    }
    if (action === "openModal") {
      // TODO: 필요한 경우 모달 오픈 로직 추가
      return;
    }
  };

  return (
    <Pressable
      className="flex-1 flex-col items-center justify-center h-20 bg-transparent"
      onPress={handlePress}
    >
      <View className="h-8 w-8 mb-1 items-center justify-center">
        {getIconComponent(icon)}
      </View>
      <Text className="text-xs text-white text-center leading-4">{text}</Text>
    </Pressable>
  );
}
