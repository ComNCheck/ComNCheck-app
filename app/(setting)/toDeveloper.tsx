import CompleteButton from "@/components/button/CompleteBtn";
import AnswerCard from "@/components/ui/AnswerCard";
import SettinglView from "@/components/view/SettingView";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { getMemberData } from "../apis/auth";
import {
  getAllQuestions,
  getDevQuestions,
  postQuestion,
} from "../apis/developerQuestion";
import { DeveloperQuestion } from "../apis/developerQuestion.type";

export default function ToDeveloperScreen() {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<DeveloperQuestion[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // ← 역할 상태
  const [loading, setLoading] = useState(true); // ← 로딩 상태
  const [submitting, setSubmitting] = useState(false); // ← 전송 중 상태(옵션)

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const meRes = await getMemberData();
        const me = meRes.data;
        const admin = me.role === "ROLE_ADMIN";
        if (mounted) setIsAdmin(admin);

        const list = admin ? await getDevQuestions() : await getAllQuestions();
        if (mounted && Array.isArray(list)) setMessages(list);
      } catch (err) {
        console.error("메시지 불러오기 실패:", err);
        Alert.alert("오류", "메시지를 가져오지 못했습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async () => {
    if (!messageInput.trim() || submitting) return;
    setSubmitting(true);
    try {
      const newQuestion = await postQuestion({ content: messageInput.trim() });
      setMessages((prev) => [...prev, newQuestion]);
      setMessageInput("");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      Alert.alert("오류", "메시지 전송 중 문제가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  // 로딩 스피너
  if (loading || isAdmin === null) {
    return (
      <SettinglView>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </SettinglView>
    );
  }

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

        {isAdmin ? (
          // 관리자: 개발자용 질문 목록만 표시 (입력폼 X)
          <View className="gap-2">
            {messages.map((msg) => (
              <AnswerCard key={msg.id} answer={msg.content} />
            ))}
            {messages.length === 0 && (
              <Text className="text-gray-400 text-center my-6">
                등록된 메시지가 없습니다.
              </Text>
            )}
          </View>
        ) : (
          // 일반 사용자: 입력 + 내 질문 목록 + 전송 버튼
          <View className="gap-2">
            <TextInput
              className="w-full h-32 border-[1px] border-[#E6E6E6] rounded-xl p-4"
              placeholder="개발자에게 원하는 점을 적어주세요"
              style={{ textAlignVertical: "top" }}
              multiline
              onChangeText={setMessageInput}
              value={messageInput}
            />
            <View className="gap-2">
              {messages.map((msg) => (
                <AnswerCard key={msg.id} answer={msg.content} />
              ))}
              {messages.length === 0 && (
                <Text className="text-gray-400 text-center my-6">
                  아직 보낸 메시지가 없습니다.
                </Text>
              )}
            </View>
            <CompleteButton
              disabled={submitting}
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
        )}
      </ScrollView>
    </SettinglView>
  );
}
