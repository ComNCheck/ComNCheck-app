import {
  AuthMember,
  LoginBody,
  LoginResponse,
  studentNumber,
} from "./auth.type";
import { api } from "./client";

export function memberLoginByBody(body: LoginBody) {
  //id token으로 로그인
  const payload = {
    idToken: body.idToken,
  };

  console.log("🔍 [API] 로그인 요청 시작:", payload);
  console.log("🔍 [API] Base URL:", api.defaults.baseURL);

  return api
    .post<LoginResponse>("/api/v1/member/login", payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000,
    })
    .then((response) => {
      console.log("✅ [API] 로그인 응답 성공:", response.status);
      return response;
    })
    .catch((error) => {
      console.error("❌ [API] 로그인 요청 실패:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
        },
      });
      throw error;
    });
}

export function getMemberData() {
  //본인 정보 조회
  return api.get<AuthMember>("/api/v1/member");
}
export async function postStudentNumber(uri: string) {
  //학생증 이미지 제출
  const filename = uri.split("/").pop() ?? "student-id.jpg";
  const ext = filename.split(".").pop()?.toLowerCase();
  const type =
    ext === "png"
      ? "image/png"
      : ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : "image/*";

  const form = new FormData();
  form.append("studentCardImage", { uri, name: filename, type } as any);

  // Authorization 헤더는 api 인터셉터가 자동으로 붙습니다.
  const { data } = await api.post<studentNumber>(
    "/api/v1/member/student/number",
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}
