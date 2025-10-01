import { getAllQuestions } from "@/app/apis/question";
import { QuestionResponseDTO } from "@/app/apis/question.type";
import HeaderBar from "@/components/HeaderBar";
import MyWritingListBOX from "@/components/my/MyWritingListBOX";
import SubTitle from "@/components/title/SubTitle";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type AnswerTab = "pending" | "answered";

export default function AnswerScreen() {
  const [questions, setQuestions] = React.useState<QuestionResponseDTO[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<AnswerTab>("answered");

  React.useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await getAllQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("질문 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const filtered = React.useMemo(
    () =>
      questions.filter((q) => {
        const hasAnswer = q.answer !== null;
        return activeTab === "answered" ? hasAnswer : !hasAnswer;
      }),
    [questions, activeTab]
  );

  const TabButton = ({ label, value }: { label: string; value: AnswerTab }) => {
    const isActive = activeTab === value;
    const isAnswered = value === "answered";
    const textColor = isActive ? Colors.light.tint : "#6B7280";
    const bgClass = isActive ? "bg-blue-50" : "bg-gray-100";

    const iconName = isAnswered
      ? ("pricetag" as const)
      : ("chatbubble-ellipses-outline" as const);

    return (
      <Pressable
        onPress={() => setActiveTab(value)}
        className={`flex-row items-center gap-2 px-6 py-3 rounded-2xl ${bgClass}`}
      >
        <Ionicons name={iconName} size={18} color={textColor} />
        <Text
          className={`text-base font-extrabold ${
            isActive ? "text-[#0077FF]" : "text-gray-500"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={<Text className="text-3xl font-extrabold">MY</Text>}
        >
          <Pressable className="flex-row">
            <FontAwesome
              size={28}
              name="gear"
              color="#B6B6B6"
              onPress={() => router.push("/(setting)")}
            />
          </Pressable>
        </HeaderBar>
      }
    >
      <SubTitle
        title="답변하기"
        description={"질문에 대한 답변을 작성하고 완료 버튼을 눌러주세요"}
      />

      <View className="flex-row items-center gap-3 mb-4">
        <TabButton label="답변예정" value="pending" />
        <TabButton label="답변 완료" value="answered" />
      </View>

      {loading ? (
        <View className="py-10 items-center">
          <ActivityIndicator size="large" color={Colors.light.tint} />
        </View>
      ) : (
        <View className="gap-3">
          {filtered.length === 0 ? (
            <View className="py-10 items-center">
              <Text className="text-gray-400 text-base">
                {activeTab === "answered"
                  ? "답변 완료된 질문이 없습니다"
                  : "답변 예정인 질문이 없습니다"}
              </Text>
            </View>
          ) : (
            filtered.map((q) => (
              <MyWritingListBOX
                key={q.majorQuestionId}
                title={q.title}
                status={q.answer ? "answered" : "pending"}
                createdAt={q.createdAt}
                onPress={() => {
                  if (!q.answer) {
                    router.push({
                      pathname: "/(tabs)/my/answer/AnswerWrite" as any,
                      params: { id: String(q.majorQuestionId) },
                    });
                  } else {
                    router.push({
                      pathname: "/(tabs)/my/answer/AnswerEdit" as any,
                      params: { id: String(q.majorQuestionId) },
                    });
                  }
                }}
              />
            ))
          )}
        </View>
      )}
    </ParallaxScrollView>
  );
}
