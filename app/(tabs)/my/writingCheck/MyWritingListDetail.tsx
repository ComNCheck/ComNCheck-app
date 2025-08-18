import HeaderBar from "@/components/HeaderBar";
import ShadowBox from "@/components/ui/ShadowBox";
import NormalScrollView from "@/components/view/NormalScrollView";
import { useMyQuestions } from "@/mock/my/useMyQuestions";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Switch, Text, View } from "react-native";

export default function MyWritingListDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { questions } = useMyQuestions();
  const item = questions.find((q) => String(q.id) === String(id));

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
                value={true}
                disabled
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
                답변 날짜 : {item.createdAt}
              </Text>
            </View>
            <Text className="text-base" style={{ color: "#3a3a3a" }}>
              저번 구글폼 을 통해 참여자를 받았었는데, 예산문제로 더이상 추가
              모집은 없습니다. 감사합니다.
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
