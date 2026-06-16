import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import SeriesBadge from "./detail-series-badge";
import type { DetailSeriesEntry } from "./use-detail-data";
import {
  buildDateEntryMap,
  buildTrackOwnershipMap,
  getTodayStartDate,
} from "./detail-constants";

function DetailCalendarTracks({ entries }: { entries: DetailSeriesEntry[] }) {
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
    seasonHideEmptyWeeks,
    seasonUseLocalTimezone,
  } = useUi();
  const [highlightSeries, setHighlightSeries] = useState(-1);

  const todayStartDate = useMemo(() => getTodayStartDate(), []);

  const { weeksStartDates, weekIndexMap, trackOwnershipMap, dateEntryMap } = useMemo(() => {
    const dateSet = new Set<string>();
    const wnMap: Record<string, number> = {};
    entries.forEach((e) =>
      e.weeks.forEach((w) => {
        if (!w.date) return;
        dateSet.add(w.date);
        if (wnMap[w.date] === undefined) {
          wnMap[w.date] = w.weekNum;
        }
      }),
    );
    const knownSorted = [...dateSet].sort();
    const seasonStartRef = knownSorted.length > 0
      ? new Date(knownSorted[0])
      : null;
    if (seasonStartRef) {
      const minRaw = Math.min(...knownSorted.map((d) => wnMap[d]));
      seasonStartRef.setUTCDate(seasonStartRef.getUTCDate() - 7 * (minRaw % 13));
    }
    let sorted: string[];
    if (seasonHideEmptyWeeks) {
      sorted = seasonHidePastWeeks
        ? knownSorted.filter((d) => d >= todayStartDate)
        : knownSorted;
    } else {
      if (seasonStartRef && knownSorted.length > 0) {
        const maxEnd = new Date(seasonStartRef);
        maxEnd.setUTCDate(maxEnd.getUTCDate() + 7 * 12);
        const lastKnown = new Date(knownSorted[knownSorted.length - 1]);
        const seasonEnd = lastKnown > maxEnd ? lastKnown : maxEnd;
        sorted = [];
        const cur = new Date(seasonStartRef);
        while (cur <= seasonEnd) {
          sorted.push(cur.toISOString().split("T")[0]);
          cur.setUTCDate(cur.getUTCDate() + 7);
        }
      } else {
        sorted = [];
      }
      if (seasonHidePastWeeks) {
        sorted = sorted.filter((d) => d >= todayStartDate);
      }
    }

    const idxMap: Record<string, number> = {};
    if (seasonStartRef && sorted.length > 0) {
      const msPerWeek = 7 * 86400000;
      sorted.forEach((date) => {
        idxMap[date] = Math.round(
          (new Date(date).getTime() - seasonStartRef.getTime()) / msPerWeek,
        );
      });
    }

    const ownMap = buildTrackOwnershipMap(myTracks, wishTracks);
    const dem = buildDateEntryMap(entries);

    return { weeksStartDates: sorted, weekIndexMap: idxMap, trackOwnershipMap: ownMap, dateEntryMap: dem };
  }, [entries, myTracks, wishTracks, seasonHidePastWeeks, seasonHideEmptyWeeks, todayStartDate]);

  const shortFormat: Intl.DateTimeFormatOptions = useMemo(() => ({
    month: "short",
    day: "numeric",
    ...(seasonUseLocalTimezone ? {} : { timeZone: "UTC" }),
  }), [seasonUseLocalTimezone]);

  return (
    <Box width={"100%"} maxH={"calc(100vh - 300px)"} overflowY={"auto"}>
      <VStack gap={0} width={"100%"} minW={"400px"}>
        {weeksStartDates.map((date) => {
          const weekMap = dateEntryMap.get(date);
          const thisWeek = seasonShowThisWeek && todayStartDate === date;
          const weekStart = new Date(date);
          const seriesEntries = weekMap ? [...weekMap.entries()] : [];

          return (
            <Flex
              key={date}
              width={"100%"}
              borderBottomWidth={"1px"}
              borderColor={"border.subtle"}
              bgColor={thisWeek ? { base: "bg.subtle", _dark: "bg.emphasized" } : undefined}
            >
              <Box
                position={"sticky"}
                left={0}
                zIndex={"docked"}
                bgColor={thisWeek ? "bg.inverted" : "bg.muted"}
                color={thisWeek ? "bg" : undefined}
                w={"80px"}
                minW={"80px"}
                p={2}
                textAlign={"center"}
                borderRightWidth={"1px"}
                borderColor={"border.subtle"}
              >
                <Text fontSize={"xs"} fontWeight={"semibold"}>
                  {weekStart.toLocaleDateString("en-US", shortFormat)}
                </Text>
                <Text fontSize={"10px"} opacity={0.8}>
                  ({t("common.week")} {((weekIndexMap[date] ?? 0) % 13) + 1})
                </Text>
              </Box>

              {seriesEntries.length === 0 ? (
                <Box
                  flex={"1 0 180px"}
                  minW={"180px"}
                  maxW={"300px"}
                  borderLeftWidth={"1px"}
                  borderColor={"border.subtle"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  p={2}
                  bgColor={{ base: "red.50", _dark: "red.800" }}
                  minH={"80px"}
                >
                  <Text fontSize={"xs"} color={"fg.muted"}>
                    -
                  </Text>
                </Box>
              ) : (
                seriesEntries.map(([seriesId, week]) => (
                  <Box
                    key={seriesId}
                    flex={"1 0 180px"}
                    minW={"180px"}
                    maxW={"300px"}
                    borderLeftWidth={"1px"}
                    borderColor={"border.subtle"}
                  >
                    <SeriesBadge
                      seriesId={seriesId}
                      week={week}
                      trackOwnershipMap={trackOwnershipMap}
                      showConfig={seasonShowTrackConfig}
                      showOwned={seasonShowOwned}
                      showWishlist={seasonShowWishlist}
                      showCheckbox={seasonShowCheckboxes}
                      showCarsDropdown={seasonShowCarsDropdown}
                      useLocalTimezone={seasonUseLocalTimezone}
                      isHighlighted={seasonHighlight && highlightSeries === seriesId}
                      onMouseEnter={() => seasonHighlight && setHighlightSeries(seriesId)}
                      onMouseLeave={() => seasonHighlight && setHighlightSeries(-1)}
                    />
                  </Box>
                ))
              )}
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}

export default DetailCalendarTracks;
