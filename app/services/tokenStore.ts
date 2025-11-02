import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

let accessTokenCache: string | null = null;
let refreshTokenCache: string | null = null;

export async function setTokens(tokens: {
  accessToken: string;
  refreshToken?: string;
}) {
  accessTokenCache = tokens.accessToken;
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);

  if (tokens.refreshToken) {
    console.log("🔑 [TokenStore] refreshToken 저장 시도:", tokens.refreshToken);
    refreshTokenCache = tokens.refreshToken;
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
  } else {
    console.warn(
      "🔑 [TokenStore] setTokens가 불렸지만 refreshToken이 없습니다."
    );
  }
}

export async function getAccessToken(): Promise<string | null> {
  if (accessTokenCache !== null) return accessTokenCache;
  const t = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  accessTokenCache = t;
  return t;
}

export async function getRefreshToken(): Promise<string | null> {
  console.log(
    "🔑 [TokenStore] getRefreshToken 호출됨. 캐시:",
    refreshTokenCache
  );
  if (refreshTokenCache !== null) return refreshTokenCache;
  const t = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  console.log("🔑 [TokenStore] SecureStore에서 읽은 토큰:", t);

  refreshTokenCache = t;
  return t;
}

export async function clearTokens() {
  accessTokenCache = null;
  refreshTokenCache = null;
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}
