import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootIndex() {
  const router = useRouter();

  useEffect(() => {
    // 즉시 스플래시 화면으로 이동
    router.replace("./splash");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <ActivityIndicator size="large" color="#0077ff" />
    </View>
  );
}
