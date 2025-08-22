import { useEffect, useState } from "react";
import { RoleChangeApplicant } from "./roleChangeListType";

// 목데이터 훅: 등급 변경 신청자 목록
export const useRoleChangeList = () => {
  const [applicants, setApplicants] = useState<RoleChangeApplicant[]>([]);

  useEffect(() => {
    // TODO: 실제 API 연동 시 교체
    const mock: RoleChangeApplicant[] = [
      {
        id: 1,
        name: "이예림",
        roleLabel: "학생",
        studentId: "202302351",
        major: "컴퓨터공학부",
        requestedPosition: "",
      },
      {
        id: 2,
        name: "이예림",
        roleLabel: "학생회",
        studentId: "202302351",
        major: "컴퓨터공학부",
        requestedPosition: "학술부장",
      },
      {
        id: 3,
        name: "이예림",
        roleLabel: "과회장",
        studentId: "202302351",
        major: "컴퓨터공학부",
        requestedPosition: "과회장",
      },
    ];

    setApplicants(mock);
  }, []);

  return { applicants };
};
