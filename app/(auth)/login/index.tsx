import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function Login() {
  const router = useRouter();
  const handlePress = async () => {
    const url = "https://www.instagram.com/comncheck"; // 연결하려는 웹사이트 URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };
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
        <Text className="text-text font-semibold" onPress={handlePress}>
          관리자에게 문의하기
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#747775",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  font: {
    fontWeight: "medium",
    fontSize: 20,
    color: "#1F1F1F",
  },
});
