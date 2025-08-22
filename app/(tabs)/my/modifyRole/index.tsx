import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { RoleChangeApplicant } from "@/mock/my/roleChangeListType";
import { useRoleChangeList } from "@/mock/my/useRoleChangeList";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import ModifyRoleCard from "./modifyRoleCard";

function ApplicantCard({
  item,
  onPress,
}: {
  item: RoleChangeApplicant;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <ModifyRoleCard item={item} />
    </Pressable>
  );
}

export default function ModifyRoleScreen() {
  const { applicants } = useRoleChangeList();
  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={<Text className="text-3xl font-extrabold">MY</Text>}
        ></HeaderBar>
      }
    >
      <SubTitle
        title="등급 수정하기"
        description={`학생회 등급을 신청한 학생들 입니다.\n명단을 확인하시고 올바른 학생들만 등급을 올려주세요.`}
      />

      <View className="flex-col gap-3">
        {applicants.map((item) => (
          <ApplicantCard
            key={item.id}
            item={item}
            onPress={() =>
              router.push("/(tabs)/my/modifyRole/modifyRoleDetail")
            }
          />
        ))}
      </View>
    </ParallaxScrollView>
  );
}
