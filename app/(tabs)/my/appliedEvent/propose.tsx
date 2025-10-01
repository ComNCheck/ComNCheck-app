import { createSuggestedEvent } from "@/app/apis/suggestedEvent";
import CompleteButton from "@/components/button/CompleteBtn";
import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import BottomAbsolute from "@/components/ui/BottomAbsolute";
import ShadowBox from "@/components/ui/ShadowBox";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProposeEventScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomTabOverflow();
  const floatingBottomOffset = bottom + insets.bottom + 12;

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [messageToCouncil, setMessageToCouncil] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // 유효성 검사
    if (!eventName.trim()) {
      Alert.alert("입력 오류", "행사명을 입력해주세요.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("입력 오류", "행사 소개를 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createSuggestedEvent({
        eventName: eventName.trim(),
        description: description.trim(),
        messageToCouncil: messageToCouncil.trim() || undefined,
      });

      Alert.alert("신청 완료", "제안이 접수되었습니다.", [
        {
          text: "확인",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error("Failed to create suggested event:", error);
      Alert.alert("오류", "행사 제안에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <HeaderBar
        backgroundColor="#fafafa"
        left={
          <View className="flex-row items-center">
            <Pressable onPress={() => router.back()} className="mr-2">
              <MaterialCommunityIcons
                name="arrow-left"
                size={22}
                color="#111827"
              />
            </Pressable>
            <Text className="text-xl font-bold text-text">돌아가기</Text>
          </View>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 100,
          }}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyboardDismissMode="on-drag"
          bounces={false}
        >
          <SubTitle
            title="내가 쓴 행사"
            description={`내가 원하는 행사를 등록할 수 있어요.\\n투표를 통해 올라간 행사는 학생회 논의를 통해\\n실제 과행사로 만들어질 수 있어요!`}
          />

          <View className="gap-3 mb-6">
            <Text className="text-lg font-black">행사명</Text>
            <ShadowBox>
              <TextInput
                placeholder="행사 종류를 입력해주세요"
                className="border-[#FAFAFA] border-[0.5px] text-[#A6A6A6] rounded-lg p-1"
                value={eventName}
                onChangeText={setEventName}
                editable={!isSubmitting}
              />
            </ShadowBox>
          </View>

          <View className="gap-3 mb-6">
            <Text className="text-lg font-black">행사 소개</Text>
            <ShadowBox>
              <TextInput
                placeholder="어떤 방식의 행사인지 소개해주세요"
                className="border-[#FAFAFA] border-[0.5px] text-[#A6A6A6] rounded-lg h-40"
                style={{ textAlignVertical: "top", padding: 8 }}
                multiline
                scrollEnabled={false}
                value={description}
                onChangeText={setDescription}
                editable={!isSubmitting}
              />
            </ShadowBox>
          </View>

          <View className="gap-3 mb-10">
            <Text className="text-lg font-black">학생회에게 한마디</Text>
            <ShadowBox>
              <TextInput
                placeholder="추가적으로 하고 싶은말이 있다면 적어주세요"
                className="border-[#FAFAFA] border-[0.5px] text-[#A6A6A6] rounded-lg h-40"
                style={{ textAlignVertical: "top", padding: 8 }}
                multiline
                scrollEnabled={false}
                value={messageToCouncil}
                onChangeText={setMessageToCouncil}
                editable={!isSubmitting}
              />
            </ShadowBox>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomAbsolute bottom={floatingBottomOffset} className="px-4">
        <CompleteButton
          content={isSubmitting ? "제출 중..." : "신청하기"}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </BottomAbsolute>
    </View>
  );
}
