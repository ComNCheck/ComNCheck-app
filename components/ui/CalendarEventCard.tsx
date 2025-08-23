import { Text, TouchableOpacity, View } from "react-native";

// CalendarEvent 타입 정의
interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  buttonText: string;
}

interface EventCardProps {
  event: CalendarEvent;
  onPress?: () => void;
}

function CalendarEventCard({ event, onPress }: EventCardProps) {
  const dateObj = new Date(event.date);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    };
    return date.toLocaleDateString("ko-KR", options);
  };

  return (
    <View className="flex-row items-center justify-between bg-[#FAFAFA] rounded-2xl border-2 border-gray-100 p-6 mb-24 shadow-sm">
      <View className="flex-1 gap-2">
        <Text className="text-xl font-bold text-gray-900 mb-2">
          {event.title}
        </Text>
        <View className="gap-1">
          <Text className="text-base text-gray-700">{formatDate(dateObj)}</Text>
          {event.location && (
            <Text className="text-base text-gray-700">
              [{event.location}]에서 만나요
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={onPress}
        className="bg-gray-900 rounded-full px-6 py-3 mt-3"
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-semibold">
          {event.buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default CalendarEventCard;
