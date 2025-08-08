import type { PropsWithChildren, ReactElement } from "react";

import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";

const HEADER_HEIGHT = 120;
type Props = PropsWithChildren<{
  headerBar: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

export default function SettinglView({ children, headerBar }: Props) {
  return (
    <ThemedView className="flex-1">
      <View
        className="absolute top-0 left-0 right-0 z-50"
        style={{ height: HEADER_HEIGHT }}
      >
        {headerBar}
      </View>
      <ThemedView
        className="flex-1 p-4 gap-2 overflow-hidden"
        style={{
          // 고정된 헤더의 높이만큼 상단 패딩을 줍니다.
          paddingTop: HEADER_HEIGHT,
        }}
      >
        {children}
      </ThemedView>{" "}
    </ThemedView>
  );
}
