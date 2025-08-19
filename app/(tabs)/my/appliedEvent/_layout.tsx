import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";

export default function AppliedEventStackLayout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </View>
  );
}
