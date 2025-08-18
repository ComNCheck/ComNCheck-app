import { QuestionStatus } from "@/mock/my/types";
import { Pressable, Text, View } from "react-native";

interface MyWritingListBoxProps {
  title: string;
  status: QuestionStatus;
  createdAt: string;
  onPress?: () => void;
}

const StatusText = ({ status }: { status: QuestionStatus }) => {
  const isAnswered = status === "answered";
  return (
    <Text
      className="text-lg font-bold"
      style={{ color: isAnswered ? "#3A3A3A" : "#B6B6B6" }}
    >
      {isAnswered ? "답변완료" : "답변예정"}
    </Text>
  );
};

export default function MyWritingListBOX({
  title,
  status,
  createdAt,
  onPress,
}: MyWritingListBoxProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full items-start justify-between p-4 bg-white rounded-lg border-[#E5E7EB] border-[0.5px] active:opacity-80"
    >
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-col">
          <Text className="text-sm font-bold text-text" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-sm font-medium text-[#666]">{createdAt}</Text>
        </View>
        <StatusText status={status} />
      </View>
    </Pressable>
  );
}
