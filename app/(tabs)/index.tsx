import HeaderBar from "@/components/HeaderBar";
import NoticeTitle from "@/components/title/NoticeTitle";
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
        onPress={() => router.push("/(tabs)")} //임시 라우팅
      ></NoticeTitle>
    </ParallaxScrollView>
  );
};

export default HomeScreen;
