import type { PropsWithChildren, ReactElement } from "react";
import Animated from "react-native-reanimated";

import { ThemedView } from "@/components/view/ThemedView";
import { View } from "react-native";

const HEADER_HEIGHT = 100;
type Props = PropsWithChildren<{
  headerBar: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

export default function NormalScrollView({ children, headerBar }: Props) {
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
        }}
      >
        <ThemedView className="flex-1 p-6 gap-4 overflow-hidden">
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
