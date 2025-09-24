import CompleteButton from "@/components/button/CompleteBtn";
import AnswerCard from "@/components/ui/AnswerCard";
import SettinglView from "@/components/view/SettingView";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { getAllQuestions, postQuestion } from "../apis/developerQuestion";
import { DeveloperQuestion } from "../apis/developerQuestion.type";

export default function ToDeveloperScreen() {
  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<DeveloperQuestion[]>([]);
  // const handlePlus = () => {
  //   console.log("메시지 추가");
  //   if (messageInput?.trim().length > 0) {
  //     setSubmitMessage([...submitMessage, messageInput.trim()]);
  //     setMessageInput("");
  //   }
  // };

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        const messages = await getAllQuestions(); // 'messages'는 바로 배열
        console.log("[GET /my] normalized:", messages);
        if (Array.isArray(messages)) {
          setMessages(messages);
        }
      } catch (error) {
        console.error("이전 메시지를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchPreviousMessages();
  }, []);
  const handleSubmit = async () => {
    if (messageInput.trim().length === 0) return;

    const newMessageContent = messageInput.trim();

    try {
      const newQuestion = await postQuestion({ content: newMessageContent });
      setMessages((prevMessages) => [...prevMessages, newQuestion]);
      setMessageInput("");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      Alert.alert("오류", "메시지 전송 중 문제가 발생했습니다.");
    }
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
            className="w-full h-32 border-[1px] border-[#E6E6E6] rounded-xl p-4"
            placeholder="개발자에게 원하는 점을 적어주세요"
            style={{ textAlignVertical: "top" }}
            multiline
            onChangeText={setMessageInput}
            value={messageInput}
          ></TextInput>
          {/* <CompleteButton
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
          /> */}
          <View className="gap-2">
            {messages.map((msg) => (
              <AnswerCard key={msg.id} answer={msg.content} />
            ))}
          </View>
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
