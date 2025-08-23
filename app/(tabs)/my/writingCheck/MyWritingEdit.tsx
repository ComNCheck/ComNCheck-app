import HeaderBar from "@/components/HeaderBar";
import CompleteButton from "@/components/button/CompleteBtn";
import SubTitle from "@/components/title/SubTitle";
import AppSwitch from "@/components/ui/AppSwitch";
import BottomAbsolute from "@/components/ui/BottomAbsolute";
import ShadowBox from "@/components/ui/ShadowBox";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useMyQuestions } from "@/mock/my/useMyQuestions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyWritingEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { questions } = useMyQuestions();
  const item = questions.find((q) => String(q.id) === String(id));

  useEffect(() => {
    if (item) {
      setContent(item.title);
      setIsPublic(item.isPublic);
    }
  }, [item]);
  const insets = useSafeAreaInsets();
  const bottom = useBottomTabOverflow();
  const floatingBottomOffset = bottom + insets.bottom + 12;

  const handleSubmit = () => {
    // TODO: 실제 수정 API 연결
    Alert.alert("알림", "질문이 수정되었습니다.", [
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
          ></HeaderBar>
        }
      >
        <View>
          <SubTitle
            title="질문 수정하기"
            description="답변이 완료되기 전 질문들은 수정할 수 있어요.\n답변이 완료된 질문을 수정할 수 없어요."
          />
          <ShadowBox>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-semibold text-[#1b1b1b]">질문</Text>
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

          <View className="h-[140px]" />
        </View>
      </ParallaxScrollView>

      <BottomAbsolute bottom={floatingBottomOffset} className="px-4">
        <CompleteButton
          content="수정완료"
          onPress={handleSubmit}
          backgroundColor="#0077ff"
          textColor="#ffffff"
        />
      </BottomAbsolute>
    </View>
  );
}
