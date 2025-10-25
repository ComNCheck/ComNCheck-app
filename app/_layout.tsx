import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "react-native-reanimated";

import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect } from "react";
import { Text as RNText, TextInput as RNTextInput } from "react-native";
interface DefaultPropsCompat {
  defaultProps?: any;
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  const Text = RNText as typeof RNText & DefaultPropsCompat;
  const TextInput = RNTextInput as typeof RNTextInput & DefaultPropsCompat;

  useEffect(() => {
    if (loaded) {
      // 폰트 기본 스타일 설정
      if (Text.defaultProps == null) Text.defaultProps = {};
      Text.defaultProps.style = [
        { fontFamily: "Pretendard-Regular" },
        Text.defaultProps.style,
      ];
      if (TextInput.defaultProps == null) TextInput.defaultProps = {};
      TextInput.defaultProps.style = [
        { fontFamily: "Pretendard-Regular" },
        TextInput.defaultProps.style,
      ];

      // 스플래시 화면 숨기기
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            headerTitleStyle: loaded
              ? { fontFamily: "Pretendard-Bold" }
              : undefined,
            headerBackTitleStyle: loaded
              ? { fontFamily: "Pretendard-Regular" }
              : undefined,
          }}
        >
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(setting)" options={{ headerShown: false }} />
          <Stack.Screen name="test" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
