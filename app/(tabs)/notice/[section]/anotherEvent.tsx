import { getMajorEvent } from "@/app/apis/notice";
import { NoticeType } from "@/app/apis/notice.type";
import HeaderBar from "@/components/HeaderBar";
import NoticeTitle from "@/components/title/NoticeTitle";
import NoticeCard from "@/components/ui/NoticeCard";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Entypo } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

export default function AnotherEventScreen() {
  const router = useRouter();
  const [notices, setNotices] = useState<NoticeType[]>([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getMajorEvent("ETC");
        if (mounted) setNotices(data);
        console.log("과행사 공지:", data);
      } catch (e) {
        console.log("과행사 공지 에러:", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={
            <Pressable
              onPress={() => router.back()}
              className="flex-row items-center"
            >
              <Entypo name="chevron-left" size={30} color="#3a3a3a" />
              <Text className="font-extrabold text-3xl">공지</Text>
            </Pressable>
          }
        />
      }
    >
      <NoticeTitle title="타 주최 행사 확인하기"></NoticeTitle>
      {notices?.map((n) => (
        <NoticeCard
          key={n.id}
          title={n.eventName}
          Date={n.date}
          place={n.location}
          dDay={n.date}
          onPress={() => {
            const section = "another-event";
            const id = String(n.id);
            const path = `/(tabs)/notice/${section}/detail/${id}` as Href;
            router.push(path);
          }}
        />
      ))}
    </ParallaxScrollView>
  );
}
