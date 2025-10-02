import { updateAnswer } from "@/app/apis/answer";
import { getQuestion } from "@/app/apis/question";
import { QuestionResponseDTO } from "@/app/apis/question.type";
import HeaderBar from "@/components/HeaderBar";
import CompleteButton from "@/components/button/CompleteBtn";
import BottomAbsolute from "@/components/ui/BottomAbsolute";
import ShadowBox from "@/components/ui/ShadowBox";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AnswerEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<QuestionResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answerContent, setAnswerContent] = useState<string>("");

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getQuestion(Number(id));
        setItem(data);
        setAnswerContent(data.answer?.content ?? "");
      } catch (error) {
        console.error("질문 조회 실패:", error);
        Alert.alert("오류", "질문을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const insets = useSafeAreaInsets();
  const bottom = useBottomTabOverflow();
  const floatingBottomOffset = bottom + insets.bottom + 12;

  const handleSubmit = async () => {
    if (!answerContent.trim()) {
      Alert.alert("알림", "답변 내용을 입력해주세요.");
      return;
    }

    if (!item || !item.answer) {
      Alert.alert("오류", "답변 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      setSubmitting(true);
      await updateAnswer(item.answer.answerId, {
        content: answerContent.trim(),
      });

      Alert.alert("알림", "수정이 완료되었습니다.", [
        { text: "확인", onPress: () => router.push("/(tabs)/my/answer") },
      ]);
    } catch (error) {
      console.error("답변 수정 실패:", error);
      Alert.alert("오류", "답변 수정에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
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
        {loading ? (
          <View className="py-10 items-center">
            <ActivityIndicator size="large" color="#0077ff" />
            <Text className="mt-2 text-gray-500">질문을 불러오는 중...</Text>
          </View>
        ) : item ? (
          <View>
            <ShadowBox>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg font-semibold text-[#1b1b1b]">
                  질문
                </Text>
              </View>
              <Text className="text-base text-text">{item.title}</Text>
            </ShadowBox>

            <View className="h-4" />

            <ShadowBox>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg font-semibold text-[#1b1b1b]">
                  답변내용
                </Text>
                <Text className="text-xs text-[#9ca3af]">
                  답변 날짜 : {item.answer?.createdAt ?? item.createdAt}
                </Text>
              </View>
              <TextInput
                value={answerContent}
                onChangeText={setAnswerContent}
                placeholder="답변을 작성해주세요"
                multiline
                textAlignVertical="top"
                className="text-base min-h-[300px] font-pretendard"
                editable={!submitting}
              />
            </ShadowBox>

            <View className="h-[140px]" />
          </View>
        ) : (
          <ShadowBox>
            <Text className="text-base text-text">
              선택한 질문을 찾을 수 없어요.
            </Text>
          </ShadowBox>
        )}
      </ParallaxScrollView>

      <BottomAbsolute bottom={floatingBottomOffset} className="px-4">
        <CompleteButton
          content={submitting ? "수정 중..." : "수정완료"}
          onPress={handleSubmit}
          backgroundColor={submitting ? "#9ca3af" : "#0077ff"}
          textColor="#ffffff"
          disabled={submitting}
        />
      </BottomAbsolute>
    </View>
  );
}
