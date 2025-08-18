import { useEffect, useState } from "react";
import { UserInfo, UserRole } from "./types";

export const useMemberData = () => {
  const [role, setRole] = useState<UserRole>("ROLE_STUDENT");
  const [name, setName] = useState<string>("이름");
  const [studentId, setStudentId] = useState<string>("학번");

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // TODO: 실제 API 호출로 교체
        // const baseURL = process.env.NEXT_PUBLIC_API_URL;
        // const response = await axios.get(`${baseURL}/api/v1/member`, {
        //   withCredentials: true,
        // });
        // const memberData = response.data as UserInfo;

        // 임시 데이터 (실제 구현 시 제거)
        const memberData: UserInfo = {
          memberId: 1,
          name: "이예림",
          major: "컴퓨터공학과",
          studentNumber: 20230001,
          role: "ROLE_STUDENT_COUNCIL",
          checkStudentCard: true,
        };
        //등급
        //const role = "ROLE_ADMIN";
        //const role = "ROLE_STUDENT";
        //const role = "ROLE_MAJOR_PRESIDENT";
        //const role = "ROLE_STUDENT_COUNCIL";
        //const role = "ROLE_GRADUATE_STUDENT";

        // 전체 회원 정보 상태 업데이트
        setRole(memberData.role);
        setName(memberData.name);

        // 학번 처리 로직
        if (
          memberData.studentNumber &&
          memberData.studentNumber !== 123456789
        ) {
          setStudentId(memberData.studentNumber.toString());
        } else {
          setStudentId("학번 없음");
        }

        // localStorage 대신 AsyncStorage 사용 (React Native)
        // await AsyncStorage.setItem("memberData", JSON.stringify(memberData));
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchMemberData();
  }, []);

  return { role, name, studentId };
};
