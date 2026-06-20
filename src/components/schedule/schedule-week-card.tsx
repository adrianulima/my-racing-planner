import { ownNurbCombined, wishNurbCombined } from "@/ir-data/utils/tracks";
import { TContent } from "@/ir-data/utils/types";
import { toggleScheduleEntry, useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { trackEvent } from "@/utils/analytics";
import { createSimpleScheduleDescription } from "@/utils/simple-schedule";
import { getContentColorScale } from "@/utils/color";
import { Box, Grid, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { LuTrash } from "react-icons/lu";
import TRACKS_JSON from "../../ir-data/tracks.json";
import SERIES_JSON from "../../ir-data/series.json";
import getScheduleDescription from "../series/getScheduleDescription";
import { getSeriesWeek } from "../season/useSeason";
import LicenseBadge from "../badges/license-badge";
import {
  getWeekNumber,
  getWeekRangeLabel,
  todayStartDate,
  WeekEntry,
} from "./schedule-utils";

type ScheduleWeekCardProps = {
  date: string;
  weeksStartDates: string[];
  weekEntries: WeekEntry[];
  locale: string;
};

function ScheduleWeekCard({
  date,
  weeksStartDates,
  weekEntries,
  locale,
}: ScheduleWeekCardProps) {
  const { myTracks, wishTracks } = useIr();
  const { seasonUseLocalTimezone, seasonShowThisWeek } = useUi();
  const { t } = useTranslation();

  const thisWeek = seasonShowThisWeek && todayStartDate === date;

  return (
    <Box
      borderRadius="md"
      bgColor="bg.muted"
      p={3}
      borderWidth={thisWeek ? "2px" : "1px"}
      borderColor={thisWeek ? "bg.inverted" : "border.muted"}
    >
      <HStack gap={2} mb={weekEntries.length > 0 ? 2 : 0}>
        <FontAwesomeIcon icon={faCalendarWeek} />
        <Text fontWeight="bold">{getWeekRangeLabel(date, locale)}</Text>
        <Text fontSize="xs" opacity={0.7}>
          ({t("common.week")} {getWeekNumber(date, weeksStartDates)})
        </Text>
        {thisWeek && (
          <Text fontSize="xs" fontWeight="bold" color="green.500">
            {t("schedule.thisWeek")}
          </Text>
        )}
      </HStack>
      {weekEntries.length === 0 ? (
        <Text fontSize="sm" color="fg.muted" mt={1}>
          {t("schedule.noRacesSelected")}
        </Text>
      ) : (
        <Grid gap={3} templateColumns="repeat(auto-fill, minmax(350px, 1fr))">
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
            const rainChance = week?.rainChance ?? 0;
            const track = week?.track.id
              ? (TRACKS_JSON[
                  String(week.track.id) as keyof typeof TRACKS_JSON
                ] as TContent)
              : null;
            const free = !!track?.free;
            const owned = track
              ? myTracks.includes(track.sku) ||
                ownNurbCombined(track.id, myTracks)
              : false;
            const wish = track
              ? wishTracks.includes(track.sku) ||
                wishNurbCombined(track.id, wishTracks, myTracks)
              : false;
            const scale = getContentColorScale(free, owned, wish);

            const raceDuration = createSimpleScheduleDescription(
              series.laps,
              series.duration,
            );

            return (
              <Box
                key={entry.seriesId}
                borderRadius="md"
                borderWidth="1px"
                borderColor={`${scale}.500`}
                bg={{ base: `${scale}.50`, _dark: `${scale}.800` }}
                color={{
                  base: `${scale}.600`,
                  _dark: `${scale}.400`,
                }}
                p={3}
                position="relative"
                minW="160px"
              >
                <IconButton
                  variant="ghost"
                  aria-label={t("common.close")}
                  size="2xs"
                  position="absolute"
                  top={1}
                  right={1}
                  onClick={() => {
                    trackEvent("schedule_entry_change", {
                      action: "remove",
                      track_state: free
                        ? "free"
                        : owned
                          ? "owned"
                          : wish
                            ? "wishlist"
                            : "missing",
                    });
                    toggleScheduleEntry(entry.seriesId, date);
                  }}
                >
                  <LuTrash />
                </IconButton>
                <VStack align="start" gap={1} pr={5}>
                  <HStack gap={2} align="start">
                    <LicenseBadge
                      letter={series.license.letter}
                      color={series.license.color}
                      size="xs"
                      mt="2px"
                    >
                      {series.license.letter}
                    </LicenseBadge>
                    <Text fontWeight="bold" fontSize="sm" lineClamp={2}>
                      {series.name}
                    </Text>
                  </HStack>
                  {week && (
                    <Text fontSize="sm">
                      {week.track.name}
                      {week.track.config && ` (${week.track.config})`}
                    </Text>
                  )}
                  <Text fontSize="xs" wordBreak="break-word">
                    Duration: {raceDuration} {t("common.race")}
                  </Text>
                  {schedule && <Text fontSize="xs">{schedule}</Text>}
                  {series.switching && !!week?.cars?.length && (
                    <Text fontSize="sm">
                      🚗 {week.cars.map((c) => c.name).join(", ")}
                    </Text>
                  )}
                  {rainChance > 0 && (
                    <Text fontSize="xs">
                      💧 {t("content.rainChance", { chance: rainChance })}
                    </Text>
                  )}
                </VStack>
              </Box>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

export default ScheduleWeekCard;
