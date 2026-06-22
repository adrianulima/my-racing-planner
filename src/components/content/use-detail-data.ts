import { useMemo } from "react";
import { useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import CARS_JSON from "@/ir-data/cars.json";
import TRACKS_JSON from "@/ir-data/tracks.json";
import SERIES_JSON from "@/ir-data/series.json";
import { TContent } from "@/ir-data/utils/types";
import { getPreviousTuesday } from "@/components/season/useSeason";
import { isNurbCombined, ownNurbCombined, wishNurbCombined } from "@/ir-data/utils/tracks";
import { getTodayStartDate, getSeasonStartDate } from "./detail-constants";

type RawWeek = {
  weekNum: number;
  date: string;
  track: { id: number; name: string; config?: string };
  cars?: { id: number; name: string }[];
  rainChance?: number;
};

export type DetailWeek = {
  weekNum: number;
  date: string;
  trackId: number;
  trackName: string;
  trackConfig?: string;
  cars?: { id: number; name: string }[];
  rainChance?: number;
};

export type DetailSeriesEntry = {
  seriesId: number;
  seriesName: string;
  seriesCategory: string;
  license: { id: number; name: string; letter: string; color: string };
  official: boolean;
  fixed: boolean;
  switching: boolean;
  duration: number | null;
  multiclass: boolean;
  logo?: string;
  weeks: DetailWeek[];
  weekCount: number;
};

export type DetailData = {
  item: TContent;
  type: "cars" | "tracks";
  entries: DetailSeriesEntry[];
  owned: boolean;
  wish: boolean;
  unlockSeriesCount: number;
  unlockWeekCount: number;
  totalWeekCount: number;
};

function useDetailData(type: "cars" | "tracks", id: number): DetailData | null {
  const { myCars, myTracks, wishCars, wishTracks, favoriteSeries } = useIr();
  const { seasonHidePastWeeks } = useUi();
  const todayStartDate = useMemo(() => getTodayStartDate(), []);
  const seasonStartDate = useMemo(() => getSeasonStartDate(), []);

  return useMemo(() => {
    const item = (
      type === "cars"
        ? CARS_JSON[id.toString() as keyof typeof CARS_JSON]
        : TRACKS_JSON[id.toString() as keyof typeof TRACKS_JSON]
    ) as TContent | undefined;

    if (!item) return null;

    const seriesIds: number[] = [...new Set(item.skuSeries ?? item.series ?? [])];
    const myContent = type === "cars" ? myCars : myTracks;
    const wishContent = type === "cars" ? wishCars : wishTracks;

    const owned =
      type === "tracks" && isNurbCombined(id)
        ? ownNurbCombined(id, myTracks)
        : myContent.includes(item.sku);

    const wish =
      !owned &&
      (type === "tracks" && isNurbCombined(id)
        ? wishNurbCombined(id, wishTracks, myTracks)
        : wishContent.includes(item.sku));

    const validConfigIds: Set<number> = new Set();
    if (type === "tracks" && item.skuGroup) {
      Object.keys(item.skuGroup).forEach((k) => {
        validConfigIds.add(Number(k));
      });
    } else {
      validConfigIds.add(id);
    }

    const seriesMap = new Map<number, DetailSeriesEntry>();

    for (const seriesId of seriesIds) {
      const series =
        SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON];
      if (!series) continue;

      const rawWeeks = (series.weeks as RawWeek[] | undefined) ?? [];
      const matchingWeeks: DetailWeek[] = [];

      for (const week of rawWeeks) {
        const match =
          type === "cars"
            ? !week.cars || week.cars.some((c) => c.id === item.id)
            : week.track && validConfigIds.has(week.track.id);

        if (!match) continue;

        matchingWeeks.push({
          weekNum: week.weekNum,
          date: getPreviousTuesday(week.date),
          trackId: week.track?.id ?? 0,
          trackName: week.track?.name ?? "",
          trackConfig: week.track?.config,
          cars: week.cars,
          rainChance: week.rainChance,
        });
      }

      // Filter out weeks from completely finished seasons.
      // iRacing seasons are 13-week cycles (12 race weeks + 1 build week).
      let seriesWeeks = matchingWeeks;
      if (matchingWeeks.length > 0) {
        const firstFutureIdx = matchingWeeks.findIndex(
          (w) => w.date >= todayStartDate,
        );
        if (firstFutureIdx === -1) {
          // All weeks are from finished seasons → skip series entirely
          continue;
        }
        const currentSeason = Math.floor(
          matchingWeeks[firstFutureIdx].weekNum / 13,
        );
        seriesWeeks = matchingWeeks.filter(
          (w) =>
            Math.floor(w.weekNum / 13) >= currentSeason &&
            w.date >= seasonStartDate,
        );
      }

      if (seriesWeeks.length > 0) {
        seriesMap.set(series.id, {
          seriesId: series.id,
          seriesName: series.name,
          seriesCategory: series.category,
          license: series.license,
          official: series.official,
          fixed: series.fixed,
          switching: series.switching,
          duration: series.duration,
          multiclass: series.multiclass,
          logo: series.logo,
          weeks: seriesWeeks,
          weekCount: seriesWeeks.length,
        });
      }
    }

    const entries = [...seriesMap.values()];

    const favoriteSet = new Set(favoriteSeries);
    const unfavoritedEntries = entries.filter((e) => !favoriteSet.has(e.seriesId));
    const unlockSeriesCount = unfavoritedEntries.length;

    const filterDate = (date: string) =>
      !seasonHidePastWeeks || date >= todayStartDate;

    const allDates = new Set<string>();
    entries.forEach((e) => e.weeks.forEach((w) => {
      if (filterDate(w.date)) allDates.add(w.date);
    }));
    const totalWeekCount = allDates.size;

    const unlockDates = new Set<string>();
    unfavoritedEntries.forEach((e) => e.weeks.forEach((w) => {
      if (filterDate(w.date)) unlockDates.add(w.date);
    }));
    const unlockWeekCount = unlockDates.size;

    return {
      item,
      type,
      entries,
      owned,
      wish,
      unlockSeriesCount,
      unlockWeekCount,
      totalWeekCount,
    };
  }, [type, id, myCars, myTracks, wishCars, wishTracks, favoriteSeries, seasonHidePastWeeks, todayStartDate, seasonStartDate]);
}

export default useDetailData;
