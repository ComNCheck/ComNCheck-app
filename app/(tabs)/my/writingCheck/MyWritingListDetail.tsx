import HeaderBar from "@/components/HeaderBar";
import ShadowBox from "@/components/ui/ShadowBox";
import NormalScrollView from "@/components/view/NormalScrollView";
import { useMyQuestions } from "@/mock/my/useMyQuestions";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";

export default function MyWritingListDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { questions } = useMyQuestions();
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const item = questions.find((q) => String(q.id) === String(id));

  useEffect(() => {
    if (item) setIsPublic(item.isPublic);
  }, [item]);

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
      {item ? (
        <>
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
            <Text className="text-base" style={{ color: "#3a3a3a" }}>
              {item.answer?.content ?? "아직 답변이 등록되지 않았습니다."}
            </Text>
          </ShadowBox>
        </>
      ) : (
        <ShadowBox>
          <Text className="text-base" style={{ color: "#3a3a3a" }}>
            선택한 질문을 찾을 수 없어요.
          </Text>
        </ShadowBox>
      )}
    </NormalScrollView>
  );
}
