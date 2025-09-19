import CompleteButton from "@/components/button/CompleteBtn";
import SubTitle from "@/components/title/SubTitle";
import CouncilName from "@/components/ui/CouncilName";
import ShadowBox from "@/components/ui/ShadowBox";
import SettingView from "@/components/view/SettingView";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getCouncilList } from "../apis/member";
import { Member, President } from "../apis/member.type";

export default function ListScreen() {
  const router = useRouter();

  const [president, setPresident] = useState<President | null>(null);
  const [councilList, setCouncilList] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCouncilList();
        console.log("Council List Response:", response);
        setPresident(response.president);
        setCouncilList(response.councilList);
      } catch (error) {
        console.error("Error fetching council list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <SettingView>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#808080" />
        </View>
      </SettingView>
    );
  }
  return (
    <SettingView>
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
                {president?.name}
              </Text>
              <Text className="font-black text-lg">️🎁 학생회 </Text>
              <View className="flex-1 flex-row flex-wrap justify-between border-[#FAFAFA] border-[2px] rounded-xl p-4">
                {councilList?.map((item, index) => (
                  <View
                    key={`${item.name}-${item.position}-${index}`}
                    style={{
                      width: "48%",
                      marginBottom: 8,
                    }}
                  >
                    <CouncilName name={item.name} position={item.position} />
                  </View>
                ))}
              </View>
            </View>
          </ShadowBox>
          <CompleteButton content="확인완료" onPress={handleClick} />
        </View>
      </View>
    </SettingView>
  );
}
