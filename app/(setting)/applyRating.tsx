import CompleteButton from "@/components/button/CompleteBtn";
import SubTitle from "@/components/title/SubTitle";
import SettingView from "@/components/view/SettingView";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { StudentRole } from "../apis/member.type";
import { applyRoleChange } from "../apis/roleChange";

export default function ApplyRatingScreen() {
  const [form, setForm] = useState({
    name: "",
    studentNumber: "",
    major: "",
    requestPosition: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRoleText, setSelectedRoleText] =
    useState("등급을 선택해주세요");
  const [selectedRoleValue, setSelectedRoleValue] =
    useState<StudentRole | null>(null);

  const roleOptions = [
    { text: "학생", value: StudentRole.STUDENT },
    { text: "학생회", value: StudentRole.STUDENT_COUNCIL },
    { text: "과회장", value: StudentRole.MAJOR_PRESIDENT },
  ];

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.studentNumber ||
      !form.major ||
      !form.requestPosition ||
      !selectedRoleValue
    ) {
      Alert.alert("입력 오류", "모든 항목을 입력해주세요.");
      return;
    }

    const formData = {
      ...form, // form 객체를 그대로 사용
      studentNumber: parseInt(form.studentNumber, 10),
      requestRole: selectedRoleValue,
    };

    try {
      await applyRoleChange(formData);
      Alert.alert("신청 완료", "등급 변경 신청이 완료되었습니다.");

      setForm({
        name: "",
        studentNumber: "",
        major: "",
        requestPosition: "",
      });
      setSelectedRoleText("등급을 선택해주세요");
      setSelectedRoleValue(null);
    } catch (error) {
      console.error("등급 신청 실패:", error);
      Alert.alert("오류", "신청 중 문제가 발생했습니다.");
    }
  };

  return (
    <SettingView>
      <View className="flex-1 flex-col justify-between pb-20">
        <View>
          <SubTitle
            title="학생회 등급신청"
            description="학생회 부원 및 과회장만 신청이 가능해요."
          />
          {/* 5. TextInput의 value와 onChangeText를 수정합니다. */}
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">이름</Text>
            <TextInput
              value={form.name}
              onChangeText={(text) => handleFormChange("name", text)}
              placeholder="이름을 입력해주세요"
              className="border-[#B6B6B6] border-[2px] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">학번</Text>
            <TextInput
              value={form.studentNumber}
              onChangeText={(text) => handleFormChange("studentNumber", text)}
              placeholder="학번을 입력해주세요"
              keyboardType="number-pad"
              className="border-[#B6B6B6] border-[2px] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">소속단위</Text>
            <TextInput
              value={form.major}
              onChangeText={(text) => handleFormChange("major", text)}
              placeholder="학과를 입력해주세요"
              className="border-[#B6B6B6] border-[2px] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">직책</Text>
            <TextInput
              value={form.requestPosition}
              onChangeText={(text) => handleFormChange("requestPosition", text)}
              placeholder="학생회 내 직책을 입력해주세요"
              className="border-[#B6B6B6] border-[2px] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2 z-10">
            <Text className="text-lg font-black w-[20%]">등급</Text>
            <View className="flex-1">
              <Pressable
                className="flex-row items-center justify-between border-[#B6B6B6] border-[2px] rounded-lg p-4"
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Text>{selectedRoleText}</Text>
                <Entypo
                  name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="black"
                />
              </Pressable>
              {isDropdownOpen && (
                <View className="absolute top-16 right-0 left-0 border-[#B6B6B6] border-[1px] rounded-lg bg-white shadow-lg">
                  {roleOptions.map((option) => (
                    <Pressable
                      key={option.value}
                      className="p-4 active:bg-[#f0f0f0]"
                      onPress={() => {
                        setSelectedRoleText(option.text);
                        setSelectedRoleValue(option.value);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Text>{option.text}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
        <CompleteButton content="신청완료" onPress={handleSubmit} />
      </View>
    </SettingView>
  );
}
