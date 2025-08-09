import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function MyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 20 }}>MY Screen</Text>
      <Button
        title="로그인 화면으로 이동"
        onPress={() => router.push("/(auth)/login")}
      />
      <View style={{ height: 16 }} />
      <Button
        title="회원가입 화면으로 이동"
        onPress={() => router.push("/(auth)/signup")}
      />
    </View>
  );
}
