import HeaderBar from "@/components/HeaderBar";
import CompleteButton from "@/components/button/CompleteBtn";
import SubTitle from "@/components/title/SubTitle";
import ShadowBox from "@/components/ui/ShadowBox";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyWritingEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const insets = useSafeAreaInsets();
  let bottom = 0;
  try {
    bottom = useBottomTabOverflow();
  } catch (e) {
    bottom = 0;
  }
  const floatingBottomOffset = bottom + insets.bottom + 12;

  const handleSubmit = () => {
    // TODO: 실제 수정 API 연결
    router.back();
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
          >
            {/* <Pressable className="flex-row">
              <FontAwesome
                size={28}
                name="gear"
                color="#B6B6B6"
                onPress={() => router.push("/(setting)")}
              />
            </Pressable> */}
          </HeaderBar>
        }
      >
        <View>
          <SubTitle
            title="질문 수정하기"
            description="답변이 완료되기 전 질문들은 수정할 수 있어요.\n답변이 완료된 질문을 수정할 수 없어요."
          />
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
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="기간 내에 아직 행사 신청을 못했는데 지금도 신청 가능한가요?"
              multiline
              textAlignVertical="top"
              className="text-base"
              style={{
                fontFamily: "Pretendard-Regular",
                minHeight: 300,
              }}
            />
          </ShadowBox>

          <View style={{ height: 140 }} />
        </View>
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
