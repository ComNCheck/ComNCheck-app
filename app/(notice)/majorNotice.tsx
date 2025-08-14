import HeaderBar from "@/components/HeaderBar";
import NoticeTitle from "@/components/title/NoticeTitle";
import NoticeCard from "@/components/ui/NoticeCard";
import NormalScrollView from "@/components/view/NormalScrollView";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function MajorNoticeScreen() {
  const router = useRouter();
  return (
    <NormalScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={
            <Pressable
              //onPress={() => router.back()}
              onPress={() => router.push("/(tabs)")}
              className="flex-row gap-2 items-center"
            >
              <Entypo name="chevron-left" size={30} color="#3a3a3a" />
              <Text className="font-extrabold text-3xl">공지</Text>
            </Pressable>
          }
        />
      }
    >
      <NoticeTitle title="학부 공지 확인하기"></NoticeTitle>
      <NoticeCard title="1학기 개강총회" Date="2025.03.01" />
    </NormalScrollView>
  );
}
