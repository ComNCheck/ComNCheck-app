import { getCalendarEvents } from "@/app/apis/calendar";
import { CalendarResponseDTO } from "@/app/apis/calendar.type";
import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import { Calendar } from "@/components/ui/Calendar";
import CalendarEventCard from "@/components/ui/CalendarEventCard";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEvents, setSelectedEvents] = useState<CalendarResponseDTO[]>(
    []
  );
  const [events, setEvents] = useState<CalendarResponseDTO[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // 캘린더 표시용 이벤트 데이터 로딩
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        console.log("달력 API 호출 시작:", {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        });

        const eventsData = await getCalendarEvents({
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        });

        console.log("달력 API 응답:", eventsData);
        setEvents(eventsData || []);
      } catch (e) {
        console.error("행사 데이터 불러오기 실패", e);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [currentMonth]);

  // CalendarEventCard에서 전달받은 선택된 이벤트들 처리
  const handleSelectedEventsChange = (events: CalendarResponseDTO[]) => {
    setSelectedEvents(events);
  };

  // 캘린더에 표시할 날짜에 행사 있는지 확인
  function isEventDay(date: Date) {
    console.log(
      "isEventDay 호출:",
      date.toDateString(),
      "현재 events 수:",
      events.length
    );

    const hasEvent = events.some((e) => {
      // 날짜 비교를 더 안전하게 처리
      const eventDate = new Date(e.date);
      const targetDate = new Date(date);

      // 시간을 0으로 설정하여 날짜만 비교
      eventDate.setHours(0, 0, 0, 0);
      targetDate.setHours(0, 0, 0, 0);

      const isMatch = eventDate.getTime() === targetDate.getTime();

      if (isMatch) {
        console.log("행사 매치 발견:", {
          eventDate: e.date,
          eventName: e.eventName,
          targetDate: date.toDateString(),
        });
      }

      return isMatch;
    });

    // 디버깅을 위한 로그
    if (hasEvent) {
      console.log(
        "행사가 있는 날:",
        date.toDateString(),
        "행사 수:",
        events.length
      );
    }

    return hasEvent;
  }

  // 캘린더 월 변경 핸들러
  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

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
            month={currentMonth}
            onMonthChange={handleMonthChange}
            modifiers={{
              event: isEventDay,
            }}
            modifiersClassNames={{
              event: "event-day",
            }}
          />
          {loading && (
            <View className="mt-4 p-4 bg-gray-100 rounded-lg">
              <Text className="text-center text-gray-600">
                행사 데이터를 불러오는 중...
              </Text>
            </View>
          )}
        </View>

        {/* 구분선 */}
        <View className="h-px bg-gray-200 my-8" />

        {/* 이벤트 카드 */}
        <CalendarEventCard
          selectedDate={selectedDate}
          onSelectedEventsChange={handleSelectedEventsChange}
          showOnlySelected={false}
          events={events}
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
