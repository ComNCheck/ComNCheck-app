export type UserRole =
  | "ROLE_ADMIN"
  | "ROLE_MAJOR_PRESIDENT"
  | "ROLE_STUDENT_COUNCIL"
  | "ROLE_STUDENT"
  | "ROLE_GRADUATE_STUDENT";

export interface UserInfo {
  memberId: number;
  name: string;
  major: string;
  studentNumber: number;
  role: UserRole;
  checkStudentCard: boolean;
}

export interface ButtonConfig {
  role: UserRole[];
  icon: string;
  text: string;
  route?: string;
  action?: "openModal";
}

export type QuestionStatus = "answered" | "pending";

export interface MyQuestionItem {
  id: number;
  title: string;
  createdAt: string; // YYYY.MM.DD
  status: QuestionStatus;
  isPublic: boolean;
  answer?: {
    content: string;
    answeredAt: string; // YYYY.MM.DD
  };
}
