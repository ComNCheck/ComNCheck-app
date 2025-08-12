import CompleteButton from "@/components/button/CompleteBtn";
import SettinglView from "@/components/view/SettingView";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function ToDeveloperScreen() {
  const [messageInput, setMessageInput] = useState<string>("");
  const [submitMessage, setSubmitMessage] = useState<string[]>([]);
  const handlePlus = () => {
    console.log("메시지 추가");
    if (messageInput?.trim().length > 0) {
      setSubmitMessage([...submitMessage, messageInput.trim()]);
      setMessageInput("");
    }
  };
  const handleSubmit = () => {
    console.log("메시지 제출");
    setSubmitMessage([]);
  };
  return (
    <SettinglView>
      <ScrollView className="flex-1 my-2">
        <View className="mt-2 mb-4">
          <Text className="font-semibold text-xl text-text">To.개발자</Text>
          <View>
            <Text className="font-semibold text-xl text-text">
              <Text className="font-extrabold text-xl text-tint">
                이런 기능
              </Text>
              있었으면 좋겠어요
            </Text>
          </View>
        </View>

        <View className="gap-2">
          <TextInput
            className="w-full h-32 border-[1px] border-[#a6a6a6] rounded-md p-4"
            placeholder="개발자에게 원하는 점을 적어주세요"
            style={{ textAlignVertical: "top" }}
            onChangeText={setMessageInput}
            value={messageInput}
          ></TextInput>
          <CompleteButton
            backgroundColor="#EBEBEB"
            content={
              <View className="flex-row items-center gap-2 border-[#b6b6b6]">
                <Entypo name="circle-with-plus" size={24} color="#666666" />
                <Text className="font-bold text-lg text-[#666666]">
                  메시지 추가하기
                </Text>
              </View>
            }
            onPress={handlePlus}
          />
          <CompleteButton
            content={
              <View className="flex-row items-center gap-2">
                <Entypo name="circle-with-plus" size={24} color="white" />
                <Text className="font-bold text-lg text-white">
                  메시지 전송하기
                </Text>
              </View>
            }
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SettinglView>
  );
}
