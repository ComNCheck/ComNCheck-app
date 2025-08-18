import type { PropsWithChildren, ReactElement } from "react";
import Animated from "react-native-reanimated";

import { ThemedView } from "@/components/view/ThemedView";
import { View } from "react-native";
import { useBottomTabOverflow } from "../ui/TabBarBackground";

const HEADER_HEIGHT = 100;
type Props = PropsWithChildren<{
  headerBar: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

export default function ParallaxScrollView({ children, headerBar }: Props) {
  // Bottom Tab Navigator가 없을 때를 대비한 안전한 처리
  let bottom = 0;

  try {
    bottom = useBottomTabOverflow();
  } catch (error) {
    // Bottom Tab Navigator가 없으면 기본값 0 사용
    console.warn(
      "Bottom Tab Navigator not found, using default bottom padding"
    );
    bottom = 0;
  }

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
        <ThemedView className="flex-1 p-6 gap-4">{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
