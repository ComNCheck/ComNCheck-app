import HeaderBar from "@/components/HeaderBar";
import ActionButtons from "@/components/my/ActionButtons";
import UserProfile from "@/components/my/UserProfile";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useMemberData } from "@/mock/my/useMemberData";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function MyScreen() {
  const { role, name, studentId } = useMemberData();

  const handleLogout = async () => {
    // TODO: 실제 로그아웃 API 호출
    // await postLogout();
    router.push("/(auth)/login");
  };

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

        {/* ActionButtons와 UserProfile 사이에 간격 추가 */}
        {/* <View className="h-8" /> */}

        <ActionButtons role={role} />
      </View>
    </ParallaxScrollView>
  );
}
