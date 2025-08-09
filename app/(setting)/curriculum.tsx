import ScrollBox from "@/components/ui/ScrollBox";
import SettinglView from "@/components/view/SettingView";
import { Text } from "react-native";

export default function CurriculumScreen() {
  //const router = useRouter();
  return (
    <SettinglView>
      <ScrollBox>
        <Text>이수체계도</Text>
      </ScrollBox>
    </SettinglView>
  );
}
