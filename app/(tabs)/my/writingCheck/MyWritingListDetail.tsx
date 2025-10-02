import HeaderBar from "@/components/HeaderBar";
import AppSwitch from "@/components/ui/AppSwitch";
import ShadowBox from "@/components/ui/ShadowBox";
import NormalScrollView from "@/components/view/NormalScrollView";
import { useQuestion } from "@/hooks/useQuestion";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function MyWritingListDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const questionId = id ? parseInt(id, 10) : null;
  const { question, loading, error } = useQuestion(questionId);
  const [isPublic, setIsPublic] = useState<boolean>(true);

  useEffect(() => {
    if (question) setIsPublic(question.shared);
  }, [question]);

  if (loading) {
    return (
      <NormalScrollView
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
        <View className="flex-1 justify-center items-center py-20">
          <ActivityIndicator size="large" color="#007AFF" />
          <Text className="text-gray-500 mt-4">질문을 불러오는 중...</Text>
        </View>
      </NormalScrollView>
    );
  }

  if (error || !question) {
    return (
      <NormalScrollView
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
        <ShadowBox>
          <Text className="text-base text-text">
            {error || "선택한 질문을 찾을 수 없어요."}
          </Text>
        </ShadowBox>
      </NormalScrollView>
    );
  }

  return (
    <NormalScrollView
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
        <Text className="text-base text-text mb-2">{question.title}</Text>
        {question.content && (
          <Text className="text-sm text-gray-500 mb-2">
            질문 내용: {question.content}
          </Text>
        )}
        <Text className="text-xs text-gray-400">
          작성일: {new Date(question.createdAt).toLocaleDateString("ko-KR")}
        </Text>
      </ShadowBox>

      <ShadowBox>
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-semibold text-[#1b1b1b]">답변내용</Text>
          {question.answer && (
            <Text className="text-xs text-[#9ca3af]">
              답변 날짜:{" "}
              {new Date(question.answer.createdAt).toLocaleDateString("ko-KR")}
            </Text>
          )}
        </View>
        <Text className="text-base text-text">
          {question.answer?.content ?? "아직 답변이 등록되지 않았습니다."}
        </Text>
      </ShadowBox>
    </NormalScrollView>
  );
}
