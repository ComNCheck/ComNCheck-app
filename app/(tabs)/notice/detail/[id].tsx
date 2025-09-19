import { getDetailMajorEvent } from "@/app/apis/notice";
import { DetailNoticeType } from "@/app/apis/notice.type";
import CompleteButton from "@/components/button/CompleteBtn";
import HeaderBar from "@/components/HeaderBar";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";

export default function DetailEventScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const idNum = Number(id);
  const [notice, setNotice] = useState<DetailNoticeType>();
  const [hideImage, setHideImage] = useState(false);

  const imageUri = useMemo(() => {
    const v = Array.isArray(notice?.cardNewsImageUrls)
      ? notice?.cardNewsImageUrls.find(Boolean)
      : notice?.cardNewsImageUrls;
    const s = typeof v === "string" ? v.trim() : "";
    return s || undefined;
  }, [notice?.cardNewsImageUrls]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getDetailMajorEvent(idNum);
        if (mounted) setNotice(data);
        console.log("과행사 공지:", data);
      } catch (e) {
        console.log("과행사 공지 에러:", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const handleNext = async () => {
    const raw = notice?.googleFormLink?.trim();
    if (!raw) {
      return;
    }

    const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        return;
      }
      await Linking.openURL(url);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={
            <Pressable
              onPress={() => router.back()}
              className="flex-row gap-2 items-center"
            >
              <Feather name="arrow-left" size={20} color="#3a3a3a" />
              <Text className="font-extrabold text-xl">돌아가기</Text>
            </Pressable>
          }
        />
      }
    >
      <View className="flex-1 flex-col bg-white border-[#B6B6B6] border-[1px] rounded-lg">
        {!hideImage && imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ height: 300, width: "100%" }}
            contentFit="cover"
            onError={() => setHideImage(true)}
          />
        ) : null}
        <Text className="text-base font-semibold text-text p-4">
          {notice?.notice}
        </Text>
      </View>

      <CompleteButton
        content={
          <View className="flex-row items-center gap-2 ">
            <Text className="font-bold text-xl text-[#B6B6B6]">
              구글폼 신청링크 바로가기
            </Text>
            <Feather name="arrow-right-circle" size={24} color="#B6B6B6" />
          </View>
        }
        onPress={handleNext}
        backgroundColor="#ffffff"
        textColor="#B6B6B6"
        borderColor="#B6B6B6"
        borderWidth={1}
      />
    </ParallaxScrollView>
  );
}
