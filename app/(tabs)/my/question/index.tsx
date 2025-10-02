import { createQuestion } from "@/app/apis/question";
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
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const bottom = useBottomTabOverflow();
  const floatingBottomOffset = bottom + insets.bottom + 12; // 버튼을 탭바 위로 띄우기 위한 오프셋

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("알림", "질문을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      await createQuestion({
        title: title.trim(),
        shared: isPublic,
      });

      Alert.alert("알림", "작성 완료되었습니다.", [
        { text: "확인", onPress: () => router.push("/(tabs)/my/writingCheck") },
      ]);
    } catch (error) {
      console.error("질문 작성 중 오류 발생:", error);
      Alert.alert(
        "오류",
        "질문 작성 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
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
              value={title}
              onChangeText={setTitle}
              placeholder="질문을 입력해주세요"
              multiline
              textAlignVertical="top"
              className="text-base min-h-[300px] font-pretendard border border-gray-200 rounded-lg px-3 py-2"
            />
          </ShadowBox>

          {/* 버튼과 겹치지 않도록 여유 공간 추가 */}
          <View className="h-[140px]" />
        </View>
      </ParallaxScrollView>

      {/* 바텀 영역 - 탭 바 위로 떠 있게 절대 배치 */}
      <BottomAbsolute bottom={floatingBottomOffset} className="px-4">
        <CompleteButton
          content={isLoading ? "작성중..." : "작성완료"}
          onPress={handleSubmit}
          backgroundColor={isLoading ? "#9ca3af" : "#0077ff"}
          textColor="#ffffff"
          disabled={isLoading}
        />
      </BottomAbsolute>
    </View>
  );
}
