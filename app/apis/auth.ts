import { AuthMember, LoginBody, LoginResponse } from "./auth.type";
import { api } from "./client";

export function memberLoginByBody(body: LoginBody) {
  //id token으로 로그인
  const payload = {
    idToken: body.idToken,
  };

  console.log('🔍 [API] 로그인 요청 시작:', payload);
  console.log('🔍 [API] Base URL:', api.defaults.baseURL);
  
  return api.post<LoginResponse>("/api/v1/member/login", payload, {
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    timeout: 30000,
  }).then(response => {
    console.log('✅ [API] 로그인 응답 성공:', response.status);
    return response;
  }).catch(error => {
    console.error('❌ [API] 로그인 요청 실패:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      }
    });
    throw error;
  });
}

export function getMemberData() {
  //본인 정보 조회
  return api.get<AuthMember>("/api/v1/member");
}
