import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, [WEB_CLIENT_ID]);

  const onPressGoogle = async () => {
    try {
      setIsLoading(true);
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

      await authService.loginWithIdToken({ idToken });
      const memberResponse = await getMemberData();
      const userName = memberResponse.data.name;
      if (__DEV__) {
        console.log(`[MEMBER] 사용자 이름: ${userName}`);
      }
      router.replace({
        pathname: "/(auth)/login/first",
        params: { name: userName },
      });
    } catch (e: any) {
      if (__DEV__) {
        console.log("code:", e?.code, "message:", e?.message);
      }
      Alert.alert(
        "로그인 실패",
        e?.message || "구글 로그인 중 오류가 발생했습니다."
      );
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
