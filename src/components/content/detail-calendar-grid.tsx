import {
  Box,
  Image,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { IR_URL } from "@/ir-data/utils/urls";
import { useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import SERIES_JSON from "@/ir-data/series.json";
import getScheduleDescription from "../series/getScheduleDescription";
import SeasonCarsPopover from "../season/season-cars-popover";
import SeasonTableHeaderParticipation from "../season/season-table-header-participation";
import TRACKS_JSON from "@/ir-data/tracks.json";
import CalendarCell from "./detail-calendar-cell";
import type { DetailSeriesEntry, DetailWeek } from "./use-detail-data";
import {
  buildDateEntryMap,
  buildTrackOwnershipMap,
  getTodayStartDate,
} from "./detail-constants";

function DetailCalendarGrid({ entries }: { entries: DetailSeriesEntry[] }) {
  const { myTracks, wishTracks } = useIr();
  const { t } = useTranslation();
  const {
    seasonHighlight,
    seasonShowCarsDropdown,
    seasonShowTrackConfig,
    seasonShowThisWeek,
    seasonShowOwned,
    seasonShowWishlist,
    seasonShowCheckboxes,
    seasonHidePastWeeks,
    seasonUseLocalTimezone,
    seasonShowParticipation,
  } = useUi();
  const [highlightTrack, setHighlightTrack] = useState(-1);
  const [axisInverted, setAxisInverted] = useState(false);
  const i18nLocale = i18n.language;

  const todayStartDate = useMemo(() => getTodayStartDate(), []);

  const { weeksStartDates, weekIndexMap, trackOwnershipMap, dateEntryMap } = useMemo(() => {
    const dateSet = new Set<string>();
    const rawIdxMap: Record<string, number> = {};
    entries.forEach((e) =>
      e.weeks.forEach((w) => {
        if (!w.date) return;
        dateSet.add(w.date);
        if (rawIdxMap[w.date] === undefined) {
          rawIdxMap[w.date] = w.weekNum;
        }
      }),
    );
    const knownSorted = [...dateSet].sort();
    const sorted = seasonHidePastWeeks
      ? knownSorted.filter((d) => d >= todayStartDate)
      : knownSorted;

    const idxMap: Record<string, number> = {};
    if (sorted.length > 0 && knownSorted.length > 0) {
      const dataEarliest = knownSorted[0];
      const minRaw = Math.min(...knownSorted.map((d) => rawIdxMap[d]));
      const seasonStart = new Date(dataEarliest);
      seasonStart.setUTCDate(seasonStart.getUTCDate() - 7 * (minRaw % 13));
      const msPerWeek = 7 * 86400000;
      sorted.forEach((date) => {
        idxMap[date] = Math.round(
          (new Date(date).getTime() - seasonStart.getTime()) / msPerWeek,
        );
      });
    }

    const ownMap = buildTrackOwnershipMap(myTracks, wishTracks);
    const dem = buildDateEntryMap(entries);

    return { weeksStartDates: sorted, weekIndexMap: idxMap, trackOwnershipMap: ownMap, dateEntryMap: dem };
  }, [entries, myTracks, wishTracks, seasonHidePastWeeks, todayStartDate]);

  const shortFormat: Intl.DateTimeFormatOptions = useMemo(() => ({
    month: "short",
    day: "numeric",
    ...(seasonUseLocalTimezone ? {} : { timeZone: "UTC" }),
  }), [seasonUseLocalTimezone]);
  const longFormat: Intl.DateTimeFormatOptions = useMemo(() => ({
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(seasonUseLocalTimezone ? {} : { timeZone: "UTC" }),
  }), [seasonUseLocalTimezone]);

  return (
    <Table.ScrollArea width="100%" maxH={"calc(100vh - 300px)"} borderRadius={"md"}>
      <Table.Root size="sm" showColumnBorder stickyHeader>
        <Table.Header>
          <Table.Row bgColor={"bg.muted"} zIndex={"sticky"}>
            <Table.ColumnHeader
              bgColor={"bg.muted"}
              position={"sticky"}
              left={"0"}
              zIndex={"sticky"}
              width={axisInverted ? "180px" : "80px"}
              minWidth={axisInverted ? "180px" : "80px"}
            >
              <Tooltip
                lazyMount
                unmountOnExit
                content={t("settings.invertAxis")}
                showArrow
                positioning={{ placement: "bottom" }}
                openDelay={200}
                closeDelay={100}
              >
                <Box
                  as="button"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width="100%"
                  height="100%"
                  cursor={"pointer"}
                  color={"fg.muted"}
                  _hover={{ color: "fg" }}
                  onClick={() => setAxisInverted(!axisInverted)}
                >
                  <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
                </Box>
              </Tooltip>
            </Table.ColumnHeader>
            {axisInverted
              ? weeksStartDates.map((date) => {
                  const weekStart = new Date(date);
                  const weekEndDay = new Date(
                    new Date(weekStart).setUTCDate(weekStart.getUTCDate() + 7),
                  );
                  return (
                    <Table.ColumnHeader
                      key={date}
                      minWidth={"90px"}
                      bgColor={"bg.muted"}
                    >
                      <Tooltip
                        lazyMount
                        unmountOnExit
                        content={`${weekStart.toLocaleDateString(i18nLocale, longFormat)} - ${weekEndDay.toLocaleDateString(i18nLocale, longFormat)}`}
                        showArrow
                        positioning={{ placement: "bottom" }}
                        openDelay={200}
                        closeDelay={100}
                      >
                        <VStack alignItems={"center"} gap={0}>
                          <Text textAlign={"center"} fontSize={"xs"}>
                            {weekStart.toLocaleDateString("en-US", shortFormat)}
                          </Text>
                          <Text fontSize={"xs"} textAlign={"center"} opacity={0.8}>
                            ({t("common.week")} {((weekIndexMap[date] ?? 0) % 13) + 1})
                          </Text>
                        </VStack>
                      </Tooltip>
                    </Table.ColumnHeader>
                  );
                })
              : entries.map((entry) => {
                  const series =
                    SERIES_JSON[entry.seriesId.toString() as keyof typeof SERIES_JSON];
                  return (
                    <Table.ColumnHeader
                      key={entry.seriesId}
                      minWidth={"120px"}
                      bgColor={"bg.muted"}
                      position={"relative"}
                    >
                      <Tooltip
                        lazyMount
                        unmountOnExit
                        content={
                          <VStack>
                            <Text fontWeight={"bold"}>{entry.seriesName}</Text>
                            {series && (
                              <Text fontSize={"xs"}>{getScheduleDescription(entry.seriesId, seasonUseLocalTimezone)}</Text>
                            )}
                          </VStack>
                        }
                        showArrow
                        positioning={{ placement: "bottom" }}
                        openDelay={200}
                        closeDelay={100}
                      >
                        <VStack
                          gap={1}
                          width={"100%"}
                          pb={seasonShowParticipation ? "18px" : "12px"}
                        >
                          {series?.logo && (
                            <Image
                              loading="lazy"
                              userSelect={"none"}
                              draggable={false}
                              h={"40px"}
                              fit="contain"
                              src={`${IR_URL.image}/img/logos/series/${series.logo}`}
                            />
                          )}
                          <Box width={"100%"} px={1}>
                            <Text
                              textAlign={"center"}
                              lineClamp={2}
                              width={"100%"}
                            >
                              {entry.seriesName}
                            </Text>
                          </Box>
                        </VStack>
                      </Tooltip>
                      {seasonShowParticipation && (
                        <SeasonTableHeaderParticipation
                          seriesTracks={Object.fromEntries(
                            entry.weeks
                              .filter((w) => w.date)
                              .map((w) => [w.date, w.trackId]),
                          )}
                        />
                      )}
                      {seasonShowCarsDropdown && series && (
                        <SeasonCarsPopover cars={series.cars ?? []} />
                      )}
                    </Table.ColumnHeader>
                  );
                })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {axisInverted
            ? entries.map((entry) => {
                const weekMap = new Map<string, DetailWeek>();
                entry.weeks.forEach((w) => {
                  if (w.date) weekMap.set(w.date, w);
                });
                const series =
                  SERIES_JSON[entry.seriesId.toString() as keyof typeof SERIES_JSON];
                return (
                  <Table.Row key={entry.seriesId} bgColor={"bg.muted"} height={"60px"}>
                    <Table.Cell
                      position={"sticky"}
                      left={"0"}
                      zIndex={"docked"}
                      bgColor={"bg.muted"}
                      width={"180px"}
                      minWidth={"180px"}
                    >
                      <Tooltip
                        lazyMount
                        unmountOnExit
                        content={
                          <VStack>
                            <Text fontWeight={"bold"}>{entry.seriesName}</Text>
                            {series && (
                              <Text fontSize={"xs"}>{getScheduleDescription(entry.seriesId, seasonUseLocalTimezone)}</Text>
                            )}
                          </VStack>
                        }
                        showArrow
                        positioning={{ placement: "right" }}
                        openDelay={200}
                        closeDelay={100}
                      >
                        <VStack
                          gap={1}
                          width={"100%"}
                          pb={seasonShowParticipation ? "18px" : 0}
                        >
                          {series?.logo && (
                            <Image
                              loading="lazy"
                              userSelect={"none"}
                              draggable={false}
                              h={"30px"}
                              fit="contain"
                              src={`${IR_URL.image}/img/logos/series/${series.logo}`}
                            />
                          )}
                          <Box width={"100%"} px={1}>
                            <Text
                              textAlign={"center"}
                              lineClamp={2}
                              width={"100%"}
                              fontSize={"xs"}
                            >
                              {entry.seriesName}
                            </Text>
                          </Box>
                        </VStack>
                      </Tooltip>
                    </Table.Cell>
                    {weeksStartDates.map((date) => {
                      const week = weekMap.get(date);
                      const track = week
                        ? TRACKS_JSON[week.trackId.toString() as keyof typeof TRACKS_JSON]
                        : undefined;
                      return (
                        <CalendarCell
                          key={date}
                          week={week}
                          trackOwnershipMap={trackOwnershipMap}
                          highlight={seasonHighlight && highlightTrack === (track?.sku ?? -1)}
                          showConfig={seasonShowTrackConfig}
                          showOwned={seasonShowOwned}
                          showWishlist={seasonShowWishlist}
                          showCheckbox={seasonShowCheckboxes}
                          onMouseEnter={() =>
                            seasonHighlight && track && setHighlightTrack(track.sku)
                          }
                          onMouseLeave={() =>
                            seasonHighlight && setHighlightTrack(-1)
                          }
                        />
                      );
                    })}
                    {seasonShowParticipation && (
                      <SeasonTableHeaderParticipation
                        seriesTracks={Object.fromEntries(
                          entry.weeks
                            .filter((w) => w.date)
                            .map((w) => [w.date, w.trackId]),
                        )}
                      />
                    )}
                    {seasonShowCarsDropdown && (
                      <SeasonCarsPopover cars={series?.cars ?? []} />
                    )}
                  </Table.Row>
                );
              })
            : weeksStartDates.map((date) => {
                const weekStart = new Date(date);
                const weekEndDay = new Date(
                  new Date(weekStart).setUTCDate(weekStart.getUTCDate() + 7),
                );
                const thisWeek = seasonShowThisWeek && todayStartDate === date;
                const rowWeeks = dateEntryMap.get(date) ?? new Map();
                return (
                  <Table.Row
                    key={date}
                    bgColor={"bg.muted"}
                    height={"60px"}
                    borderYWidth={thisWeek ? "2px" : undefined}
                    borderColor={thisWeek ? "bg.inverted" : undefined}
                  >
                    <Table.Cell
                      position={"sticky"}
                      left={"0"}
                      zIndex={"docked"}
                      bgColor={thisWeek ? "bg.inverted" : "bg.muted"}
                      color={thisWeek ? "bg" : undefined}
                      width={"80px"}
                      minWidth={"80px"}
                    >
                      <Tooltip
                        lazyMount
                        unmountOnExit
                        content={`${weekStart.toLocaleDateString(i18nLocale, longFormat)} - ${weekEndDay.toLocaleDateString(i18nLocale, longFormat)}`}
                        showArrow
                        positioning={{ placement: "right" }}
                        openDelay={200}
                        closeDelay={100}
                      >
                        <VStack alignItems={"center"} gap={0}>
                          <Text textAlign={"center"} fontSize={"xs"}>
                            {weekStart.toLocaleDateString("en-US", shortFormat)}
                          </Text>
                          <Text fontSize={"xs"} textAlign={"center"} opacity={0.8}>
                            ({t("common.week")} {((weekIndexMap[date] ?? 0) % 13) + 1})
                          </Text>
                        </VStack>
                      </Tooltip>
                    </Table.Cell>
                    {entries.map((entry) => {
                      const week = rowWeeks.get(entry.seriesId);
                      const track = week
                        ? TRACKS_JSON[week.trackId.toString() as keyof typeof TRACKS_JSON]
                        : undefined;
                      return (
                        <CalendarCell
                          key={entry.seriesId}
                          week={week}
                          trackOwnershipMap={trackOwnershipMap}
                          highlight={seasonHighlight && highlightTrack === (track?.sku ?? -1)}
                          showConfig={seasonShowTrackConfig}
                          showOwned={seasonShowOwned}
                          showWishlist={seasonShowWishlist}
                          showCheckbox={seasonShowCheckboxes}
                          onMouseEnter={() =>
                            seasonHighlight && track && setHighlightTrack(track.sku)
                          }
                          onMouseLeave={() =>
                            seasonHighlight && setHighlightTrack(-1)
                          }
                        />
                      );
                    })}
                  </Table.Row>
                );
              })}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}

export default DetailCalendarGrid;
