// 학생회 리스트 반환값
export interface Member {
  name: string;
  position: string;
}

export interface President {
  name: string;
}
export interface PresidentCouncilResponse {
  president: President;
  councilList: Member[];
}

export enum StudentRole {
  ADMIN = "ROLE_ADMIN", // 관리자
  MAJOR_PRESIDENT = "ROLE_MAJOR_PRESIDENT", // 학생회장
  STUDENT_COUNCIL = "ROLE_STUDENT_COUNCIL", // 학생회
  STUDENT = "ROLE_STUDENT", // 일반 학생
  GRADUATE_STUDENT = "ROLE_GRADUATE_STUDENT", // 졸업생
}
