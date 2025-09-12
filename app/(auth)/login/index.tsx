import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 새로 생성한 API 파일을 임포트합니다.
import { memberLoginByBody } from "@/app/apis/auth";

WebBrowser.maybeCompleteAuthSession(); // 앱 시작 시 1회

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
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

  //console.log("[AUTH] redirectUri:", redirectUri);
  console.log(
    "[AUTH] redirectUri for this platform:",
    Platform.OS === "ios" ? redirectUri : "(Not used for Android Native Auth)"
  );
  console.log("[AUTH] androidClientId:", ANDROID_CLIENT_ID);

  // 변경 포인트만 발췌 (code 플로우 기준)
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_CLIENT_ID!,
    iosClientId: IOS_CLIENT_ID!,
    androidClientId: ANDROID_CLIENT_ID!,
    redirectUri,
    scopes: ["openid", "email", "profile"],
    responseType: "code",
  });

  const onPressGoogle = async () => {
    console.log("[AUTH] start → redirectUri =", redirectUri);
    try {
      if (!request) {
        console.log("❌ [AUTH] request not ready");
        return;
      }
      setIsLoading(true);

      const res = await promptAsync();
      console.log("[AUTH] promptAsync result.type:", res.type);

      const p = (res as any)?.params as Record<string, string> | undefined;

      if (p?.code) {
        console.log("✅ [AUTH] CODE(from prompt):", p.code);
        const tokens = await memberLoginByBody({ authorizationCode: p.code });
        console.log("⭐ [AUTH] server tokens:", tokens);
        router.replace("/login/first");
      } else if (p?.error) {
        console.log(
          "❌ [AUTH] error(from prompt):",
          p.error,
          p.error_description ?? ""
        );
      } else {
        console.log("ℹ️ [AUTH] promptAsync params empty");
      }
    } catch (e) {
      console.log("❌ [AUTH] promptAsync throw:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // 보조 로깅: 일부 환경에선 response로 들어오기도 함
  useEffect(() => {
    if (!response) return;
    console.log("[AUTH] response.type:", response.type);
    const p = (response as any)?.params as Record<string, string> | undefined;

    if (p?.code) console.log("✅ [AUTH] CODE(from response):", p.code);
    if (p?.error)
      console.log(
        "❌ [AUTH] error(from response):",
        p.error,
        p.error_description ?? ""
      );
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
        disabled={!request || isLoading} // 로딩 중일 때 버튼 비활성화
        onPress={onPressGoogle}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#1F1F1F" />
        ) : (
          <>
            <Image
              source={require("@/assets/images/google.png")}
              style={{ width: 28, height: 28, marginRight: 10 }}
            />
            <Text style={styles.font}>Sign up with Google</Text>
          </>
        )}
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
