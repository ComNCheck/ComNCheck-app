import CompleteButton from "@/components/button/CompleteBtn";
import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import ShadowBox from "@/components/ui/ShadowBox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProposeEventScreen() {
  const router = useRouter();

  const handleSubmit = () => {
    Alert.alert("신청하기", "제안이 접수되었습니다.");
    router.back();
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

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 100,
        }}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
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
            />
          </ShadowBox>
        </View>

        <View className="gap-3 mb-6">
          <Text className="text-lg font-black">행사 소개</Text>
          <ShadowBox>
            <TextInput
              placeholder="어떤 방식의 행사인지 소개해주세요"
              className="border-[#FAFAFA] border-[0.5px] text-[#A6A6A6] rounded-lg h-40"
              style={{ textAlignVertical: "top" }}
              multiline
            />
          </ShadowBox>
        </View>

        <View className="gap-3 mb-10">
          <Text className="text-lg font-black">학생회에게 한마디</Text>
          <ShadowBox>
            <TextInput
              placeholder="추가적으로 하고 싶은말이 있다면 적어주세요"
              className="border-[#FAFAFA] border-[0.5px] text-[#A6A6A6] rounded-lg h-40"
              style={{ textAlignVertical: "top" }}
              multiline
            />
          </ShadowBox>
        </View>

        <CompleteButton content="신청하기" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}
