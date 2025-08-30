import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;
  const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID!;
  const ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID!;

  // 네이티브 빌드 시 안정적인 리다이렉트 URI 설정
  const ANDROID_SCHEME = `com.googleusercontent.apps.${ANDROID_CLIENT_ID.replace(".apps.googleusercontent.com", "")}`;
  const IOS_SCHEME = `com.googleusercontent.apps.${IOS_CLIENT_ID.replace(".apps.googleusercontent.com", "")}`;

  const redirectUri = AuthSession.makeRedirectUri({
    native: Platform.select({
      android: `${ANDROID_SCHEME}:/oauthredirect`,
      ios: `${IOS_SCHEME}:/oauthredirect`,
    }),
  });
  console.log("Redirect URI:", redirectUri);
  console.log("ANDROID_CLIENT_ID =", ANDROID_CLIENT_ID);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    redirectUri,
    scopes: ["profile", "email"],
    responseType: "code",
  });
  // 1) 버튼
  const onPressGoogle = async () => {
    console.log("[AUTH] redirectUri =", redirectUri);
    console.log("[AUTH] authUrl =", request?.url);
    try {
      const res = await promptAsync();
      console.log("[AUTH] promptAsync:", JSON.stringify(res, null, 2));
    } catch (e) {
      console.log("[AUTH] promptAsync error:", e);
    }
  };

  // 2) 딥링크 로거
  useEffect(() => {
    const sub = Linking.addEventListener("url", (e) => {
      console.log("[DEEP_LINK]", e.url);
    });
    return () => sub.remove();
  }, []);

  // 3) 응답 로거
  useEffect(() => {
    if (!response) return;
    console.log("[AUTH] response RAW:", JSON.stringify(response, null, 2));
    if (response.type === "success") {
      const { code } = response.params as { code: string };
      console.log("✅ CODE:", code);
    } else {
      console.log("ℹ️ type:", response.type, response.error);
    }
  }, [response]);

  const sendCodeToBackend = async (code: string) => {
    try {
      const backendUrl = "https://www.comncheck.com";
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, redirectUri }),
      });

      const data = await response.json();

      if (data.success) {
        // 인증 성공 후, 백엔드에서 받은 토큰 등을 처리
        console.log("Login successful!", data);
        // await AsyncStorage.setItem('userToken', data.token);
        router.push("/(auth)/login/first");
      } else {
        console.error("Backend login failed:", data.message);
      }
    } catch (error) {
      console.error("Error communicating with backend:", error);
    }
  };

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
        disabled={!request}
        onPress={onPressGoogle}
        //onPress={() => router.push("/(auth)/login/first")} //임시 라우팅
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
    fontWeight: "500",
    fontSize: 20,
    color: "#1F1F1F",
  },
});
