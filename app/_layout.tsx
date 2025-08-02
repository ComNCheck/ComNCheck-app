import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect } from "react";
import { Text as RNText, TextInput as RNTextInput } from "react-native";

interface DefaultPropsCompat {
  defaultProps?: any;
}

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
    }
  }, [loaded]);
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerTitleStyle: { fontFamily: "Pretendard-Bold" },
          headerBackTitleStyle: { fontFamily: "Pretendard-Regular" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
