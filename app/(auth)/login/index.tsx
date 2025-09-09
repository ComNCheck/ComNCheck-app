import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert, // Alert 컴포넌트 추가
  Linking,
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

      setIsLoading(true); // 로그인 절차 시작 시 로딩 상태 활성화
      const res = await promptAsync();
      console.log("[AUTH] promptAsync result.type:", res.type);
      const p = (res as any)?.params as Record<string, string> | undefined;

      if (res.type === "success" && p?.code) {
        console.log("✅ [AUTH] CODE (from promptAsync):", p.code);

        try {
          const payload = { authorizationCode: p.code };
          console.log(
            "🟡 [API] 인가 코드를 서버에 전송합니다. 전송 데이터:",
            payload
          );
          // 서버로 인가 코드 전송
          const tokens = await memberLoginByBody({ authorizationCode: p.code });

          // TODO: 받은 토큰을 AsyncStorage 등에 저장하는 로직 추가
          console.log("⭐ [AUTH] 서버로부터 받은 토큰:", tokens);

          // API 연결 성공 시 콘솔 로그가 출력되도록 잠시 대기
          await new Promise((resolve) => setTimeout(resolve, 100));

          // 다음 화면으로 이동
          router.replace("/login/first");
        } catch (apiError) {
          console.log("❌ [API] 서버 통신 오류:", apiError);
          Alert.alert("로그인 실패", "서버와 통신하는 중 문제가 발생했습니다.");
        }
      } else if (res.type !== "success") {
        console.log("ℹ️ [AUTH] non-success:", res.type, p?.error ?? "");
      }
    } catch (e) {
      console.log("[AUTH] promptAsync or general error:", e);
    } finally {
      setIsLoading(false); // 로그인 절차 완료 시 로딩 상태 비활성화
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
