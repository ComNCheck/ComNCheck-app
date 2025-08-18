import ShadowBox from "@/components/ui/ShadowBox";
import { QuestionStatus } from "@/mock/my/types";
import { Pressable, Text, View } from "react-native";

interface MyWritingListBoxProps {
  title: string;
  status: QuestionStatus;
  createdAt: string;
  onPress?: () => void;
}

const StatusBadge = ({ status }: { status: QuestionStatus }) => {
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

export default function MyWritingListBOX({
  title,
  status,
  createdAt,
  onPress,
}: MyWritingListBoxProps) {
  return (
    <Pressable onPress={onPress} className="active:opacity-80">
      <ShadowBox>
        <View className="flex-row items-center justify-between mb-2">
          <Text
            className="font-semibold"
            style={{ color: "#111827" }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <StatusBadge status={status} />
        </View>
        <Text className="text-[#9ca3af]">{createdAt}</Text>
      </ShadowBox>
    </Pressable>
  );
}
