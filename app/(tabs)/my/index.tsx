import HeaderBar from "@/components/HeaderBar";
import ActionButtons from "@/components/my/ActionButtons";
import UserProfile from "@/components/my/UserProfile";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useMemberData } from "@/mock/my/useMemberData";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function MyTab() {
  const { role, name, studentId } = useMemberData();

  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={<Text className="text-3xl font-extrabold">MY</Text>}
        >
          <Pressable className="flex-row gap-4">
            <FontAwesome
              size={28}
              name="gear"
              color="#B6B6B6"
              onPress={() => router.push("/(setting)")}
            />
          </Pressable>
        </HeaderBar>
      }
    >
      <View className="w-full h-[60vh] justify-center items-center">
        <UserProfile role={role} name={name} studentId={studentId} />
        <ActionButtons role={role} />
      </View>
    </ParallaxScrollView>
  );
}
