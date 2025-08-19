import HeaderBar from "@/components/HeaderBar";
import MyWritingListBOX from "@/components/my/MyWritingListBOX";
import SubTitle from "@/components/title/SubTitle";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { useMyQuestions } from "@/mock/my/useMyQuestions";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

type AnswerTab = "pending" | "answered";

export default function AnswerScreen() {
  const { questions } = useMyQuestions();
  const [activeTab, setActiveTab] = React.useState<AnswerTab>("answered");

  const filtered = React.useMemo(
    () => questions.filter((q) => q.status === activeTab),
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

      <View className="gap-3">
        {filtered.map((q) => (
          <MyWritingListBOX
            key={q.id}
            title={q.title}
            status={q.status}
            createdAt={q.createdAt}
            onPress={() => {
              if (q.status === "pending") {
                router.push({
                  pathname: "/(tabs)/my/answer/AnswerWrite" as any,
                  params: { id: String(q.id) },
                });
              } else {
                router.push({
                  pathname: "/(tabs)/my/answer/AnswerEdit" as any,
                  params: { id: String(q.id) },
                });
              }
            }}
          />
        ))}
      </View>
    </ParallaxScrollView>
  );
}
