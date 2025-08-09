import CompleteButton from "@/components/button/CompleteBtn";
import SubTitle from "@/components/title/SubTitle";
import CouncilName from "@/components/ui/CouncilName";
import ShadowBox from "@/components/ui/ShadowBox";
import SettinglView from "@/components/view/SettingView";
import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function ListScreen() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  const councilData = [
    { name: "박수정", position: "과회장" },
    { name: "이예림", position: "기획국장" },
    { name: "이예림", position: "기획국장" },
    { name: "이예림", position: "기획국장" },
    { name: "이예림", position: "기획국장" },
  ];
  return (
    <SettinglView>
      <View className="flex-1 justify-around">
        <SubTitle
          title="학생회 명단"
          description="2025년도 학생회 명단이에요."
        />
        <View className="flex-1 gap-8 mb-6">
          <ShadowBox>
            <View className="flex-1 bg-white gap-4">
              <Text className="font-black text-lg gap-2">
                👑 과회장{"  "}
                {councilData.find((item) => item.position === "과회장")?.name}
              </Text>
              <Text className="font-black text-lg">️🎁 학생회 </Text>
              <View className="flex-1">
                <FlatList
                  data={councilData}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  className="border-[#FAFAFA] border-[2px] rounded-xl p-4"
                  renderItem={({ item }) => (
                    <CouncilName name={item.name} position={item.position} />
                  )}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                  }}
                  contentContainerStyle={{ padding: 8 }}
                />
              </View>
            </View>
          </ShadowBox>
          <CompleteButton content="확인완료" onPress={handleClick} />
        </View>
      </View>
    </SettinglView>
  );
}
