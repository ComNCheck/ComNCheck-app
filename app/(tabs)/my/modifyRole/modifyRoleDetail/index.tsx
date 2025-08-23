import CompleteButton from "@/components/button/CompleteBtn";
import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import BottomAbsolute from "@/components/ui/BottomAbsolute";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useMemberData } from "@/mock/my/useMemberData";
import { Entypo, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

const roleLabels: Record<string, string> = {
  ROLE_ADMIN: "관리자",
  ROLE_MAJOR_PRESIDENT: "과회장",
  ROLE_STUDENT_COUNCIL: "학생회",
  ROLE_STUDENT: "학생",
  ROLE_GRADUATE_STUDENT: "졸업생",
};

// Removed unused InfoRow component

export default function ModifyRoleDetailScreen() {
  const { role, name, studentId, major } = useMemberData();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [selectedPosition, setSelectedPosition] = React.useState(
    roleLabels[role] ?? "등급을 선택해주세요"
  );
  const positions = ["학생", "학생회", "과회장"];

  const [nameInput, setNameInput] = React.useState(name);
  const [studentIdInput, setStudentIdInput] = React.useState(studentId);
  const [majorInput, setMajorInput] = React.useState(major);
  const [titleInput, setTitleInput] = React.useState("");

  const handleSubmit = () => {
    Alert.alert("수정 완료", "등급 수정이 완료되었습니다.");
    router.back();
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
              onChangeText={setNameInput}
              className="border-[#B6B6B6] border-[2px] text-[#3a3a3a] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">학번</Text>
            <TextInput
              placeholder="학번을 입력해주세요"
              value={studentIdInput}
              onChangeText={setStudentIdInput}
              className="border-[#B6B6B6] border-[2px] text-[#3a3a3a] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">소속단위</Text>
            <TextInput
              placeholder="학과를 입력해주세요"
              value={majorInput}
              onChangeText={setMajorInput}
              className="border-[#B6B6B6] border-[2px] text-[#3a3a3a] rounded-lg p-4 flex-1"
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
