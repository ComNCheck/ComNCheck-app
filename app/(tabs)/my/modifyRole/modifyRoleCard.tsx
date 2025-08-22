import UserIcon from "@/assets/icons/userIcon.svg";
import { RoleChangeApplicant } from "@/mock/my/roleChangeListType";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Props = {
  item: RoleChangeApplicant;
};

export default function ModifyRoleCard({ item }: Props) {
  function Chip({
    label,
    variant = "gray",
  }: {
    label: string;
    variant?: "gray" | "blue";
  }) {
    const isBlue = variant === "blue";
    return (
      <View
        className={
          isBlue
            ? "rounded-md px-3 py-1 bg-[#E6F0FF]"
            : "rounded-md px-3 py-1 bg-[#F1F5F9]"
        }
      >
        <Text
          className={
            isBlue
              ? "text-sm font-semibold text-[#0077FF]"
              : "text-sm font-semibold text-[#475569]"
          }
        >
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View className="w-full bg-white rounded-xl border-[#E5E7EB] border-[0.5px] px-4 py-4">
      <View className="flex-row items-start justify-between w-full">
        <View className="flex-row items-center gap-3 flex-1">
          <UserIcon width={32} height={32} />
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-extrabold text-text">
                {item.name}
              </Text>
              {item.roleLabel ? (
                <View className="rounded-3xl px-2 py-1 border border-blue-500 bg-blue-500">
                  <Text className="text-xs font-bold text-white">
                    {item.roleLabel}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text className="text-base font-medium text-[#64758B] mt-2">
              {item.studentId}
            </Text>
          </View>
          <Feather name="chevron-right" size={22} color="#B6B6B6" />
        </View>
      </View>

      <View className="flex-row items-center gap-3 mt-4">
        {item.major ? <Chip label={item.major} variant="gray" /> : null}
        {item.requestedPosition ? (
          <Chip label={item.requestedPosition} variant="blue" />
        ) : null}
      </View>
    </View>
  );
}
