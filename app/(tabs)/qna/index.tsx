import HeaderBar from "@/components/HeaderBar";
import AnsweredListItem from "@/components/my/AnsweredListItem";
import SubTitle from "@/components/title/SubTitle";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useMemberData } from "@/mock/my/useMemberData";
import { useMyQuestions } from "@/mock/my/useMyQuestions";
import { router } from "expo-router";
import { Text, View } from "react-native"; // View를 올바른 위치에서 import
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function QnATab() {
  const { role, name, studentId } = useMemberData();
  const insets = useSafeAreaInsets();
  const { questions } = useMyQuestions();
  const answered = questions.filter((q) => q.status === "answered");

  let bottom = 0;
  try {
    bottom = useBottomTabOverflow();
  } catch (e) {
    bottom = 0;
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
            description="답변 완료된 질문들이에요.\n 질문을 눌러 답변을 확인해보세요! "
          />
          <View className="gap-3">
            {answered.map((q, idx) => (
              <AnsweredListItem
                key={q.id}
                index={idx + 1}
                title={q.title}
                createdAt={q.createdAt}
                onPress={() =>
                  router.push({
                    pathname:
                      "/(tabs)/my/writingCheck/MyWritingListDetail" as any,
                    params: { id: String(q.id) },
                  })
                }
              />
            ))}
          </View>
        </View>
      </ParallaxScrollView>
    </>
  );
}
