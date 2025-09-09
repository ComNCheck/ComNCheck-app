import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

let accessTokenCache: string | null = null;
let refreshTokenCache: string | null = null;

export async function setTokens(tokens: {
  accessToken: string;
  refreshToken?: string;
}) {
  accessTokenCache = tokens.accessToken;
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);

  if (tokens.refreshToken) {
    refreshTokenCache = tokens.refreshToken;
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
}

export async function getAccessToken(): Promise<string | null> {
  if (accessTokenCache !== null) return accessTokenCache;
  const t = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  accessTokenCache = t;
  return t;
}

export async function getRefreshToken(): Promise<string | null> {
  if (refreshTokenCache !== null) return refreshTokenCache;
  const t = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  refreshTokenCache = t;
  return t;
}

export async function clearTokens() {
  accessTokenCache = null;
  refreshTokenCache = null;
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}
