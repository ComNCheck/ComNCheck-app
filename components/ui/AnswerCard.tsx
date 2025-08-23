import { Text, View } from "react-native";

interface AnswerCardProps {
  answer: string;
}
export default function AnswerCard({ answer }: AnswerCardProps) {
  return (
    <View className="min-h-12 h-auto p-2 border-[1px] border-[#E6E6E6] rounded-xl items-center justify-center">
      <Text className="text-text text-sm font-semibold">{answer}</Text>
    </View>
  );
}
