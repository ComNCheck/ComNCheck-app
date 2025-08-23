import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface CalendarProps {
  mode?: string;
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
  style?: ViewStyle;
  month?: Date;
  modifiers?: Record<string, (date: Date) => boolean>;
  modifiersClassNames?: Record<string, string>;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function Calendar({
  selected,
  onSelect,
  style,
  month,
  modifiers,
  modifiersClassNames,
}: CalendarProps) {
  // 현재 보여지는 달 상태
  const [viewMonth, setViewMonth] = React.useState<Date>(month ?? new Date());
  // 선택된 날짜 상태
  const [date, setDate] = React.useState<Date | undefined>(
    selected ?? undefined
  );

  // 월 이동
  const moveMonth = (diff: number) => {
    setViewMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + diff);
      return newMonth;
    });
  };

  // 달력 데이터 생성
  const year = viewMonth.getFullYear();
  const monthIdx = viewMonth.getMonth();
  const firstDay = new Date(year, monthIdx, 1);
  const lastDay = new Date(year, monthIdx + 1, 0);
  const firstWeekDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 6주(최대 42칸)로 렌더링
  const calendarCells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    calendarCells.push(new Date(year, monthIdx, d));
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  // 날짜 클릭
  const handleDayClick = (d: Date | null) => {
    if (!d) return;
    setDate(d);
    onSelect?.(d);
  };

  // 상단 날짜 텍스트
  const selectedText =
    date &&
    date.getMonth() === viewMonth.getMonth() &&
    date.getFullYear() === viewMonth.getFullYear()
      ? `${viewMonth.getFullYear()}년 ${viewMonth.getMonth() + 1}월 ${date.getDate()}일`
      : `${viewMonth.getFullYear()}년 ${viewMonth.getMonth() + 1}월`;

  // 주별로 날짜 그룹화
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    weeks.push(calendarCells.slice(i, i + 7));
  }

  return (
    <View style={[styles.container, style]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>{selectedText}</Text>
        <View style={styles.navArrows}>
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() => moveMonth(-1)}
          >
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() => moveMonth(1)}
          >
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 요일 헤더 */}
      <View style={styles.weekdayHeader}>
        {WEEKDAYS.map((weekday) => (
          <View key={weekday} style={styles.weekdayCell}>
            <Text style={styles.weekdayText}>{weekday}</Text>
          </View>
        ))}
      </View>

      {/* 달력 본체 */}
      <View style={styles.calendarBody}>
        {weeks.map((week, weekIdx) => (
          <View key={weekIdx} style={styles.weekRow}>
            {week.map((cell, dayIdx) => {
              if (!cell) {
                return (
                  <View key={dayIdx} style={styles.dayCell}>
                    <View style={styles.dayEmpty} />
                  </View>
                );
              }

              // modifiers 적용 (행사가 있는 날인지 확인)
              const hasEvent =
                modifiers && modifiersClassNames
                  ? Object.entries(modifiers).some(
                      ([key, fn]) => fn(cell) && key === "event"
                    )
                  : false;

              const isSelected =
                date &&
                cell.getFullYear() === date.getFullYear() &&
                cell.getMonth() === date.getMonth() &&
                cell.getDate() === date.getDate();

              // 오늘 날짜인지 확인
              const today = new Date();
              const isToday =
                cell.getFullYear() === today.getFullYear() &&
                cell.getMonth() === today.getMonth() &&
                cell.getDate() === today.getDate();

              return (
                <View key={dayIdx} style={styles.dayCell}>
                  <TouchableOpacity
                    style={[
                      styles.dayCircle,
                      hasEvent && styles.dayCircleEvent,
                      isSelected && styles.dayCircleSelected,
                      isToday && styles.dayCircleToday,
                    ]}
                    onPress={() => handleDayClick(cell)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        hasEvent && styles.dayTextEvent,
                        isSelected && styles.dayTextSelected,
                        isToday && styles.dayTextToday,
                      ]}
                    >
                      {cell.getDate()}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },
  navArrows: {
    flexDirection: "row",
    gap: 12,
  },
  arrowBtn: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  arrowText: {
    fontSize: 32,
    color: "#357ae1",
    fontWeight: "400",
  },
  weekdayHeader: {
    flexDirection: "row",
    paddingBottom: 8,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
  },
  weekdayText: {
    color: "#222",
    fontSize: 18,
    fontWeight: "700",
  },
  calendarBody: {
    gap: 12,
  },
  weekRow: {
    flexDirection: "row",
  },
  dayCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 3,
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "transparent",
  },
  dayCircleEvent: {
    backgroundColor: "#e6f0ff",
  },
  dayCircleSelected: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#357ae1",
  },
  dayText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#2d3a3a",
  },
  dayTextEvent: {
    color: "#357ae1",
    fontWeight: "700",
  },
  dayTextSelected: {
    color: "#357ae1",
    fontWeight: "700",
  },
  dayCircleToday: {
    backgroundColor: "#357ae1",
  },
  dayTextToday: {
    color: "#fff",
    fontWeight: "700",
  },
  dayEmpty: {
    width: 48,
    height: 48,
  },
});
