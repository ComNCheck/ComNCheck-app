import HeaderBar from "@/components/HeaderBar";
import CompleteButton from "@/components/button/CompleteBtn";
import SubTitle from "@/components/title/SubTitle";
import AppSwitch from "@/components/ui/AppSwitch";
import BottomAbsolute from "@/components/ui/BottomAbsolute";
import ShadowBox from "@/components/ui/ShadowBox";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function QuestionScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const insets = useSafeAreaInsets();
  let bottom = 0;
  try {
    bottom = useBottomTabOverflow();
  } catch (e) {
    bottom = 0;
  }
  const floatingBottomOffset = bottom + insets.bottom + 12; // 버튼을 탭바 위로 띄우기 위한 오프셋

  const handleSubmit = () => {
    // TODO: 실제 질문 제출 API 호출
    Alert.alert("알림", "작성 완료되었습니다.", [
      { text: "확인", onPress: () => router.push("/(tabs)/my/writingCheck") },
    ]);
  };

  return (
    <View className="flex-1">
      <ParallaxScrollView
        headerBar={
          <HeaderBar
            backgroundColor="#fafafa"
            left={<Text className="text-3xl font-extrabold">MY</Text>}
          >
            <Pressable className="flex-row">
              <FontAwesome
                size={28}
                name="gear"
                color="#B6B6B6"
                onPress={() => router.push("/(setting)")}
              />
            </Pressable>
          </HeaderBar>
        }
      >
        <View>
          <SubTitle
            title="질문하기"
            description="학과와 관련된 궁금한 점을 마음껏 질문해주세요!"
          />

          <ShadowBox>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-xl font-semibold text-[#1b1b1b]">질문</Text>
              <AppSwitch
                value={isPublic}
                onValueChange={setIsPublic}
                trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
                thumbColor={"#ffffff"}
              />
            </View>
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="기간 내에 아직 행사 신청을 못했는데 지금도 신청 가능한가요?"
              multiline
              textAlignVertical="top"
              className="text-base min-h-[300px] font-pretendard"
            />
          </ShadowBox>

          {/* 버튼과 겹치지 않도록 여유 공간 추가 */}
          <View className="h-[140px]" />
        </View>
      </ParallaxScrollView>

      {/* 바텀 영역 - 탭 바 위로 떠 있게 절대 배치 */}
      <BottomAbsolute bottom={floatingBottomOffset} className="px-4">
        <CompleteButton
          content="작성완료"
          onPress={handleSubmit}
          backgroundColor="#0077ff"
          textColor="#ffffff"
        />
      </BottomAbsolute>
    </View>
  );
}
