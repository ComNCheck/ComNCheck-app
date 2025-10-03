export type AuthMember = {
  memberId: number;
  name: string;
  major: string;
  studentNumber: number;
  role: string;
  checkStudentCard: boolean;
  alarmMajorEvent: boolean;
  alarmMajorNotice: boolean;
  alarmEmploymentNotice: boolean;
};
export type LoginBody = {
  idToken: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
};

export type studentNumber = {
  studentCardImage: string;
};
