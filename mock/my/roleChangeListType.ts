export type RoleChangeApplicant = {
  id: number;
  name: string;
  roleLabel: string; // 현재 등급 라벨
  studentId: string;
  major: string;
  requestedPosition: string; // 신청 직책
};
