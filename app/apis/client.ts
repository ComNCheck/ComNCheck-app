import {
  clearTokens /*, getRefreshToken, setTokens*/,
  getAccessToken,
} from "@/app/services/tokenStore";
import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL,
  timeout: 30000, // 타임아웃 증가
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// 요청 인터셉터: Bearer 토큰 자동 첨부
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  const absoluteUrl = config.baseURL
    ? new URL(config.url ?? "", config.baseURL).toString()
    : (config.url ?? "");

  if (__DEV__) {
    console.log(
      "[HTTP]",
      config.method?.toUpperCase(),
      absoluteUrl,
      "body:",
      config.data
    );
  }
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 처리 (필요 시 리프레시 로직 확장 가능)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;

    // 리프레시 토큰 플로우를 쓰려면 여기서 갱신 후 재시도 로직 추가
    if (status === 401) {
      await clearTokens();
      try {
        const { router } = await import("expo-router");
        setTimeout(() => router.replace("/(auth)/login"), 0);
      } catch {}
    }
    return Promise.reject(error);
  }
);
