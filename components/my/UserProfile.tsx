import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface UserProfileProps {
  role: string;
  name: string;
  studentId: string;
}

const roleLabels: Record<string, string> = {
  ROLE_ADMIN: "관리자",
  ROLE_MAJOR_PRESIDENT: "과회장",
  ROLE_STUDENT_COUNCIL: "학생회",
  ROLE_STUDENT: "학생",
  ROLE_GRADUATE_STUDENT: "졸업생",
};

export default function UserProfile({
  role,
  name,
  studentId,
}: UserProfileProps) {
  return (
    <View className="items-center">
      <View className="mb-4">
        <FontAwesome6 name="id-card" size={48} color="#3A3A3A" />
      </View>

      <Text className="text-lg text-gray-500 mb-2">
        {roleLabels[role] || role}
      </Text>
      <Text className="text-2xl font-bold mb-1">{name}</Text>

      {studentId === "학번 없음" ? (
        <View className="flex-row items-center gap-2 m-4">
          <Text className="text-base text-gray-500 font-medium">
            학번이 존재하지 않아요!
          </Text>
          <Pressable onPress={() => router.push("/(auth)/login/first")}>
            <Text className="text-sm text-black font-bold">
              학번 넣으러 가기&gt;
            </Text>
          </Pressable>
        </View>
      ) : (
        <Text className="text-lg text-gray-500 mb-8">{studentId}</Text>
      )}
    </View>
  );
}
