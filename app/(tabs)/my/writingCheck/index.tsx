import { getMyQuestions } from "@/app/apis/question";
import { QuestionResponseDTO } from "@/app/apis/question.type";
import HeaderBar from "@/components/HeaderBar";
import MyWritingListBOX from "@/components/my/MyWritingListBOX";
import SubTitle from "@/components/title/SubTitle";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

// 상태 뱃지는 `MyWritingListBOX` 내부로 이동했습니다.

export default function MyWritingListScreen() {
  const [items, setItems] = React.useState<QuestionResponseDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchMyQuestions = async () => {
      try {
        setLoading(true);
        const questions = await getMyQuestions();
        setItems(questions);
      } catch (error) {
        console.error("내가 쓴 글 조회 중 오류 발생:", error);
        Alert.alert("오류", "내가 쓴 글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyQuestions();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("삭제", "이 글을 삭제할까요?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          // TODO: 실제 삭제 API 호출
          setItems((prev) => prev.filter((q) => q.majorQuestionId !== id));
        },
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
        {loading ? (
          <Text className="text-center text-gray-500 py-8">로딩 중...</Text>
        ) : items.length === 0 ? (
          <Text className="text-center text-gray-500 py-8">
            작성한 글이 없습니다.
          </Text>
        ) : (
          items.map((q) => {
            const status = q.answer ? "answered" : "pending";
            return (
              <Swipeable
                key={q.majorQuestionId}
                overshootRight={false}
                containerStyle={{ overflow: "visible" }}
                childrenContainerStyle={{ overflow: "visible" }}
                renderRightActions={() => (
                  <Pressable
                    onPress={() => handleDelete(q.majorQuestionId)}
                    className="bg-red-500 h-full rounded-r-xl items-center justify-center w-10"
                  >
                    <FontAwesome name="trash" size={22} color="#ffffff" />
                  </Pressable>
                )}
              >
                <MyWritingListBOX
                  title={q.title}
                  status={status}
                  createdAt={new Date(q.createdAt)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\./g, ".")
                    .replace(/\s/g, "")}
                  onPress={() => {
                    if (status === "answered") {
                      router.push({
                        pathname: "/(tabs)/my/writingCheck/MyWritingListDetail",
                        params: { id: String(q.majorQuestionId) },
                      });
                    } else {
                      router.push({
                        pathname: "/(tabs)/my/writingCheck/MyWritingEdit",
                        params: { id: String(q.majorQuestionId) },
                      });
                    }
                  }}
                />
              </Swipeable>
            );
          })
        )}
      </View>
    </ParallaxScrollView>
  );
}
