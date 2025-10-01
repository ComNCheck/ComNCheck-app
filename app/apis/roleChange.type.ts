// 등급신청 폼 api
export interface RoleChangeType {
  name: string;
  studentNumber: number;
  major: string;
  requestPosition: string;
  requestRole: string;
}

// 등급 수정 요청 목록 응답 타입
export interface RoleChangeRequest {
  requestId: number;
  name: string;
  major: string;
  studentNumber: number;
  requestPosition: string;
  role:
    | "ROLE_ADMIN"
    | "ROLE_STUDENT"
    | "ROLE_MAJOR_PRESIDENT"
    | "ROLE_STUDENT_COUNCIL"
    | "ROLE_GRADUATE_STUDENT";
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export type RoleChangeRequestList = RoleChangeRequest[];
