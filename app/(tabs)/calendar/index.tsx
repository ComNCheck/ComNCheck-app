import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import { Calendar } from "@/components/ui/Calendar";
import CalendarEventCard from "@/components/ui/CalendarEventCard";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import {
  getAnotherMajorEvent,
  getMajorEvent,
  majorEventItem,
} from "@/mock/calendar/api";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEvents, setSelectedEvents] = useState<majorEventItem[]>([]);
  const [events, setEvents] = useState<majorEventItem[]>([]);

  // 캘린더 표시용 이벤트 데이터 로딩
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [majorEvents, anotherEvents] = await Promise.all([
          getMajorEvent(),
          getAnotherMajorEvent(),
        ]);

        const allEvents = [...(majorEvents || []), ...(anotherEvents || [])];
        setEvents(allEvents);
      } catch (e) {
        console.error("행사 데이터 불러오기 실패", e);
      }
    };
    fetchEvents();
  }, []);

  // CalendarEventCard에서 전달받은 선택된 이벤트들 처리
  const handleSelectedEventsChange = (events: majorEventItem[]) => {
    setSelectedEvents(events);
  };

  // 캘린더에 표시할 날짜에 행사 있는지 확인
  function isEventDay(date: Date) {
    return events.some(
      (e) =>
        new Date(e.date).getFullYear() === date.getFullYear() &&
        new Date(e.date).getMonth() === date.getMonth() &&
        new Date(e.date).getDate() === date.getDate()
    );
  }

  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={<Text className="text-3xl font-extrabold">과행사</Text>}
        />
      }
    >
      <View>
        {/* 제목과 설명 */}
        <SubTitle
          title="행사 한눈에 보기"
          description="아래 달력에서 원하는 날짜를 클릭하고 행사를 확인해요"
        />

        {/* 캘린더 */}
        <View className="my-8">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={new Date()}
            modifiers={{
              event: isEventDay,
            }}
            modifiersClassNames={{
              event: "event-day",
            }}
          />
        </View>

        {/* 구분선 */}
        <View className="h-px bg-gray-200 my-8" />

        {/* 이벤트 카드 */}
        <CalendarEventCard
          selectedDate={selectedDate}
          onSelectedEventsChange={handleSelectedEventsChange}
          showOnlySelected={false}
        />

        {/* 선택된 이벤트 목록 표시 (옵션) */}
        {selectedEvents.length > 0 && (
          <View className="mt-6 p-4 bg-blue-50 rounded-lg">
            <Text className="text-base font-semibold text-blue-800 mb-2">
              선택된 행사 ({selectedEvents.length}개)
            </Text>
            {selectedEvents.map((event) => (
              <Text key={event.id} className="text-sm text-blue-700 mb-1">
                • {event.eventName}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ParallaxScrollView>
  );
};

export default CalendarScreen;
