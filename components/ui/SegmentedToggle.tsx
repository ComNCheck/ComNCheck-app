import { Pressable, Text, View } from "react-native";

type Segment = {
  label: string;
  value: string;
};

export default function SegmentedToggle({
  segments,
  value,
  onChange,
}: {
  segments: Segment[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <View className="relative">
      <View className="flex-row">
        {segments.map((segment) => (
          <Pressable
            key={segment.value}
            className="w-1/2 pb-2 items-center"
            onPress={() => onChange(segment.value)}
            hitSlop={8}
          >
            <Text
              className={`text-xl font-bold ${
                value === segment.value ? "text-text" : "text-[#9CA3AF]"
              }`}
            >
              {segment.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E5E7EB]" />

      <View
        className="absolute bottom-0 h-[3px] bg-[#111827]"
        style={{ width: "50%", left: value === segments[0]?.value ? 0 : "50%" }}
      />
    </View>
  );
}
