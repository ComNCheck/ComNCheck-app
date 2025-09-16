import { AuthMember, LoginBody, LoginResponse } from "./auth.type";
import { api } from "./client";

export function memberLoginByBody(body: LoginBody) {
  //id token으로 로그인
  const payload = {
    idToken: body.idToken,
  };

  return api.post<LoginResponse>("/api/v1/member/login", payload, {
    headers: { "Content-Type": "application/json" },
  });
}

export function getMemberData() {
  //본인 정보 조회
  return api.get<AuthMember>("/api/v1/member");
}
