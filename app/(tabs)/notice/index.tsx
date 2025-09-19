import { getAnotherEvent, getMajorEvent } from "@/app/apis/notice";
import { NoticeType } from "@/app/apis/notice.type";
import HeaderBar from "@/components/HeaderBar";
import NoticeTitle from "@/components/title/NoticeTitle";
import EventCard from "@/components/ui/EventCard";
import NoticeCard from "@/components/ui/NoticeCard";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  const [majorNotices, setMajorNotices] = useState<NoticeType[]>([]);
  const [anotherNotices, setAnotherNotices] = useState<NoticeType[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [major, another] = await Promise.all([
          getMajorEvent(),
          getAnotherEvent(),
        ]);
        if (!alive) return;
        setMajorNotices(major);
        setAnotherNotices(another);
      } catch (e) {
        console.log("공지 로드 에러:", e);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={<Text className="text-3xl font-extrabold">공지</Text>}
        />
      }
    >
      <NoticeTitle
        title="과행사 공지 확인하기"
        show="전체보기"
        onPress={() => router.push("/(tabs)/notice/[section]/majorEvent")}
      ></NoticeTitle>
      <EventCard
        eventName="개강총회"
        dDay="D-3"
        description="개강총회에 참여하세요!"
        onPress={() => router.push("/(tabs)/notice/majorEvent/detail")}
      />
      {majorNotices?.map((n) => (
        <EventCard
          key={n.id}
          eventName={n.eventName}
          dDay={n.date}
          description={n.location}
          onPress={() =>
            router.push({
              pathname: "/notice/[section]/detail/[id]" as const,
              params: { section: "major-event", id: String(n.id) },
            })
          }
        />
      ))}
      <NoticeTitle
        title="타 주최 행사 확인하기"
        show="전체보기"
        onPress={() => router.push("/(tabs)/notice/[sections]/anotherEvent")}
      ></NoticeTitle>
      {anotherNotices?.map((n) => (
        <EventCard
          key={n.id}
          eventName={n.eventName}
          description={n.location}
          dDay={n.date}
          onPress={() =>
            router.push({
              pathname: "/notice/[section]/detail/[id]" as const,
              params: { section: "another-event", id: String(n.id) },
            })
          }
        />
      ))}
      <NoticeTitle
        title="학부 공지 확인하기"
        show="전체보기"
        onPress={() => router.push("/(tabs)/notice/majorNotice")}
      ></NoticeTitle>
      <NoticeCard
        title="2025 여름방학기간 학부사무실 운영시간 및 휴무안내"
        Date="2025.07.03"
        onPress={() => router.push("/(tabs)/notice")}
      />
      <NoticeTitle
        title="취업정보 공지 확인하기"
        show="전체보기"
        onPress={() => router.push("/(tabs)/notice/employNotice")}
      ></NoticeTitle>
    </ParallaxScrollView>
  );
};

export default HomeScreen;
