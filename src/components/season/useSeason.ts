import { useIr } from "@/store/ir";
import { useMemo } from "react";
import SERIES_JSON from "../../ir-data/series.json";

type TWeek = {
  weekNum: number;
  date: string;
  track: { id: number; name: string };
  cars?: { id: number; name: string }[];
};

export function getPreviousTuesday(date: string): string {
  const inputDate = new Date(date);
  const utcDay = inputDate.getUTCDay();

  if (utcDay !== 2) {
    const offset = utcDay - 2 >= 0 ? utcDay - 2 : utcDay - 2 + 7;
    inputDate.setUTCDate(inputDate.getUTCDate() - offset);
  }

  return formatDate(inputDate);
}

export function formatDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const useSeason = () => {
  const { favoriteSeries } = useIr();

  const weeksStartDates = useMemo(
    () => [
      ...new Set(
        favoriteSeries
          .map(
            (seriesId) =>
              SERIES_JSON[
                seriesId.toString() as keyof typeof SERIES_JSON
              ]?.weeks.map((w) => getPreviousTuesday(w.date)) ?? [],
          )
          .flat(),
      ),
    ],
    [favoriteSeries],
  );

  const seriesDateMap = useMemo(
    () =>
      favoriteSeries.reduce((acc, curr) => {
        const series = SERIES_JSON[curr.toString() as keyof typeof SERIES_JSON];
        return {
          ...acc,
          [curr]: series?.weeks.reduce((acc2, curr2: TWeek) => {
            const date = getPreviousTuesday(curr2.date);
            return {
              ...acc2,
              [date]: curr2.track.id,
              ...(series.switching
                ? { [`${date}_cars`]: curr2.cars?.map((c) => c.id) }
                : {}),
            };
          }, {}),
        };
      }, {}),
    [favoriteSeries],
  );

  return { weeksStartDates, seriesDateMap };
};

export default useSeason;
