import * as FileSystem from "expo-file-system";
import { getAccessToken } from "../services/tokenStore";
import { AuthMember, LoginBody, LoginResponse } from "./auth.type";
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

export async function postStudentCard(uri: string) {
  //학생증 업로드
  const token = await getAccessToken();
  const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (!baseURL) {
    throw new Error("API base URL is not configured. Check your .env file.");
  }
  const url = `${baseURL}/api/v1/member/student/number`;

  const filename = uri.split("/").pop() || "student-id.jpg";
  const ext = (filename.split(".").pop() || "").toLowerCase();
  const mimeTypes: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
  };
  const mime = mimeTypes[ext] || "application/octet-stream";

  const res = await FileSystem.uploadAsync(url, uri, {
    httpMethod: "POST",
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: "studentCardImage", // 서버 필드명과 일치
    mimeType: mime,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    parameters: {}, // 다른 폼필드 필요하면 추가
  });

  if (__DEV__)
    console.log(
      "[UPLOAD FS]",
      res.status,
      res.headers,
      res.body?.slice(0, 120)
    );

  if (res.status >= 300) {
    // HTML/리다이렉트 응답 방어
    if (
      (
        res.headers?.["Content-Type"] ||
        res.headers?.["content-type"] ||
        ""
      ).includes("text/html")
    ) {
      throw new Error("로그인이 필요합니다(HTML 응답).");
    }
    throw new Error(`업로드 실패: ${res.status}`);
  }
  return res.body ? JSON.parse(res.body) : null;
}
