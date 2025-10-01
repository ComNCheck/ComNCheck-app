import { getRoleChangeRequests } from "@/app/apis/roleChange";
import { RoleChangeRequest } from "@/app/apis/roleChange.type";
import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { RoleChangeApplicant } from "@/mock/my/roleChangeListType";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ModifyRoleCard from "./modifyRoleCard";

function ApplicantCard({
  item,
  onPress,
}: {
  item: RoleChangeApplicant;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <ModifyRoleCard item={item} />
    </Pressable>
  );
}

// Role을 한글로 변환하는 함수
const getRoleLabel = (role: string): string => {
  const roleMap: { [key: string]: string } = {
    ROLE_ADMIN: "관리자",
    ROLE_STUDENT: "학생",
    ROLE_MAJOR_PRESIDENT: "과회장",
    ROLE_STUDENT_COUNCIL: "학생회",
    ROLE_GRADUATE_STUDENT: "졸업생",
  };
  return roleMap[role] || role;
};

export default function ModifyRoleScreen() {
  const [applicants, setApplicants] = useState<RoleChangeApplicant[]>([]);

  useEffect(() => {
    const fetchRoleChangeRequests = async () => {
      try {
        const response = await getRoleChangeRequests();
        // API 응답을 기존 타입에 맞게 변환
        const formattedData: RoleChangeApplicant[] = response.data.map(
          (item: RoleChangeRequest) => ({
            id: item.requestId,
            name: item.name,
            roleLabel: getRoleLabel(item.role),
            studentId: String(item.studentNumber),
            major: item.major,
            requestedPosition: item.requestPosition,
          })
        );
        setApplicants(formattedData);
      } catch (error) {
        console.error("등급 변경 요청 목록을 불러오는데 실패했습니다:", error);
      }
    };

    fetchRoleChangeRequests();
  }, []);

  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={<Text className="text-3xl font-extrabold">MY</Text>}
        ></HeaderBar>
      }
    >
      <SubTitle
        title="등급 수정하기"
        description={`학생회 등급을 신청한 학생들 입니다.\n명단을 확인하시고 올바른 학생들만 등급을 올려주세요.`}
      />

      <View className="flex-col gap-3">
        {applicants.map((item) => (
          <ApplicantCard
            key={item.id}
            item={item}
            onPress={() =>
              router.push("/(tabs)/my/modifyRole/modifyRoleDetail")
            }
          />
        ))}
      </View>
    </ParallaxScrollView>
  );
}
