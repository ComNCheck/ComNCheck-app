import type { PropsWithChildren, ReactElement } from "react";
import Animated from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";
import { useBottomTabOverflow } from "./ui/TabBarBackground";

const HEADER_HEIGHT = 100;
type Props = PropsWithChildren<{
  headerBar: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

export default function ParallaxScrollView({ children, headerBar }: Props) {
  const bottom = useBottomTabOverflow();
  return (
    <ThemedView className="flex-1">
      <View
        className="absolute top-0 left-0 right-0 z-50"
        style={{ height: HEADER_HEIGHT }}
      >
        {headerBar}
      </View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT,
          paddingBottom: bottom,
        }}
        scrollIndicatorInsets={{ bottom }}
      >
        <ThemedView className="flex-1 p-4 gap-4 overflow-hidden">
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
