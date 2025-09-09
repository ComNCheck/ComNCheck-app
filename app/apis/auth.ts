import { api } from "./client";

export type LoginBody = {
  authorizationCode: string;
  codeVerifier?: string;
  redirectUri?: string;
  clientId?: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
};

export function memberLoginByBody(body: LoginBody) {
  const payload = {
    authorizationCode: body.authorizationCode,
  };

  return api.post<LoginResponse>("/api/v1/member/login", payload, {
    headers: { "Content-Type": "application/json" },
  });
}
