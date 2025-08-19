import { Switch, type SwitchProps, View } from "react-native";

/**
 * App-wide Switch with consistent size and default colors.
 */
export default function AppSwitch({
  trackColor = { false: "#d1d5db", true: "#3b82f6" },
  thumbColor = "#ffffff",
  ...rest
}: SwitchProps) {
  return (
    <View className="scale-[0.8]">
      <Switch {...rest} trackColor={trackColor} thumbColor={thumbColor} />
    </View>
  );
}
