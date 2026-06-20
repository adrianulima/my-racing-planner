import { Badge, Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { createSimpleScheduleDescription } from "@/utils/simple-schedule";
import SERIES_JSON from "../../ir-data/series.json";
import getScheduleDescription from "../series/getScheduleDescription";
import { getSeriesWeek } from "../season/useSeason";
import { getWeekNumber, getWeekRangeLabel, WeekEntry } from "./schedule-utils";

type SchedulePrintTableProps = {
  weeksStartDates: string[];
  entriesByDate: Record<string, WeekEntry[]>;
  locale: string;
  seasonUseLocalTimezone: boolean;
};

function SchedulePrintTable({
  weeksStartDates,
  entriesByDate,
  locale,
  seasonUseLocalTimezone,
}: SchedulePrintTableProps) {
  const { t } = useTranslation();

  return (
    <Box className="schedule-print-table">
      <VStack align="stretch" gap={2}>
        {weeksStartDates.map((date) => {
          const weekEntries = entriesByDate[date] ?? [];
          const weekNumber = getWeekNumber(date, weeksStartDates);
          const weekLabel = getWeekRangeLabel(date, locale);

          return (
            <Box key={date} className="schedule-print-week">
              <HStack gap={1} mb={1}>
                <Text fontWeight="bold">{weekLabel}</Text>
                <Text fontSize="xs" opacity={0.7}>
                  ({t("common.week")} {weekNumber})
                </Text>
              </HStack>

              {weekEntries.length === 0 ? (
                <Text fontSize="sm" color="fg.muted">
                  {t("schedule.noRacesSelected")}
                </Text>
              ) : (
                <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={1}>
                  {weekEntries.map((entry) => {
                    const series =
                      SERIES_JSON[
                        entry.seriesId.toString() as keyof typeof SERIES_JSON
                      ];
                    if (!series) return null;

                    const week = getSeriesWeek(entry.seriesId, date);
                    const schedule = getScheduleDescription(
                      entry.seriesId,
                      seasonUseLocalTimezone,
                    );
                    const rain =
                      typeof week?.rainChance === "number" &&
                      week.rainChance > 0
                        ? t("content.rainChance", { chance: week.rainChance })
                        : "";
                    const raceDuration = createSimpleScheduleDescription(
                      series.laps,
                      series.duration,
                    );

                    return (
                      <Box
                        key={`${date}-${entry.seriesId}`}
                        borderWidth="1px"
                        borderColor={"border.inverted"}
                        p={1}
                      >
                        <HStack gap={1} align="start">
                          <Badge size="xs" mt="2px" borderWidth="1px">
                            {series.license.letter}
                          </Badge>
                          <Text
                            fontWeight="semibold"
                            fontSize="sm"
                            lineClamp={2}
                          >
                            {series.name}
                          </Text>
                        </HStack>
                        {week && (
                          <Text fontSize="sm">
                            {week.track.name}
                            {week.track.config ? ` (${week.track.config})` : ""}
                          </Text>
                        )}
                        <Text fontSize="xs" opacity={0.8}>
                          Duration: {raceDuration}
                        </Text>
                        {schedule && <Text fontSize="xs">{schedule}</Text>}
                        {!!rain && <Text fontSize="xs">{rain}</Text>}
                      </Box>
                    );
                  })}
                </Grid>
              )}
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}

export default SchedulePrintTable;
