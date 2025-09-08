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

WebBrowser.maybeCompleteAuthSession(); // 앱 시작 시 1회

export default function Login() {
  const router = useRouter();
  const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;
  const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID!;
  const ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID!;

  // 네이티브 리디렉트 URI (구글 전용 스킴)
  const ANDROID_SCHEME = `com.googleusercontent.apps.${ANDROID_CLIENT_ID.replace(".apps.googleusercontent.com", "")}`;
  const IOS_SCHEME = `com.googleusercontent.apps.${IOS_CLIENT_ID.replace(".apps.googleusercontent.com", "")}`;
  const redirectUri = AuthSession.makeRedirectUri({
    native: Platform.select({
      android: `${ANDROID_SCHEME}:/oauthredirect`,
      ios: `${IOS_SCHEME}:/oauthredirect`,
    }),
  });

  console.log("[AUTH] redirectUri:", redirectUri);
  console.log("[AUTH] androidClientId:", ANDROID_CLIENT_ID);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    redirectUri,
    scopes: ["openid", "email", "profile"],
    responseType: "code",
  });

  const onPressGoogle = async () => {
    console.log("[AUTH] start → redirectUri =", redirectUri);
    try {
      // 👉 디버그용 전역 저장 (리다이렉트 화면에서 꺼내 쓰기)
      (globalThis as any).__pkce = request?.codeVerifier ?? "";
      (globalThis as any).__redirectUri = redirectUri;
      (globalThis as any).__clientId =
        Platform.select({
          android: ANDROID_CLIENT_ID,
          ios: IOS_CLIENT_ID,
          default: GOOGLE_CLIENT_ID,
        }) ?? "";

      const res = await promptAsync();
      console.log("[AUTH] promptAsync result.type:", res.type);
      const p = (res as any)?.params as Record<string, string> | undefined;
      if (res.type === "success" && p?.code) {
        console.log("✅ [AUTH] CODE (from promptAsync):", p.code);
      } else if (res.type !== "success") {
        console.log("ℹ️ [AUTH] non-success:", res.type, p?.error ?? "");
      }
    } catch (e) {
      console.log("[AUTH] promptAsync error:", e);
    }
  };

  // (참고) 이벤트 로깅만 유지
  useEffect(() => {
    const sub = Linking.addEventListener("url", (e) => {
      console.log("[DEEP_LINK event]", e.url);
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    (async () => {
      const initial = await Linking.getInitialURL();
      console.log("[DEEP_LINK initialURL]", initial ?? "(none)");
    })();
  }, []);

  // (선택) 표준 경로도 유지
  useEffect(() => {
    if (!response) return;
    console.log("[AUTH] response.type:", response.type);
    const p = (response as any)?.params as Record<string, string> | undefined;
    if (response.type === "success" && p?.code) {
      console.log("✅ [AUTH] CODE (from response):", p.code);
    }
  }, [response]);

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
      >
        <Image
          source={require("@/assets/images/google.png")}
          style={{ width: 28, height: 28, marginRight: 10 }}
        />
        <Text style={styles.font}>Sign up with Google</Text>
      </TouchableOpacity>
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
  font: { fontWeight: "500", fontSize: 20, color: "#1F1F1F" },
});
