import CompleteButton from "@/components/button/CompleteBtn";
import SubTitle from "@/components/title/SubTitle";
import SettinglView from "@/components/view/SettingView";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function ApplyRatingScreen() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] =
    useState("직책을 선택해주세요");
  const positions = ["학생", "학생회", "과회장"];

  const handleSubmit = () => {
    Alert.alert("신청 완료", "신청이 완료되었습니다!");
  };
  return (
    <SettinglView>
      <View className="flex-1 flex-col justify-between pb-20">
        <View>
          <SubTitle
            title="학생회 등급신청"
            description="학생회 부원 및 과회장만 신청이 가능해요."
          />
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">이름</Text>
            <TextInput
              placeholder="이름을 입력해주세요"
              className="border-[#B6B6B6] border-[2px] text-[#A6A6A6] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">학번</Text>
            <TextInput
              placeholder="학번을 입력해주세요"
              className="border-[#B6B6B6] border-[2px] text-[#A6A6A6] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">소속단위</Text>
            <TextInput
              placeholder="학과를 입력해주세요"
              className="border-[#B6B6B6] border-[2px] text-[#A6A6A6] rounded-lg p-4 flex-1"
            />
          </View>
          <View className="flex-row items-center w-full gap-8 my-2">
            <Text className="text-lg font-black w-[20%]">직책</Text>
            <TextInput
              placeholder="학생회 내 직책을 입력해주세요"
              className="border-[#B6B6B6] border-[2px] text-[#A6A6A6] rounded-lg p-4 flex-1"
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
                color="black"
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
        <CompleteButton content="신청완료" onPress={handleSubmit} />
      </View>
    </SettinglView>
  );
}
