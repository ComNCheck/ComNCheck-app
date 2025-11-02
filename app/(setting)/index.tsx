import SettinglView from "@/components/view/SettingView";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { authService } from "../services/authService";

export default function SettingScreen() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("설정 화면에서 로그아웃 처리 중 에러:", error);
    }
  };
  return (
    <SettinglView>
      <Pressable
        onPress={() => router.push("/(setting)/toDeveloper")}
        className="flex-row justify-between border-b border-[#B6B6B6] w-full py-6 px-4 active:bg-[#f0f0f0] active:opacity-80"
      >
        <Text className="font-bold text-lg">개발자에게 하고싶은말</Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </Pressable>
      <Pressable
        onPress={() => router.push("/(setting)/curriculum")}
        className="flex-row justify-between border-b border-[#B6B6B6] w-full py-6 px-4 active:bg-[#f0f0f0] active:opacity-80"
      >
        <Text className="font-bold text-lg">학부 과목 트랙&이수체계도</Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </Pressable>
      <Pressable
        onPress={() => router.push("/(setting)/applyRating")}
        className="flex-row justify-between border-b border-[#B6B6B6] w-full py-6 px-4 active:bg-[#f0f0f0] active:opacity-80"
      >
        <Text className="font-bold text-lg">학생회 등급신청</Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </Pressable>
      <Pressable
        onPress={() => router.push("/(setting)/list")}
        className="flex-row justify-between border-b border-[#B6B6B6] w-full py-6 px-4 active:bg-[#f0f0f0] active:opacity-80"
      >
        <Text className="font-bold text-lg">학생회 명단</Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </Pressable>
      <Pressable
        onPress={handleLogout}
        className="flex-row justify-between border-b border-[#B6B6B6] w-full py-6 px-4 active:bg-[#f0f0f0] active:opacity-80"
      >
        <Text className="font-bold text-lg">로그아웃</Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </Pressable>
    </SettinglView>
  );
}
