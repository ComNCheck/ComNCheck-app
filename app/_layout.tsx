import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect, useState } from "react";
import { Text as RNText, TextInput as RNTextInput, View } from "react-native";
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
  const [isReady, setIsReady] = useState(false); // <- 스플래시 표시 여부

  const Text = RNText as typeof RNText & DefaultPropsCompat;
  const TextInput = RNTextInput as typeof RNTextInput & DefaultPropsCompat;
  useEffect(() => {
    if (loaded) {
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
      //SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setIsReady(true);
        SplashScreen.hideAsync();
      }, 2000); // 2초 동안 스플래시 유지

      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!isReady) {
    return null; // 스플래시 유지 중 (React View 렌더링 X)
  }
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerTitleStyle: { fontFamily: "Pretendard-Bold" },
            headerBackTitleStyle: { fontFamily: "Pretendard-Regular" },
          }}
        >
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(setting)" options={{ headerShown: false }} />
          <Stack.Screen name="(notice)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
