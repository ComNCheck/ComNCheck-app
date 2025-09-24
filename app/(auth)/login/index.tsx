import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getMemberData } from "@/app/apis/auth";
import { authService } from "@/app/services/authService";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
  const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID;

  useEffect(() => {
    const config: any = {};

    if (Platform.OS === "ios") {
      // iOS의 경우 iosClientId 사용
      if (IOS_CLIENT_ID) {
        config.iosClientId = IOS_CLIENT_ID;
        console.log("✅ [AUTH] iOS Client ID 설정됨");
      } else {
        console.warn("⚠️ [AUTH] iOS_CLIENT_ID가 설정되지 않았습니다.");
        return;
      }
    } else {
      // Android/Web의 경우 webClientId 사용
      if (WEB_CLIENT_ID) {
        config.webClientId = WEB_CLIENT_ID;
        console.log("✅ [AUTH] Web Client ID 설정됨");
      } else {
        console.warn("⚠️ [AUTH] WEB_CLIENT_ID가 설정되지 않았습니다.");
        return;
      }
    }

    GoogleSignin.configure(config);
    console.log("✅ [AUTH] Google Sign-in configured for", Platform.OS, config);
  }, [WEB_CLIENT_ID, IOS_CLIENT_ID]);

  const onPressGoogle = async () => {
    try {
      setIsLoading(true);

      // 플랫폼별 클라이언트 ID 확인
      if (Platform.OS === "ios" && !IOS_CLIENT_ID) {
        Alert.alert(
          "설정 오류",
          "iOS Google 로그인을 위한 환경 변수가 설정되지 않았습니다."
        );
        return;
      } else if (Platform.OS !== "ios" && !WEB_CLIENT_ID) {
        Alert.alert(
          "설정 오류",
          "Google 로그인을 위한 환경 변수가 설정되지 않았습니다."
        );
        return;
      }

      if (Platform.OS === "android") {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      //await GoogleSignin.signOut();
      const result = await GoogleSignin.signIn();
      if (!isSuccessResponse(result)) {
        console.log("ℹ️ [AUTH] sign-in cancelled or no account selected");
        return;
      }

      const { idToken } = await GoogleSignin.getTokens();
      if (!idToken) {
        console.log(
          "❌ [AUTH] idToken empty. Check webClientId & console configs."
        );
        return;
      }
      if (__DEV__) {
        console.log("✅ [AUTH] ID TOKEN:", idToken.slice(0, 32) + "...");
        console.log("[AUTH] before call");
      }

      console.log("🔄 [AUTH] 서버 로그인 시작...");
      console.log("🔍 [DEBUG] API Base URL:", process.env.EXPO_PUBLIC_API_BASE_URL);
      console.log("🔍 [DEBUG] ID Token (first 50 chars):", idToken.substring(0, 50));
      
      await authService.loginWithIdToken({ idToken });
      console.log("✅ [AUTH] 서버 로그인 성공");

      console.log("🔄 [AUTH] 사용자 정보 조회 시작...");
      const memberResponse = await getMemberData();
      const userName = memberResponse.data.name;
      console.log(`✅ [MEMBER] 사용자 이름: ${userName}`);

      router.replace(`/(auth)/login/first?name=${userName}` as Href);
    } catch (e: any) {
      console.error("❌ [AUTH] 로그인 오류:", e);

      let errorMessage = "구글 로그인 중 오류가 발생했습니다.";

      if (e?.response) {
        // 서버 응답 오류
        const status = e.response.status;
        const data = e.response.data;
        console.error("❌ [AUTH] 서버 응답 오류:", status, data);

        if (status === 404) {
          errorMessage = "서버에 연결할 수 없습니다. 관리자에게 문의하세요.";
        } else if (status === 401) {
          errorMessage = "인증에 실패했습니다. 다시 시도해주세요.";
        } else {
          errorMessage = `서버 오류 (${status}): ${data?.message || "알 수 없는 오류"}`;
        }
      } else if (e?.request) {
        // 네트워크 오류
        console.error("❌ [AUTH] 네트워크 오류:", e.request);
        errorMessage =
          "네트워크 연결을 확인해주세요. 인터넷 연결이 불안정할 수 있습니다.";
      } else if (e?.code) {
        // Google Sign-in 자체 오류
        console.error("❌ [AUTH] Google Sign-in 오류:", e.code, e.message);
        if (e.code === "SIGN_IN_CANCELLED") {
          return; // 사용자가 취소한 경우 알림 표시하지 않음
        }
        errorMessage = `Google 로그인 오류: ${e.message}`;
      }

      Alert.alert("로그인 실패", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 flex-col justify-center items-center bg-white">
      <Image
        source={require("@/assets/images/logo-2x.png")}
        style={{ width: 128, height: 128, borderRadius: 16 }}
      />
      <Text style={{ fontSize: 16, marginTop: 8 }}>한국외국어대학교</Text>
      <Text style={{ fontSize: 16, marginVertical: 8 }}>
        학교 계정으로 로그인해주세요!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onPressGoogle}
        disabled={isLoading}
      >
        <>
          <Image
            source={require("@/assets/images/google.png")}
            style={{ width: 28, height: 28, marginRight: 10 }}
          />
          <Text style={styles.font}>Sign up with Google</Text>
        </>
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
