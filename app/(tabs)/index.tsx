import HeaderBar from "@/components/HeaderBar";
import NoticeTitle from "@/components/title/NoticeTitle";
import EventCard from "@/components/ui/EventCard";
import NoticeCard from "@/components/ui/NoticeCard";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";

const HomeScreen = () => {
  const router = useRouter();
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
        onPress={() => router.push("/(notice)")}
      ></NoticeTitle>
      <EventCard
        eventName="개강총회"
        dDay="D-3"
        description="개강총회에 참여하세요!"
        onPress={() => router.push("/(notice)/detail")}
      />
      <NoticeTitle
        title="타 주최 행사 확인하기"
        show="전체보기"
        onPress={() => router.push("/(notice)/anotherEvent")}
      ></NoticeTitle>
      <EventCard
        eventName="개강총회"
        dDay="D-3"
        description="개강총회에 참여하세요!"
        onPress={() => router.push("/(notice)/detail")}
      />
      <NoticeTitle
        title="학부 공지 확인하기"
        show="전체보기"
        onPress={() => router.push("/(notice)/majorNotice")}
      ></NoticeTitle>
      <NoticeCard
        title="2025 여름방학기간 학부사무실 운영시간 및 휴무안내"
        Date="2025.07.03"
        onPress={() => router.push("/(notice)/detail")}
      />
      <NoticeTitle
        title="취업정보 공지 확인하기"
        show="전체보기"
        onPress={() => router.push("/(notice)/employNotice")}
      ></NoticeTitle>
    </ParallaxScrollView>
  );
};

export default HomeScreen;
