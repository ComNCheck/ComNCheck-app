import { memberLoginByBody, memberLogout } from "@/app/apis/auth";
import { router } from "expo-router";
import { LoginResponse } from "../apis/auth.type";
import { clearTokens, setTokens } from "./tokenStore";

export const authService = {
  async loginWithIdToken(args: { idToken: string }): Promise<LoginResponse> {
    const { data } = await memberLoginByBody(args);
    console.log(
      "✅ [AuthService] 로그인 응답 데이터:",
      JSON.stringify(data, null, 2)
    );
    if (!data.accessToken) {
      throw new Error(
        "로그인에 실패했습니다. 서버로부터 유효한 토큰을 받지 못했습니다."
      );
    }
    await setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    return data;
  },

  async logout() {
    try {
      await memberLogout();
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
    await clearTokens();
    router.replace("/(auth)/login");
  },
};
