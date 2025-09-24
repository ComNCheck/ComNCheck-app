import { getEmployNoticePagination } from "@/app/apis/notice";
import { Content } from "@/app/apis/notice.type";
import HeaderBar from "@/components/HeaderBar";
import NoticeTitle from "@/components/title/NoticeTitle";
import NoticeCard from "@/components/ui/NoticeCard";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, Text } from "react-native";

export default function EmployNoticeScreen() {
  const router = useRouter();
  const [notices, setNotices] = useState<Content[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const page = 1;
        const size = 8;
        const res = await getEmployNoticePagination(page, size);
        if (!mounted) return;
        setNotices(res.content ?? []);
        console.log("학부 공지:", res);
      } catch (e) {
        console.log("학부 공지 에러:", e);
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
              //onPress={() => router.push("/(tabs)/notice")}
              className="flex-row items-center"
            >
              <Entypo name="chevron-left" size={30} color="#3a3a3a" />
              <Text className="font-extrabold text-3xl">공지</Text>
            </Pressable>
          }
        />
      }
    >
      <NoticeTitle title="취업정보 공지 확인하기"></NoticeTitle>
      {notices.map((n) => (
        <NoticeCard
          key={n.notice_id}
          title={n.title}
          Date={n.date}
          onPress={() => Linking.openURL(n.link)}
        />
      ))}
    </ParallaxScrollView>
  );
}
