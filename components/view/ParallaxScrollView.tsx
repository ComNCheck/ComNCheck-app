import type { PropsWithChildren, ReactElement } from "react";
import Animated from "react-native-reanimated";

import { ThemedView } from "@/components/view/ThemedView";
import { View } from "react-native";
import { useBottomTabOverflow } from "../ui/TabBarBackground";
type Props = PropsWithChildren<{
  headerBar: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

export default function ParallaxScrollView({ children, headerBar }: Props) {
  const bottom = useBottomTabOverflow();

  return (
    <ThemedView className="flex-1">
      <View className="absolute top-0 left-0 right-0 z-50 h-[120px]">
        {headerBar}
      </View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: bottom }}
        scrollIndicatorInsets={{ bottom }}
      >
        <ThemedView className="flex-1 p-6 pt-[120px] gap-4">
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
