import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function Login() {
  const router = useRouter();
  return (
    <View className="flex-1 flex-col justify-center items-center bg-white">
      <Image
        source={require("@/assets/images/logo-2x.png")}
        className="w-32 h-32 rounded-xl"
        style={{ width: 128, height: 128 }}
      />
      <Text className="text-lg font-normal">한국외국어대학교</Text>
      <Text className="text-lg font-normal m-1">
        학교 계정으로 로그인해주세요!
      </Text>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => router.push("/(auth)/login/first")} //임시 라우팅
      >
        <Image
          source={require("@/assets/images/google.png")}
          style={{ width: 28, height: 28, marginRight: 10 }}
        />
        <Text style={styles.font}>Sign up with google</Text>
      </TouchableOpacity>
      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-[#B6B6B6] text-lg">
          아직 학교 계정이 없으신가요?
        </Text>
        <Text
          className="text-text font-semibold"
          onPress={() => router.push("/(tabs)")} //임시 라우팅
        >
          관리자에게 문의하기
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#white",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#B6B6B6",
    // 그림자 (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // 그림자 (Android)
    elevation: 8,
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  font: {
    fontWeight: "medium",
    fontSize: 20,
  },
});
