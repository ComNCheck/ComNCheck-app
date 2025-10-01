import {
  getRoleChangeRequestById,
  updateRoleChangeRequest,
} from "@/app/apis/roleChange";
import CompleteButton from "@/components/button/CompleteBtn";
import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import BottomAbsolute from "@/components/ui/BottomAbsolute";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Entypo, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

const roleLabels: Record<string, string> = {
  ROLE_ADMIN: "관리자",
  ROLE_MAJOR_PRESIDENT: "과회장",
  ROLE_STUDENT_COUNCIL: "학생회",
  ROLE_STUDENT: "학생",
  ROLE_GRADUATE_STUDENT: "졸업생",
};

// 한글 등급을 영어 role로 변환하는 함수
const getRoleFromLabel = (label: string): string => {
  const labelToRole: Record<string, string> = {
    관리자: "ROLE_ADMIN",
    과회장: "ROLE_MAJOR_PRESIDENT",
    학생회: "ROLE_STUDENT_COUNCIL",
    학생: "ROLE_STUDENT",
    졸업생: "ROLE_GRADUATE_STUDENT",
  };
  return labelToRole[label] || "ROLE_STUDENT";
};

// Removed unused InfoRow component

export default function ModifyRoleDetailScreen() {
  const { requestId } = useLocalSearchParams<{ requestId: string }>();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [selectedPosition, setSelectedPosition] =
    React.useState("등급을 선택해주세요");
  const positions = ["학생", "학생회", "과회장", "관리자", "졸업생"];

  const [nameInput, setNameInput] = React.useState("");
  const [studentIdInput, setStudentIdInput] = React.useState("");
  const [majorInput, setMajorInput] = React.useState("");
  const [titleInput, setTitleInput] = React.useState("");

  useEffect(() => {
    const fetchRoleChangeDetail = async () => {
      if (!requestId) return;

      try {
        const response = await getRoleChangeRequestById(Number(requestId));
        const data = response.data;

        setNameInput(data.name);
        setStudentIdInput(String(data.studentNumber));
        setMajorInput(data.major);
        setTitleInput(data.position);
        setSelectedPosition(roleLabels[data.role] ?? "등급을 선택해주세요");
      } catch (error) {
        console.error(
          "등급 변경 요청 상세 정보를 불러오는데 실패했습니다:",
          error
        );
        Alert.alert("오류", "데이터를 불러오는데 실패했습니다.");
      }
    };

    fetchRoleChangeDetail();
  }, [requestId]);

  const handleSubmit = async () => {
    if (!requestId) {
      Alert.alert("오류", "잘못된 요청입니다.");
      return;
    }

    // 입력 검증
    if (selectedPosition === "등급을 선택해주세요") {
      Alert.alert("입력 오류", "등급을 선택해주세요.");
      return;
    }

    try {
      const role = getRoleFromLabel(selectedPosition);

      const requestData = {
        requestPosition: titleInput,
        requestRole: role as
          | "ROLE_ADMIN"
          | "ROLE_STUDENT"
          | "ROLE_MAJOR_PRESIDENT"
          | "ROLE_STUDENT_COUNCIL"
          | "ROLE_GRADUATE_STUDENT",
      };

      console.log("수정 요청 데이터:", requestData);
      console.log("requestId:", requestId);

      const response = await updateRoleChangeRequest(
        Number(requestId),
        requestData
      );

      console.log("수정 완료 응답:", response.data);

      Alert.alert("수정 완료", "등급 수정이 완료되었습니다.");
      router.back();
    } catch (error: any) {
      console.error("등급 수정 중 오류 발생:", error);
      console.error("에러 상세:", error.response?.data || error.message);

      // 타임아웃 에러 처리
      if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        Alert.alert(
          "서버 응답 지연",
          "서버 응답이 지연되고 있습니다. 수정이 완료되었을 수 있으니 목록을 확인해주세요.",
          [
            {
              text: "목록으로 돌아가기",
              onPress: () => router.back(),
            },
            {
              text: "다시 시도",
              style: "cancel",
            },
          ]
        );
        return;
      }

      const errorMessage =
        error.response?.data?.message || "등급 수정에 실패했습니다.";
      Alert.alert("오류", errorMessage);
    }
  };

  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={
            <View className="flex-row items-center gap-2">
              <Feather
                name="arrow-left"
                size={20}
                color="#3a3a3a"
                onPress={() => router.back()}
              />
              <Text className="font-extrabold text-xl">돌아가기</Text>
            </View>
          }
        />
      }
    >
      <View className="flex-1 pb-28">
        <SubTitle
          title="등급 수정하기"
          description={`학생회 등급을 신청한 학생들 입니다.\n명단을 확인하시고 모바일 학생증만 등급을 올려주세요.`}
        />

        <View className="mt-2">
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">이름</Text>
            <TextInput
              placeholder="이름을 입력해주세요"
              value={nameInput}
              editable={false}
              className="border-[#B6B6B6] border-[2px] text-[#3a3a3a] bg-[#f5f5f5] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">학번</Text>
            <TextInput
              placeholder="학번을 입력해주세요"
              value={studentIdInput}
              editable={false}
              className="border-[#B6B6B6] border-[2px] text-[#3a3a3a] bg-[#f5f5f5] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">소속단위</Text>
            <TextInput
              placeholder="학과를 입력해주세요"
              value={majorInput}
              editable={false}
              className="border-[#B6B6B6] border-[2px] text-[#3a3a3a] bg-[#f5f5f5] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">직책</Text>
            <TextInput
              placeholder="학생회 내 직책을 입력해주세요"
              value={titleInput}
              onChangeText={setTitleInput}
              className="border-[#B6B6B6] border-[2px] text-[#3a3a3a] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">등급</Text>
            <Pressable
              className="flex-1 flex-row items-center justify-between border-[#B6B6B6] border-[2px] rounded-lg p-4"
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text>{selectedPosition}</Text>
              <Entypo
                name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color="#000"
              />
            </Pressable>
            {isDropdownOpen && (
              <View className="absolute top-16 right-0 border-[#B6B6B6] border-[1px] rounded-lg bg-white shadow-lg w-[74%]">
                {positions.map((position, index) => (
                  <Pressable
                    key={index}
                    className="p-4 active:bg-[#f0f0f0]"
                    onPress={() => {
                      setSelectedPosition(position);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text>{position}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {isDropdownOpen ? (
          <View className="mt-48">
            <CompleteButton content="수정완료" onPress={handleSubmit} />
          </View>
        ) : (
          <BottomAbsolute bottom={24}>
            <CompleteButton content="수정완료" onPress={handleSubmit} />
          </BottomAbsolute>
        )}
      </View>
    </ParallaxScrollView>
  );
}
