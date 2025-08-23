import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

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
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-tint text-4xl font-bold mb-6">MyApp</Text>
      <ActivityIndicator size="large" color="#0077FF" />
      <Text className="text-gray-500 mt-4">Loading...</Text>
    </View>
  );
};

export default SplashScreen;
