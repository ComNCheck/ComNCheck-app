import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";

export default function MyStackLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </View>
  );
}
