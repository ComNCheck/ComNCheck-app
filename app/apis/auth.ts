import { api } from "./client";

export type LoginBody = {
  idToken: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
};

export function memberLoginByBody(body: LoginBody) {
  const payload = {
    idToken: body.idToken,
  };

  return api.post<LoginResponse>("/api/v1/member/login", payload, {
    headers: { "Content-Type": "application/json" },
  });
}
