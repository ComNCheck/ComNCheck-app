import { updateQuestion } from "@/app/apis/question";
import HeaderBar from "@/components/HeaderBar";
import CompleteButton from "@/components/button/CompleteBtn";
import SubTitle from "@/components/title/SubTitle";
import AppSwitch from "@/components/ui/AppSwitch";
import BottomAbsolute from "@/components/ui/BottomAbsolute";
import ShadowBox from "@/components/ui/ShadowBox";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useQuestion } from "@/hooks/useQuestion";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyWritingEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const questionId = id ? parseInt(id, 10) : null;
  const { question, loading, error } = useQuestion(questionId);
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const insets = useSafeAreaInsets();
  const bottom = useBottomTabOverflow();
  const floatingBottomOffset = bottom + insets.bottom + 12;

  useEffect(() => {
    if (question) {
      setContent(question.title);
      setIsPublic(question.shared);
    }
  }, [question]);

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert("알림", "질문을 입력해주세요.");
      return;
    }

    if (!questionId) {
      Alert.alert("오류", "질문을 찾을 수 없습니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateQuestion(questionId, {
        title: content.trim(),
        shared: isPublic,
      });

      Alert.alert("알림", "질문이 수정되었습니다.", [
        { text: "확인", onPress: () => router.push("/(tabs)/my/writingCheck") },
      ]);
    } catch (error) {
      console.error("질문 수정 중 오류 발생:", error);
      Alert.alert(
        "오류",
        "질문 수정 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1">
        <ParallaxScrollView
          headerBar={
            <HeaderBar
              backgroundColor="#fafafa"
              left={<Text className="text-3xl font-extrabold">MY</Text>}
            />
          }
        >
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#007AFF" />
            <Text className="text-gray-500 mt-4">질문을 불러오는 중...</Text>
          </View>
        </ParallaxScrollView>
      </View>
    );
  }

  if (error || !question) {
    return (
      <View className="flex-1">
        <ParallaxScrollView
          headerBar={
            <HeaderBar
              backgroundColor="#fafafa"
              left={<Text className="text-3xl font-extrabold">MY</Text>}
            />
          }
        >
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-red-500 text-center">
              오류가 발생했습니다
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              {error || "질문을 찾을 수 없습니다."}
            </Text>
          </View>
        </ParallaxScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ParallaxScrollView
        headerBar={
          <HeaderBar
            backgroundColor="#fafafa"
            left={<Text className="text-3xl font-extrabold">MY</Text>}
          />
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
              placeholder="질문을 입력해주세요"
              multiline
              textAlignVertical="top"
              className="text-base min-h-[300px] font-pretendard border border-gray-200 rounded-lg px-3 py-2"
            />
          </ShadowBox>

          <View className="h-[140px]" />
        </View>
      </ParallaxScrollView>

      <BottomAbsolute bottom={floatingBottomOffset} className="px-4">
        <CompleteButton
          content={isSubmitting ? "수정중..." : "수정완료"}
          onPress={handleSubmit}
          backgroundColor={isSubmitting ? "#9ca3af" : "#0077ff"}
          textColor="#ffffff"
          disabled={isSubmitting}
        />
      </BottomAbsolute>
    </View>
  );
}
