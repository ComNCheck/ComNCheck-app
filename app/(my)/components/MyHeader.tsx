import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

interface MyHeaderProps {
  onLogout: () => void;
}

export default function MyHeader({ onLogout }: MyHeaderProps) {
  return (
    <View className="flex-row justify-end items-center p-4 absolute top-12 z-10 right-4">
      <View className="flex-row gap-4">
        <Pressable
          className="p-2 rounded-lg"
          onPress={() => router.push("/(setting)")}
        >
          <FontAwesome size={24} name="gear" color="#B6B6B6" />
        </Pressable>
        <Pressable className="p-2 rounded-lg" onPress={onLogout}>
          <MaterialIcons size={24} name="logout" color="#B6B6B6" />
        </Pressable>
      </View>
    </View>
  );
}
