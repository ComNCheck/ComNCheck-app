import HeaderBar from "@/components/HeaderBar";
import SettinglView from "@/components/SettingView";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function SettingScreen() {
  const router = useRouter();
  return (
    <SettinglView
      headerBar={
        <HeaderBar
          backgroundColor="#DAEBFF"
          left={
            <Pressable
              onPress={() => router.back()}
              className="flex-row gap-2 items-center"
            >
              <Entypo name="chevron-left" size={28} color="#3a3a3a" />
              <Text className="font-extrabold text-2xl">설정</Text>
            </Pressable>
          }
        />
      }
    >
      <View className="border-b border-[#B6B6B6] w-full px-5 pt-5 pb-7">
        <Pressable className="flex-row items-center justify-between">
          <Text className="font-bold text-lg">개발자에게 하고싶은말</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>
      <View className="border-b border-[#B6B6B6] w-full px-5 pt-5 pb-7">
        <Pressable className="flex-row items-center justify-between">
          <Text className="font-bold text-lg">학부 과목 트랙&이수체계도</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>
      <View className="border-b border-[#B6B6B6] w-full px-5 pt-5 pb-7">
        <Pressable className="flex-row items-center justify-between">
          <Text className="font-bold text-lg">학생회 등급신청</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>
      <View className="border-b border-[#B6B6B6] w-full px-5 pt-5 pb-7">
        <Pressable className="flex-row items-center justify-between">
          <Text className="font-bold text-lg">학생회 명단</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>
      <View className="border-b border-[#B6B6B6] w-full px-5 pt-5 pb-7">
        <Pressable className="flex-row items-center justify-between">
          <Text className="font-bold text-lg">로그아웃</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>
    </SettinglView>
  );
}
