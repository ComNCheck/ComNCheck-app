import HeaderBar from "@/components/HeaderBar";
import ShadowBox from "@/components/ui/ShadowBox";
import NormalScrollView from "@/components/view/NormalScrollView";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function MyWritingListDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

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
        <Text className="text-lg font-semibold" style={{ color: "#1b1b1b" }}>
          질문 상세
        </Text>
        <View className="h-3" />
        <Text className="text-base" style={{ color: "#3a3a3a" }}>
          선택한 질문(ID: {id})은 답변완료 상태로 수정할 수 없습니다.
        </Text>
      </ShadowBox>
    </NormalScrollView>
  );
}
