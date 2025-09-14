import { LoginResponse, memberLoginByBody } from "@/app/apis/auth";
import { clearTokens, setTokens } from "./tokenStore";

export const authService = {
  async loginWithIdToken(args: { idToken: string }): Promise<LoginResponse> {
    const { data } = await memberLoginByBody(args);
    console.log("[LOGIN] request body:", args);
    console.log("[LOGIN] response:", data);

    if (!data.access_token) {
      throw new Error(
        "로그인에 실패했습니다. 서버로부터 유효한 토큰을 받지 못했습니다."
      );
    }
    await setTokens({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });
    return data;
  },

  async logout() {
    await clearTokens();
  },
};
