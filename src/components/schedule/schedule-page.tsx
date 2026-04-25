import { ownNurbCombined, wishNurbCombined } from "@/ir-data/utils/tracks";
import { TContent } from "@/ir-data/utils/types";
import { parseScheduleEntryKey, toggleScheduleEntry, useIr } from "@/store/ir";
import { ETabs, useUi } from "@/store/ui";
import { getContentColorScale } from "@/utils/color";
import {
  Box,
  Flex,
  Grid,
  HStack,
  IconButton,
  Link,
  List,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  faCalendarDays,
  faGears,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import i18n from "@/i18n";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import LicenseBadge from "../badges/license-badge";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import getScheduleDescription from "../series/getScheduleDescription";
import {
  formatDate,
  getPreviousTuesday,
  getSeriesWeek,
} from "../season/useSeason";
import useSeason from "../season/useSeason";
import { CloseButton } from "../ui/close-button";
import { EmptyState } from "../ui/empty-state";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import ScheduleSettingsPopover from "./schedule-settings-popover";

type WeekEntry = {
  seriesId: number;
  date: string;
};

const shortFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};

const todayStartDate = getPreviousTuesday(formatDate(new Date()));

function groupEntriesByDate(entries: WeekEntry[]) {
  return entries.reduce<Record<string, WeekEntry[]>>((acc, entry) => {
    (acc[entry.date] ??= []).push(entry);
    return acc;
  }, {});
}

function getWeekNumber(date: string, allSeasonDates: string[]) {
  const idx = allSeasonDates.indexOf(date);
  return idx >= 0 ? idx + 1 : 0;
}

function SchedulePage() {
  const { mySchedule, favoriteSeries, myTracks, wishTracks } = useIr();
  const { seasonUseLocalTimezone, seasonShowThisWeek } = useUi();
  const { weeksStartDates } = useSeason();
  const [_, navigate] = useLocation();
  const { t } = useTranslation();
  const locale = i18n.language;

  const entries = mySchedule
    .map(parseScheduleEntryKey)
    .filter((entry) => !!entry)
    .filter((entry) => favoriteSeries.includes(entry.seriesId));
  const entriesByDate = groupEntriesByDate(entries);

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
      {weeksStartDates.length === 0 ? (
        <Flex
          flex={1}
          borderRadius="md"
          bgColor="bg.muted"
          p={4}
          justifyContent="center"
        >
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
          {weeksStartDates.map((date) => {
            const weekStart = new Date(date);
            const weekEnd = new Date(weekStart);
            weekEnd.setUTCDate(weekEnd.getUTCDate() + 7);
            const thisWeek = seasonShowThisWeek && todayStartDate === date;
            const weekEntries = entriesByDate[date] ?? [];

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
                    {weekStart.toLocaleDateString(locale, shortFormat)}
                    {" - "}
                    {weekEnd.toLocaleDateString(locale, shortFormat)}
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
                  <Grid
                    gap={3}
                    templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                  >
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
                          minW="220px"
                        >
                          <CloseButton
                            size="xs"
                            position="absolute"
                            top={1}
                            right={1}
                            onClick={() =>
                              toggleScheduleEntry(entry.seriesId, date)
                            }
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
                              <Text
                                fontWeight="bold"
                                fontSize="sm"
                                lineClamp={2}
                              >
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
                            {schedule && <Text fontSize="xs">{schedule}</Text>}
                            {rainChance > 0 && (
                              <Text fontSize="xs">
                                {t("content.rainChance", {
                                  chance: rainChance,
                                })}
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
