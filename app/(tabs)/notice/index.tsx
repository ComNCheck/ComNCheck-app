import {
  getEmploymentNotice,
  getMajorEvent,
  getMajorNotice,
} from "@/app/apis/notice";
import { Content, NoticeType } from "@/app/apis/notice.type";
import { calculateDDay } from "@/app/utils/date";
import HeaderBar from "@/components/HeaderBar";
import NoticeTitle from "@/components/title/NoticeTitle";
import EventCard from "@/components/ui/EventCard";
import NoticeCard from "@/components/ui/NoticeCard";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, ScrollView, Text } from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  const [majorEvents, setMajorEvents] = useState<NoticeType[]>([]);
  const [anotherEvents, setAnotherEvents] = useState<NoticeType[]>([]);
  const [majorNotices, setMajorNotices] = useState<Content[]>([]);
  const [employmentNotices, setEmploymentNotices] = useState<Content[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [major, another, majorN, employN] = await Promise.all([
          getMajorEvent("COMPUTER_SCIENCE"),
          getMajorEvent("ETC"),
          getMajorNotice(),
          getEmploymentNotice(),
        ]);
        if (!alive) return;
        setMajorEvents(major);
        setAnotherEvents(another);
        setMajorNotices(majorN);
        setEmploymentNotices(employN);
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
        onPress={() => router.push("/(tabs)/notice/majorEvent" as Href)}
      ></NoticeTitle>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {majorEvents?.slice(0, 3).map((n) => (
          <EventCard
            key={n.id}
            eventName={n.eventName}
            dDay={calculateDDay(n.date)}
            description={n.location}
            onPress={() => {
              router.push(`/notice/detail/${n.id}` as Href);
            }}
          />
        ))}
      </ScrollView>

      <NoticeTitle
        title="타 주최 행사 확인하기"
        show="전체보기"
        onPress={() => router.push("/(tabs)/notice/anotherEvent" as Href)}
      ></NoticeTitle>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {anotherEvents?.slice(0, 3).map((n) => (
          <EventCard
            key={n.id}
            eventName={n.eventName}
            description={n.location}
            dDay={calculateDDay(n.date)}
            onPress={() => {
              router.push(`/notice/detail/${n.id}` as Href);
            }}
          />
        ))}
      </ScrollView>

      <NoticeTitle
        title="학부 공지 확인하기"
        show="전체보기"
        onPress={() => router.push("/(tabs)/notice/majorNotice" as Href)}
      ></NoticeTitle>
      {majorNotices?.slice(0, 3).map((n) => (
        <NoticeCard
          key={n.notice_id}
          title={n.title}
          Date={n.date}
          onPress={() => Linking.openURL(n.link)}
        />
      ))}
      <NoticeTitle
        title="취업정보 공지 확인하기"
        show="전체보기"
        onPress={() => router.push("/(tabs)/notice/employNotice" as Href)}
      ></NoticeTitle>
      {employmentNotices?.slice(0, 3).map((n) => (
        <NoticeCard
          key={n.notice_id}
          title={n.title}
          Date={n.date}
          onPress={() => Linking.openURL(n.link)}
        />
      ))}
    </ParallaxScrollView>
  );
};

export default HomeScreen;
