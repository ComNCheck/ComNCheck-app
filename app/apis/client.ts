import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/app/services/tokenStore";
import axios from "axios";
import { router } from "expo-router";

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
  },
});

// 요청 인터셉터 (기존과 동일)
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  const absoluteUrl = config.baseURL
    ? new URL(config.url ?? "", config.baseURL).toString()
    : (config.url ?? "");
  if (config.data instanceof FormData) {
    delete (config.headers as any)?.["Content-Type"];
  }
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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const forceLogout = async () => {
  await clearTokens();
  try {
    router.replace("/(auth)/login");
  } catch (e) {
    console.error("로그인 화면 이동 실패", e);
  }
};

//응답 인터셉터
api.interceptors.response.use(
  (res) => {
    if (__DEV__) {
      console.log(
        "[HTTP Response]",
        res.config.method?.toUpperCase(),
        res.config.url,
        "status:",
        res.status,
        "data:",
        res.data
      );
    }
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (__DEV__) {
      console.error(
        "[HTTP Error]",
        error.config?.method?.toUpperCase(),
        error.config?.url,
        "status:",
        status,
        "error:",
        error.response?.data || error.message
      );
    }

    // 401 에러 처리
    if (status === 401) {
      const errorCode = error.response?.data?.error;

      // 재시도 요청이 또 401이면 무한 루프 방지 (기존과 동일)
      if (originalRequest._retry) {
        console.error(
          "토큰 재발급 후 재시도했으나 여전히 401입니다. 로그아웃합니다."
        );
        await forceLogout();
        return Promise.reject(error);
      }

      switch (errorCode) {
        case "TOKEN_EXPIRED":
          console.log("토큰 만료. 재발급을 시도합니다.");

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                resolve: (token: string) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  resolve(api(originalRequest));
                },
                reject: (err: any) => {
                  reject(err);
                },
              });
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const refreshToken = await getRefreshToken();
            if (!refreshToken) {
              throw new Error("리프레시 토큰이 없습니다.");
            }
            const { data } = await api.post("/api/v1/member/refresh", null, {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            });
            const newAccessToken = data.accessToken;

            if (!newAccessToken) {
              throw new Error("서버가 새 액세스 토큰을 반환하지 않았습니다.");
            }

            await setTokens({
              accessToken: newAccessToken,
              refreshToken: refreshToken, // 기존 토큰 유지
            });

            // api 인스턴스 및 현재 요청 헤더 업데이트
            api.defaults.headers.common["Authorization"] =
              `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            processQueue(null, newAccessToken); // 큐 처리
            return api(originalRequest); // 원래 요청 재시도
          } catch (refreshError) {
            console.error("토큰 재발급 실패", refreshError);
            processQueue(refreshError, null);
            await forceLogout();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }

        // 즉시 로그아웃 처리 (기존과 동일)
        case "TOKEN_BLACKLISTED":
        case "MISSING_TOKEN":
        case "REFRESH_TOKEN_EXPIRED":
        case "INVALID_REFRESH_TOKEN":
          console.warn(`[${errorCode}] - 즉시 로그아웃합니다.`);
          await forceLogout();
          return Promise.reject(error);

        // 그 외 401 (기존과 동일)
        default:
          console.warn(
            `처리되지 않은 401 에러 (${errorCode || "N/A"}). 로그아웃합니다.`
          );
          await forceLogout();
          return Promise.reject(error);
      }
    }

    // 401이 아닌 다른 에러 (기존과 동일)
    return Promise.reject(error);
  }
);

export { api, api as client };
