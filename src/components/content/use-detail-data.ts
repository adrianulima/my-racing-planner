import { useMemo } from "react";
import { useIr } from "@/store/ir";
import CARS_JSON from "@/ir-data/cars.json";
import TRACKS_JSON from "@/ir-data/tracks.json";
import SERIES_JSON from "@/ir-data/series.json";
import { TContent } from "@/ir-data/utils/types";
import { getPreviousTuesday } from "@/components/season/useSeason";
import { isNurbCombined, ownNurbCombined, wishNurbCombined } from "@/ir-data/utils/tracks";

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

      const weeks = (series.weeks as RawWeek[] | undefined) ?? [];
      const matchingWeeks: DetailWeek[] = [];
      let weekCount = 0;

      for (const week of weeks) {
        if (type === "cars") {
          if (
            !week.cars ||
            week.cars.some((c) => c.id === item.id)
          ) {
            matchingWeeks.push({
              weekNum: week.weekNum,
              date: getPreviousTuesday(week.date),
              trackId: week.track?.id,
              trackName: week.track?.name,
              trackConfig: week.track?.config,
              cars: week.cars,
              rainChance: week.rainChance,
            });
            weekCount++;
          }
        } else {
          if (week.track && validConfigIds.has(week.track.id)) {
            matchingWeeks.push({
              weekNum: week.weekNum,
              date: getPreviousTuesday(week.date),
              trackId: week.track.id,
              trackName: week.track.name,
              trackConfig: week.track.config,
              cars: week.cars,
              rainChance: week.rainChance,
            });
            weekCount++;
          }
        }
      }

      if (weekCount > 0) {
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
          weeks: matchingWeeks,
          weekCount,
        });
      }
    }

    const entries = [...seriesMap.values()];

    const favoriteSet = new Set(favoriteSeries);
    const unfavoritedEntries = entries.filter((e) => !favoriteSet.has(e.seriesId));
    const unlockSeriesCount = unfavoritedEntries.length;

    const allWeekNums = new Set<number>();
    entries.forEach((e) => e.weeks.forEach((w) => allWeekNums.add(w.weekNum)));
    const totalWeekCount = allWeekNums.size;

    const unlockWeekNums = new Set<number>();
    unfavoritedEntries.forEach((e) => e.weeks.forEach((w) => unlockWeekNums.add(w.weekNum)));
    const unlockWeekCount = unlockWeekNums.size;

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
  }, [type, id, myCars, myTracks, wishCars, wishTracks, favoriteSeries]);
}

export default useDetailData;
