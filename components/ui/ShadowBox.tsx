import { View } from "react-native";

export default function ShadowBox({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flex: 1,
        shadowColor: "#8e8e8e",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
      }}
    >
      {children}
    </View>
  );
}
