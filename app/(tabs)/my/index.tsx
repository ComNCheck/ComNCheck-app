import { getMemberData } from "@/app/apis/auth";
import HeaderBar from "@/components/HeaderBar";
import ActionButtons from "@/components/my/ActionButtons";
import UserProfile from "@/components/my/UserProfile";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function MyTab() {
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
    studentNumber: number;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMemberData();
        const data = response.data;

        setUserData({
          name: data.name,
          role: data.role,
          studentNumber: data.studentNumber,
        });

        // 콘솔에 데이터 출력
        console.log("=== MyTab API 데이터 ===");
        console.log("API 응답:", data);
        console.log("설정된 사용자 데이터:", {
          name: data.name,
          role: data.role,
          studentNumber: data.studentNumber,
        });
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
    };

    fetchUserData();
  }, []);

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
        {userData && (
          <>
            <UserProfile
              role={userData.role}
              name={userData.name}
              studentId={userData.studentNumber.toString()}
            />
            <ActionButtons role={userData.role} />
          </>
        )}
      </View>
    </ParallaxScrollView>
  );
}
