import HeaderBar from "@/components/HeaderBar";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignupDone() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          paddingTop: 50,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <HeaderBar>
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text className="text-base font-semibold text-text mt-4">
              로그인
            </Text>
          </Pressable>
        </HeaderBar>
      </View>
      <View className="flex-1 flex-col bg-white p-4 items-center justify-center gap-20">
        <Image
          source={require("@/assets/images/logo-2x.png")}
          style={{ width: 128, height: 128 }}
        />
        <Text className="font-medium text-xl text-center">
          회원가입이 완료되었습니다{"\n"}학부 소식을 빠르게 받아보세요!
        </Text>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => router.push("/(tabs)/notice")} //임시 라우팅
        >
          <Text style={styles.font}>다음 단계로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0077ff",
    borderRadius: 8,
    padding: 12,
    margin: 20,
    width: "80%",
  },
  font: {
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});
