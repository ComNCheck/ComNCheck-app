import { Tabs, router } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            backgroundColor: Colors["light"].background,
          },
          default: {},
        }),
        tabBarLabelStyle: { fontFamily: "Pretendard-SemiBold" },
      }}
    >
      <Tabs.Screen
        name="qna"
        options={{
          title: "QnA",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name="question-answer" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notice"
        options={{
          title: "공지",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "과행사",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar-check-o" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "MY",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(tabs)/my");
          },
        }}
      />
    </Tabs>
  );
}
