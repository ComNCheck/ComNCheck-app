import type { PropsWithChildren, ReactElement } from "react";
import Animated from "react-native-reanimated";

import { ThemedView } from "@/components/view/ThemedView";
import { View } from "react-native";

const HEADER_HEIGHT = 140;
type Props = PropsWithChildren<{
  headerBar: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

export default function NormalScrollView({ children, headerBar }: Props) {
  return (
    <ThemedView className="flex-1">
      <View className="absolute top-0 left-0 right-0 z-50 h-[140px]">
        {headerBar}
      </View>
      <Animated.ScrollView scrollEventThrottle={16} contentContainerStyle={{}}>
        <ThemedView className="flex-1 p-6 pt-[140px] gap-4 overflow-hidden">
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
