import HeaderBar from "@/components/HeaderBar";
import SubTitle from "@/components/title/SubTitle";
import { Calendar } from "@/components/ui/Calendar";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CalendarEventCard from "../../../components/ui/CalendarEventCard";
import { getAnotherMajorEvent, getMajorEvent } from "../../apis/notice";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  buttonText: string;
}

interface MajorEventItem {
  id: number;
  eventName: string;
  date: string;
  location?: string;
}

const CalendarScreen = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // 데이터 불러오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [majorEvents, anotherEvents] = await Promise.all([
          getMajorEvent(),
          getAnotherMajorEvent(),
        ]);

        const parseEvent = (item: MajorEventItem): CalendarEvent => ({
          id: item.id,
          title: item.eventName,
          date: item.date, // string 그대로 저장
          location: item.location || "",
          buttonText: "신청하기",
        });

        const allEvents: CalendarEvent[] = [
          ...(majorEvents || []).map(parseEvent),
          ...(anotherEvents || []).map(parseEvent),
        ];

        setEvents(allEvents);
      } catch (e) {
        console.error("행사 데이터 불러오기 실패", e);
      }
    };
    fetchEvents();
  }, []);

  // 해당 날짜에 행사가 있는지 확인
  const eventOnSelectedDate = events.find(
    (e) =>
      selectedDate &&
      new Date(e.date).getFullYear() === selectedDate.getFullYear() &&
      new Date(e.date).getMonth() === selectedDate.getMonth() &&
      new Date(e.date).getDate() === selectedDate.getDate()
  );

  // 캘린더에 표시할 날짜에 행사 있는지 확인
  function isEventDay(date: Date) {
    return events.some(
      (e) =>
        new Date(e.date).getFullYear() === date.getFullYear() &&
        new Date(e.date).getMonth() === date.getMonth() &&
        new Date(e.date).getDate() === date.getDate()
    );
  }

  const handleEventPress = () => {
    // 이벤트 신청 로직 구현
    console.log("이벤트 신청하기");
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
      <View className="px-4">
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
            month={new Date(2025, 4, 1)}
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

        {/* 선택된 날짜의 이벤트 카드 */}
        {eventOnSelectedDate && (
          <CalendarEventCard
            event={eventOnSelectedDate}
            onPress={handleEventPress}
          />
        )}
      </View>
    </ParallaxScrollView>
  );
};

export default CalendarScreen;
