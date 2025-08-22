import CompleteButton from "@/components/button/CompleteBtn";
import HeaderBar from "@/components/HeaderBar";
import AppliedEventCard from "@/components/my/appliedEvent/AppliedEventCard";
import SegmentedToggle from "@/components/ui/SegmentedToggle";
import { useAppliedEvents } from "@/mock/my/useAppliedEvents";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

export default function AppliedEventScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "top5">("top5");
  const { items, toggleLike } = useAppliedEvents();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayItems = useMemo(() => {
    if (tab === "top5") return items.slice(0, 5);
    return items;
  }, [items, tab]);

  const handleToggleLike = (id: string) => {
    toggleLike(id);
  };

  const handlePressItem = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
      >
        <Pressable onPress={() => router.push("/(tabs)/my/writingCheck")}>
          <Text className="text-base font-semibold text-[#6B7280]">
            내가 쓴 행사 확인하기
          </Text>
        </Pressable>
      </HeaderBar>

      <ScrollView
        className="flex-1 px-5 pt-[140px]"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="mb-4">
          <SegmentedToggle
            segments={[
              { label: "전체", value: "all" },
              { label: "TOP 5", value: "top5" },
            ]}
            value={tab}
            onChange={(next) => setTab(next as "all" | "top5")}
          />
        </View>

        {tab === "top5" ? (
          <>
            <Text className="text-base font-semibold text-[#6B7280] mb-2">
              총 348명 참여중
            </Text>
            <Text className="text-4xl font-semibold text-text mb-4">TOP 5</Text>
          </>
        ) : (
          <Text className="text-base font-semibold text-[#6B7280] mb-2">
            전체 245개
          </Text>
        )}

        <FlatList
          data={displayItems}
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => (
            <AppliedEventCard
              item={item}
              expanded={expandedId === item.id}
              onToggleLike={handleToggleLike}
              onToggleExpand={handlePressItem}
              useEmojiForTopThree={tab === "top5"}
            />
          )}
          scrollEnabled={false}
        />

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
