import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    // 기존 2초 대기 후 이동 로직 (복구 시 이 블록을 사용하면됨.)
    const timeout = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);
    return () => clearTimeout(timeout);

    // 임시: 대기 없이 즉시 테스트 페이지로 이동
    //router.replace("/test");
  }, [router]);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="flex-row items-baseline justify-center">
        <Text className="text-tint text-3xl font-bold">컴</Text>
        <Text className="text-gray-500 text-3xl">퓨터공학부 학생이라면</Text>
      </View>

      <Text className="text-tint text-4xl font-bold my-2">&</Text>

      <Text className="text-gray-500 text-3xl text-center">
        놓치는 공지없이
      </Text>

      <View className="flex-row items-baseline justify-center">
        <Text className="text-gray-500 text-3xl">빠르게</Text>
        <Text className="text-tint text-3xl font-bold">체크</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
