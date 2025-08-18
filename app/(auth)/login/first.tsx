import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

export default function LoginFirst() {
  const radioButtons: RadioButtonProps[] = [
    {
      id: "1",
      label: "학번이 있어요 ⭕ ",
      value: "hasStudentId",
      labelStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3a3a3a",
      },
    },
    {
      id: "2",
      label: "학번이 없어요 ❌ ",
      value: "noStudentId",
      labelStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3a3a3a",
      },
    },
  ];

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const onPressRadioButton = (id: string) => {
    setSelectedId(id);
    if (id === "1") {
      router.push("/(auth)/signup");
    } else {
      router.push("/(tabs)");
    }
  };

  return (
    <View className="flex-1 flex-col justify-center items-center bg-white">
      <Image
        source={require("@/assets/images/logo-2x.png")}
        style={{ width: 128, height: 128 }}
      />
      <View className="flex-col items-center justify-center gap-2 mb-8">
        <Text className="text-text font-semibold">안녕하세요 ooo님!{"\n"}</Text>
        <Text className="text-text font-semibold">
          Come&Check앱을 다운로드 해주셔서 감사합니다!{"\n"}
        </Text>
        <Text className="text-text font-semibold">
          학번 유무를 체크해주시면 {"\n"}바로 앱을 시작할 수 있어요!
        </Text>
      </View>
      <RadioGroup
        radioButtons={radioButtons}
        selectedId={selectedId}
        onPress={onPressRadioButton}
      />
    </View>
  );
}
