import CompleteButton from "@/components/button/CompleteBtn";
import HeaderBar from "@/components/HeaderBar";
import AppliedEventCard from "@/components/my/appliedEvent/AppliedEventCard";
import SubTitle from "@/components/title/SubTitle";
import { useAppliedEvents } from "@/mock/my/useAppliedEvents";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function MyAppliedEventsScreen() {
  const router = useRouter();
  const { items, toggleLike, loading, error, refetch } = useAppliedEvents();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  return (
    <View className="flex-1 bg-background">
      <HeaderBar
        backgroundColor="#fafafa"
        left={
          <View className="flex-row items-center">
            <Pressable onPress={() => router.back()} className="mr-2">
              <MaterialCommunityIcons
                name="arrow-left"
                size={22}
                color="#111827"
              />
            </Pressable>
            <Text className="text-xl font-bold text-text">돌아가기</Text>
          </View>
        }
      />

      <ScrollView
        className="flex-1 px-5 pt-[100px]"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <SubTitle
          title="내가 쓴 행사"
          description={`내가 원하는 행사를 등록할 수 있어요.\n투표를 통해 올라간 행사는 학생회 논의를 통해\n실제 과행사로 만들어질 수 있어요!`}
        />

        <View className="mt-2 mb-3">
          <Text className="text-base font-semibold text-[#6B7280]">
            전체 {items.length}개
          </Text>
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center py-8">
            <Text className="text-gray-500">로딩 중...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center py-8">
            <Text className="text-red-500 mb-4">{error}</Text>
            <Pressable
              onPress={refetch}
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white">다시 시도</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            {items.length === 0 ? (
              <View className="flex-1 justify-center items-center py-8">
                <Text className="text-gray-500">
                  아직 제안한 행사가 없습니다.
                </Text>
              </View>
            ) : (
              items.map((item) => (
                <AppliedEventCard
                  key={item.id}
                  item={item}
                  expanded={expandedId === item.id}
                  onToggleLike={(id) => toggleLike(id)}
                  onToggleExpand={(id) =>
                    setExpandedId((prev) => (prev === id ? null : id))
                  }
                  useEmojiForTopThree={false}
                />
              ))
            )}
          </View>
        )}

        <View className="h-6" />
        <CompleteButton
          content="행사 제안"
          onPress={() => router.push("/(tabs)/my/appliedEvent/propose" as Href)}
        />
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
