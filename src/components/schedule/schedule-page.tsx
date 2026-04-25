import { toggleScheduleEntry, useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { ETabs } from "@/store/ui";
import { ownNurbCombined, wishNurbCombined } from "@/ir-data/utils/tracks";
import { TContent } from "@/ir-data/utils/types";
import { Box, Flex, Grid, HStack, IconButton, Link, List, Text, VStack } from "@chakra-ui/react";
import { faCalendarDays, faGears, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import LicenseBadge from "../badges/license-badge";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import { CloseButton } from "../ui/close-button";
import { EmptyState } from "../ui/empty-state";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import getScheduleDescription from "../series/getScheduleDescription";
import useSeason, { getPreviousTuesday, formatDate } from "../season/useSeason";
import { getContentColorScale } from "@/utils/color";
import ScheduleSettingsPopover from "./schedule-settings-popover";

type WeekEntry = {
  seriesId: number;
  date: string;
};

type ScheduleWeek = {
  weekNum: number;
  date: string;
  track: {
    id: number;
    name: string;
    config?: string;
  };
  cars?: {
    id: number;
    name: string;
  }[];
  rainChance?: number;
};

function parseScheduleKey(key: string): WeekEntry {
  const idx = key.indexOf("_");
  return {
    seriesId: Number(key.substring(0, idx)),
    date: key.substring(idx + 1),
  };
}

function getWeekNumber(date: string, allSeasonDates: string[]): number {
  const idx = allSeasonDates.indexOf(date);
  return idx >= 0 ? idx + 1 : 0;
}

function getTrackForWeek(seriesId: number, date: string) {
  const series = SERIES_JSON[
    seriesId.toString() as keyof typeof SERIES_JSON
  ] as { weeks: ScheduleWeek[] } | undefined;
  if (!series) return null;
  const week = series.weeks.find(
    (w) => getPreviousTuesday(w.date) === date,
  );
  return week ?? null;
}

const todayStartDate = getPreviousTuesday(formatDate(new Date()));

function SchedulePage() {
  const { mySchedule, favoriteSeries, myTracks, wishTracks } = useIr();
  const { seasonUseLocalTimezone, seasonShowThisWeek } = useUi();
  const { weeksStartDates } = useSeason();
  const [_, navigate] = useLocation();
  const { t } = useTranslation();

  // Parse and filter to only entries whose series is still in favorites
  const entries = mySchedule
    .map(parseScheduleKey)
    .filter((e) => favoriteSeries.includes(e.seriesId));

  // Group by date
  const byDate = entries.reduce<Record<string, WeekEntry[]>>((acc, entry) => {
    (acc[entry.date] ??= []).push(entry);
    return acc;
  }, {});

  const shortFormat: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };

  // Use all season weeks so every week gets a row
  const allWeeks = weeksStartDates;

  return (
    <Page>
      <PageHeader
        title={t("pages.schedule.title")}
        description={t("pages.schedule.description")}
      />
      <HStack mb={2}>
        <PopoverRoot positioning={{ placement: "right-start" }}>
          <PopoverTrigger asChild>
            <IconButton
              aria-label={t("common.settings")}
              variant={"outline"}
              size={"lg"}
              bgColor={{ base: "bg.muted", _hover: "bg" }}
              borderRadius={"md"}
            >
              <FontAwesomeIcon icon={faGears} />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent>
            <ScheduleSettingsPopover />
          </PopoverContent>
        </PopoverRoot>
      </HStack>
      {allWeeks.length === 0 ? (
        <Flex flex={1} borderRadius="md" bgColor="bg.muted" p={4} justifyContent="center">
          <EmptyState
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            title={t("empty.noSeriesSelected")}
            description={t("empty.selectSeriesSchedule")}
          >
            <List.Root variant="marker">
              <List.Item>
                <Link onClick={() => navigate(ETabs.MySeason)}>
                  {t("empty.goSeasonSchedule")}
                </Link>
              </List.Item>
            </List.Root>
          </EmptyState>
        </Flex>
      ) : (
        <Flex direction="column" gap={3} overflow="auto" pb={4}>
          {allWeeks.map((date) => {
            const weekStart = new Date(date);
            const weekEnd = new Date(weekStart);
            weekEnd.setUTCDate(weekEnd.getUTCDate() + 7);
            const thisWeek = seasonShowThisWeek && todayStartDate === date;
            const weekEntries = byDate[date] ?? [];

            return (
              <Box
                key={date}
                borderRadius="md"
                bgColor="bg.muted"
                p={3}
                borderWidth={thisWeek ? "2px" : "1px"}
                borderColor={thisWeek ? "bg.inverted" : "border.muted"}
              >
                <HStack gap={2} mb={weekEntries.length > 0 ? 2 : 0}>
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <Text fontWeight="bold">
                    {weekStart.toLocaleDateString("en-US", shortFormat)}
                    {" – "}
                    {weekEnd.toLocaleDateString("en-US", shortFormat)}
                  </Text>
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
                    const series = SERIES_JSON[
                      entry.seriesId.toString() as keyof typeof SERIES_JSON
                    ];
                    if (!series) return null;
                    const week = getTrackForWeek(entry.seriesId, date);
                    const schedule = getScheduleDescription(
                      entry.seriesId,
                      seasonUseLocalTimezone,
                    );
                    const rainChance = week?.rainChance ?? 0;

                    const trackId = week?.track.id;
                    const track = trackId
                      ? TRACKS_JSON[
                          String(trackId) as keyof typeof TRACKS_JSON
                        ] as TContent
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

                    return (
                      <Box
                        key={entry.seriesId}
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor={`${scale}.500`}
                        bg={{ base: `${scale}.50`, _dark: `${scale}.800` }}
                        color={{ base: `${scale}.600`, _dark: `${scale}.400` }}
                        p={3}
                        position="relative"
                        minW="220px"
                      >
                        <CloseButton
                          size="xs"
                          position="absolute"
                          top={1}
                          right={1}
                          onClick={() => toggleScheduleEntry(entry.seriesId, date)}
                        />
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
                          {series.switching && !!week?.cars?.length && (
                            <Text fontSize="sm">
                              🚗 {week.cars.map((c) => c.name).join(", ")}
                            </Text>
                          )}
                          {schedule && (
                            <Text fontSize="xs">
                              {schedule}
                            </Text>
                          )}
                          {rainChance > 0 && (
                            <Text fontSize="xs">
                              {t("content.rainChance", { chance: rainChance })}
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
          })}
        </Flex>
      )}
    </Page>
  );
}

export default SchedulePage;
