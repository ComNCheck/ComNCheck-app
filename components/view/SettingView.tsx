import type { PropsWithChildren } from "react";

import { ThemedView } from "@/components/view/ThemedView";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import HeaderBar from "../HeaderBar";

const HEADER_HEIGHT = 120;
type Props = PropsWithChildren<{
  headerBackgroundColor?: { dark: string; light: string };
}>;

export default function SettingView({ children }: Props) {
  const router = useRouter();
  return (
    <ThemedView className="flex-1">
      <View
        className="absolute top-0 left-0 right-0 z-50"
        style={{ height: HEADER_HEIGHT }}
      >
        <HeaderBar
          backgroundColor="#DAEBFF"
          left={
            <Pressable
              onPress={() => router.back()}
              className="flex-row gap-2 items-center"
            >
              <Entypo name="chevron-left" size={28} color="#3a3a3a" />
              <Text className="font-extrabold text-2xl">설정</Text>
            </Pressable>
          }
        />
      </View>
      <ThemedView
        className="flex-1 px-6 py-8 overflow-hidden"
        style={{
          paddingTop: HEADER_HEIGHT,
        }}
      >
        {children}
      </ThemedView>
    </ThemedView>
  );
}
