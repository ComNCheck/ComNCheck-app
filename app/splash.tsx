import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);
    return () => clearTimeout(timeout);
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
