import CompleteButton from "@/components/button/CompleteBtn";
import HeaderBar from "@/components/HeaderBar";
import NormalScrollView from "@/components/view/NormalScrollView";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function DetailEventScreen() {
  const router = useRouter();
  const handleNext = () => {
    router.push("/(setting)"); //임시 라우팅
  };
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
              <Feather name="arrow-left" size={20} color="3a3a3a" />
              <Text className="font-extrabold text-xl">돌아가기</Text>
            </Pressable>
          }
        />
      }
    >
      <View className="flex-1 flex-col bg-white border-[#B6B6B6] border-[1px] rounded-lg">
        <Image
          source={require("@/assets/images/logo-2x.png")}
          style={{ flex: 1, height: 300, borderRadius: 8 }}
        />
        <Text className="text-base font-semibold text-text p-4">
          [한국외대 컴퓨터공학부 2학기 개강총회] 벌써 개강이 다가와 캠퍼스가
          북적북적해졌어요. 개 강한 컴공 학우분들을 만날 생각에 설레는 마음으로
          개총을 진행합니다! 😻 [1부] 📍일시: 9/10 (화) 18:00 📍장소: 공학관
          402호 [2부] 📍일시: 9/10 (화) 19:00 📍장소: 치킨마루 [참가비] 우리은행
          1002164860192 ✓ 과회비 낸 신입생: 무료 ✓ 과회비 안 낸 신입생: 25,000원
          ✓ 과회비 낸 재학생: 5,000원 ✓ 과회비 안 낸 20-22학번: 20,000원
          https://forms.gle/EcTcN3Gq9Pzzey9x6 구글폼을 통해 신청해 주세요.
        </Text>
      </View>

      <CompleteButton
        content={
          <View className="flex-row items-center gap-2 ">
            <Text className="font-bold text-xl text-[#B6B6B6]">
              구글폼 신청링크 바로가기
            </Text>
            <Feather name="arrow-right-circle" size={24} color="#B6B6B6" />
          </View>
        }
        onPress={handleNext}
        backgroundColor="#ffffff"
        textColor="#B6B6B6"
        borderColor="#B6B6B6"
        borderWidth={1}
      />
    </NormalScrollView>
  );
}
