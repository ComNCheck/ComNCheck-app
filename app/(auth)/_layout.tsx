import { Stack } from "expo-router";
import "react-native-reanimated";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login/index" />
      <Stack.Screen name="login/first" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="signup/done" />
    </Stack>
  );
}
