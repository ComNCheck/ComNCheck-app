import { CalendarResponseDTO } from "@/app/apis/calendar.type";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface EventCheckProps {
  selectedDate?: Date;
  onSelectedEventsChange?: (events: CalendarResponseDTO[]) => void;
  showOnlySelected?: boolean;
  events?: CalendarResponseDTO[]; // 외부에서 이벤트 데이터를 받을 수 있도록 추가
}

export default function CalendarEventCard({
  selectedDate,
  onSelectedEventsChange,
  showOnlySelected = false,
  events: externalEvents,
}: EventCheckProps) {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarResponseDTO[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarResponseDTO[]>(
    []
  );
  const [selectedEvents, setSelectedEvents] = useState<CalendarResponseDTO[]>(
    []
  );

  // 외부에서 전달받은 이벤트 데이터 사용
  useEffect(() => {
    if (externalEvents) {
      setEvents(externalEvents);
    }
  }, [externalEvents]);

  // 선택된 날짜에 해당하는 이벤트 필터링
  useEffect(() => {
    if (!selectedDate) {
      setFilteredEvents([]);
      return;
    }

    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    });

    setFilteredEvents(filtered);
  }, [selectedDate, events]);

  // 선택된 이벤트가 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    onSelectedEventsChange?.(selectedEvents);
  }, [selectedEvents, onSelectedEventsChange]);

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  // D-day 계산 함수
  const calculateDday = (date: Date) => {
    const today = new Date();
    const targetDate = new Date(date);

    // 시간을 제거하고 날짜만 비교
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "D-Day";
    if (diffDays > 0) return `D-${diffDays}`;
    return `D+${Math.abs(diffDays)}`;
  };

  // 선택 해제
  const handleDeselect = (eventToDeselect: CalendarResponseDTO) => {
    setSelectedEvents((prev) =>
      prev.filter((event) => event.id !== eventToDeselect.id)
    );
  };

  // 선택된 이벤트인지 확인
  const isEventSelected = (event: CalendarResponseDTO) => {
    return selectedEvents.some(
      (selectedEvent) => selectedEvent.id === event.id
    );
  };

  // 이벤트 상세 페이지로 이동
  const handleEventPress = (event: CalendarResponseDTO) => {
    router.push(`/(tabs)/calendar/detail/${event.id}`);
  };

  return (
    <View className="w-full relative">
      <View className="bg-white border border-gray-200 rounded-lg p-4">
        {selectedDate ? (
          <>
            <View className="mb-4 flex-row justify-between items-center">
              <Text className="text-lg font-bold text-black">
                | {formatDate(selectedDate)}
              </Text>
              <Text className="text-sm text-gray-400">
                {calculateDday(selectedDate)}
              </Text>
            </View>

            <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    className={`p-3 rounded flex-row justify-between items-center mb-2 ${
                      isEventSelected(event)
                        ? "bg-blue-100 border-2 border-blue-300"
                        : "bg-gray-50"
                    }`}
                    onPress={() => handleEventPress(event)}
                    onLongPress={() => {
                      if (isEventSelected(event)) {
                        handleDeselect(event);
                      } else {
                        setSelectedEvents((prev) => [...prev, event]);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <Text
                      className="text-black flex-1 text-base mr-2"
                      numberOfLines={1}
                    >
                      {event.eventName}
                    </Text>

                    <View className="flex-row items-center">
                      {isEventSelected(event) && (
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color="#2563eb"
                          className="mr-2"
                        />
                      )}

                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color="#6b7280"
                      />
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View className="py-8">
                  <Text className="text-gray-500 text-center">
                    해당 날짜에 예정된 행사가 없습니다.
                  </Text>
                </View>
              )}
            </ScrollView>

            {!showOnlySelected && selectedEvents.length > 0 && (
              <View className="mb-4 p-3 bg-blue-50 rounded-lg">
                <Text className="text-sm font-medium text-blue-800 mb-2">
                  선택된 행사 ({selectedEvents.length}개)
                </Text>
                {selectedEvents.map((event) => (
                  <View
                    key={event.id}
                    className="flex-row justify-between items-center mb-1"
                  >
                    <Text
                      className="text-xs text-blue-700 flex-1"
                      numberOfLines={1}
                    >
                      {event.eventName}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleDeselect(event)}
                      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    >
                      <Text className="text-red-500 ml-2 text-lg">×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </>
        ) : (
          <View className="py-8">
            <Text className="text-center text-gray-500 mb-4">
              달력에서 날짜를 선택해주세요
            </Text>
          </View>
        )}
      </View>

      {/* 선택된 행사만 표시 중 알림 */}
      {showOnlySelected && selectedEvents.length > 0 && (
        <View className="mt-4 p-4 bg-blue-50 rounded-lg">
          <Text className="text-sm font-medium text-blue-800 mb-2">
            선택된 행사만 표시 중 ({selectedEvents.length}개)
          </Text>
          {selectedEvents.map((event) => (
            <Text
              key={event.id}
              className="text-xs text-blue-700 mb-1"
              numberOfLines={1}
            >
              {event.eventName}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
