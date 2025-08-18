import HeaderBar from "@/components/HeaderBar";
import CompleteButton from "@/components/button/CompleteBtn";
import ShadowBox from "@/components/ui/ShadowBox";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useMyQuestions } from "@/mock/my/useMyQuestions";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Switch, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AnswerEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { questions } = useMyQuestions();
  const item = questions.find((q) => String(q.id) === String(id));

  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [answerContent, setAnswerContent] = useState<string>("");

  useEffect(() => {
    if (!item) return;
    setIsPublic(item.isPublic);
    setAnswerContent(item.answer?.content ?? "");
  }, [item]);

  const insets = useSafeAreaInsets();
  let bottom = 0;
  try {
    bottom = useBottomTabOverflow();
  } catch (e) {
    bottom = 0;
  }
  const floatingBottomOffset = bottom + insets.bottom + 12;

  const handleSubmit = () => {
    // TODO: 실제 답변 수정 API 연동
    Alert.alert("알림", "수정이 완료되었습니다.", [
      { text: "확인", onPress: () => router.push("/(tabs)/my/answer") },
    ]);
  };

  return (
    <View className="flex-1">
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
        {item ? (
          <View>
            <ShadowBox>
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-lg font-semibold"
                  style={{ color: "#1b1b1b" }}
                >
                  질문
                </Text>
                <Switch
                  value={isPublic}
                  onValueChange={setIsPublic}
                  trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
                  thumbColor={"#ffffff"}
                />
              </View>
              <Text className="text-base" style={{ color: "#3a3a3a" }}>
                {item.title}
              </Text>
            </ShadowBox>

            <View className="h-4" />

            <ShadowBox>
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-lg font-semibold"
                  style={{ color: "#1b1b1b" }}
                >
                  답변내용
                </Text>
                <Text className="text-xs" style={{ color: "#9ca3af" }}>
                  답변 날짜 : {item.answer?.answeredAt ?? item.createdAt}
                </Text>
              </View>
              <TextInput
                value={answerContent}
                onChangeText={setAnswerContent}
                placeholder="답변을 작성해주세요"
                multiline
                textAlignVertical="top"
                className="text-base"
                style={{ fontFamily: "Pretendard-Regular", minHeight: 300 }}
              />
            </ShadowBox>

            <View style={{ height: 140 }} />
          </View>
        ) : (
          <ShadowBox>
            <Text className="text-base" style={{ color: "#3a3a3a" }}>
              선택한 질문을 찾을 수 없어요.
            </Text>
          </ShadowBox>
        )}
      </ParallaxScrollView>

      <View
        className="px-4"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: floatingBottomOffset,
        }}
      >
        <CompleteButton
          content="수정완료"
          onPress={handleSubmit}
          backgroundColor="#0077ff"
          textColor="#ffffff"
        />
      </View>
    </View>
  );
}
