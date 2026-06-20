import { Flex } from "@chakra-ui/react";
import { useAppLayout } from "../app/useAppLayout";
import ScheduleWeekCard from "./schedule-week-card";
import { WeekEntry } from "./schedule-utils";

type ScheduleScreenContentProps = {
  weeksStartDates: string[];
  allSeasonDates: string[];
  todayStartDate: string;
  entriesByDate: Record<string, WeekEntry[]>;
  locale: string;
};

function ScheduleScreenContent({
  weeksStartDates,
  allSeasonDates,
  todayStartDate,
  entriesByDate,
  locale,
}: ScheduleScreenContentProps) {
  const { onScroll } = useAppLayout();
  return (
    <Flex
      direction="column"
      gap={3}
      overflow="auto"
      pb={4}
      className="schedule-screen-content"
      onScroll={onScroll}
    >
      {weeksStartDates.map((date) => (
        <ScheduleWeekCard
          key={date}
          date={date}
          allSeasonDates={allSeasonDates}
          todayStartDate={todayStartDate}
          weekEntries={entriesByDate[date] ?? []}
          locale={locale}
        />
      ))}
    </Flex>
  );
}

export default ScheduleScreenContent;
