import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // 2초 후에 로그인 화면으로 이동합니다.
    const timeout = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-3xl">
        <Text className="text-tint font-bold">컴</Text>
        <Text className="text-gray-500">퓨터공학부 학생이라면</Text>
      </Text>

      <Text className="text-tint text-4xl font-bold my-2">&</Text>

      <Text className="text-gray-500 text-3xl text-center">
        놓치는 공지없이
      </Text>
      <Text className="text-3xl">
        <Text className="text-gray-500">빠르게</Text>
        <Text className="text-tint font-bold"> 체크</Text>
      </Text>
    </View>
  );
};

export default Index;
