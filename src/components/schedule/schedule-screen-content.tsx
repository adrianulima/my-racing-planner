import { Flex } from "@chakra-ui/react";
import ScheduleWeekCard from "./schedule-week-card";
import { WeekEntry } from "./schedule-utils";

type ScheduleScreenContentProps = {
  weeksStartDates: string[];
  entriesByDate: Record<string, WeekEntry[]>;
  locale: string;
};

function ScheduleScreenContent({
  weeksStartDates,
  entriesByDate,
  locale,
}: ScheduleScreenContentProps) {
  return (
    <Flex
      direction="column"
      gap={3}
      overflow="auto"
      pb={4}
      className="schedule-screen-content"
    >
      {weeksStartDates.map((date) => (
        <ScheduleWeekCard
          key={date}
          date={date}
          weeksStartDates={weeksStartDates}
          weekEntries={entriesByDate[date] ?? []}
          locale={locale}
        />
      ))}
    </Flex>
  );
}

export default ScheduleScreenContent;
