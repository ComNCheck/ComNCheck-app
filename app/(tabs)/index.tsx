import HeaderBar from "@/components/HeaderBar";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { Text } from "react-native";

const CalendarScreen = () => {
  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={<Text className="text-3xl font-extrabold">과행사</Text>}
        />
      }
    ></ParallaxScrollView>
  );
};

export default CalendarScreen;
