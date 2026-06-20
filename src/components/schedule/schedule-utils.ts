import { formatDate, getPreviousTuesday } from "../season/useSeason";

export type WeekEntry = {
  seriesId: number;
  date: string;
};

export const shortFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};

export const todayStartDate = getPreviousTuesday(formatDate(new Date()));

export function groupEntriesByDate(entries: WeekEntry[]) {
  return entries.reduce<Record<string, WeekEntry[]>>((acc, entry) => {
    (acc[entry.date] ??= []).push(entry);
    return acc;
  }, {});
}

export function getWeekNumber(date: string, allSeasonDates: string[]) {
  const idx = allSeasonDates.indexOf(date);
  return idx >= 0 ? idx + 1 : 0;
}

export function getWeekRangeLabel(date: string, locale: string) {
  const weekStart = new Date(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setUTCDate(weekEnd.getUTCDate() + 7);

  return `${weekStart.toLocaleDateString(locale, shortFormat)} - ${weekEnd.toLocaleDateString(locale, shortFormat)}`;
}
