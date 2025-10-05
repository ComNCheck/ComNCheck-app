import HeaderBar from "@/components/HeaderBar";
import AnsweredListItem from "@/components/my/AnsweredListItem";
import SubTitle from "@/components/title/SubTitle";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useAnsweredQuestions } from "@/hooks/useAnsweredQuestions";
import { router } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function QnATab() {
  const { questions, loading, error } = useAnsweredQuestions();
  const bottom = useBottomTabOverflow();

  if (loading) {
    return (
      <>
        <ParallaxScrollView
          headerBar={
            <HeaderBar
              backgroundColor="#fafafa"
              left={<Text className="text-3xl font-extrabold">Q&A</Text>}
            />
          }
        >
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#007AFF" />
            <Text className="text-gray-500 mt-4">질문을 불러오는 중...</Text>
          </View>
        </ParallaxScrollView>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ParallaxScrollView
          headerBar={
            <HeaderBar
              backgroundColor="#fafafa"
              left={<Text className="text-3xl font-extrabold">Q&A</Text>}
            />
          }
        >
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-red-500 text-center">
              오류가 발생했습니다
            </Text>
            <Text className="text-gray-500 text-center mt-2">{error}</Text>
          </View>
        </ParallaxScrollView>
      </>
    );
  }

  return (
    <>
      <ParallaxScrollView
        headerBar={
          <HeaderBar
            backgroundColor="#fafafa"
            left={<Text className="text-3xl font-extrabold">Q&A</Text>}
          />
        }
      >
        <View>
          <SubTitle
            title="컴퓨터공학부 QnA"
            description="답변 완료된 질문들이에요.\n질문을 눌러 답변을 확인해보세요! "
          />
          <View className="gap-3">
            {questions.length === 0 ? (
              <View className="flex-1 justify-center items-center py-20">
                <Text className="text-gray-500 text-center">
                  아직 답변된 질문이 없습니다.
                </Text>
              </View>
            ) : (
              questions.map((q, idx) => (
                <AnsweredListItem
                  key={q.majorQuestionId}
                  index={idx + 1}
                  title={q.title}
                  createdAt={new Date(q.createdAt)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\./g, ".")
                    .replace(/\s/g, "")}
                  onPress={() =>
                    router.push({
                      pathname:
                        "/(tabs)/my/writingCheck/MyWritingListDetail" as any,
                      params: { id: String(q.majorQuestionId) },
                    })
                  }
                />
              ))
            )}
          </View>
        </View>
      </ParallaxScrollView>
    </>
  );
}
