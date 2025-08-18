import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import ShadowBox from "@/components/ui/ShadowBox";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useMyQuestions } from "@/mock/my/useMyQuestions";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const StatusBadge = ({ status }: { status: "answered" | "pending" }) => {
  const isAnswered = status === "answered";
  return (
    <View
      className="px-3 py-2 rounded-lg"
      style={{ backgroundColor: isAnswered ? "#FFFFFF" : "#FFFFFF" }}
    >
      <Text
        className="font-semibold"
        style={{ color: isAnswered ? "#3A3A3A" : "#B6B6B6" }}
      >
        {isAnswered ? "답변완료" : "답변예정"}
      </Text>
    </View>
  );
};

export default function MyWritingListScreen() {
  const { questions } = useMyQuestions();
  const [items, setItems] = React.useState(questions);

  React.useEffect(() => {
    setItems(questions);
  }, [questions]);

  const handleDelete = (id: number) => {
    Alert.alert("삭제", "이 글을 삭제할까요?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => setItems((prev) => prev.filter((q) => q.id !== id)),
      },
    ]);
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
        title="내가 쓴 글"
        description="내가 작성한 질문들을 한눈에 모아봤어요.\n답변이 완료된 질문은 수정할 수 없어요."
      />

      <View className="gap-3">
        {items.map((q) => (
          <Swipeable
            key={q.id}
            overshootRight={false}
            containerStyle={{ overflow: "visible" }}
            childrenContainerStyle={{ overflow: "visible" }}
            renderRightActions={() => (
              <Pressable
                onPress={() => handleDelete(q.id)}
                className="bg-red-500 h-full rounded-r-xl items-center justify-center"
                style={{ width: 80 }}
              >
                <FontAwesome name="trash" size={22} color="#ffffff" />
              </Pressable>
            )}
          >
            <ShadowBox>
              <View className="flex-row items-center justify-between mb-2">
                <Text
                  className="font-semibold"
                  style={{ color: "#111827" }}
                  numberOfLines={1}
                >
                  {q.title}
                </Text>
                <StatusBadge status={q.status} />
              </View>
              <Text className="text-[#9ca3af]">{q.createdAt}</Text>
            </ShadowBox>
          </Swipeable>
        ))}
      </View>
    </ParallaxScrollView>
  );
}
