import { createSeriesScheduleDescription } from "@/utils/race-schedule";
import SERIES_JSON from "../../ir-data/series.json";

// Only create Date instance once across the entire application
let cachedTimezoneOffset: number | null = null;
function getTimezoneOffset(): number {
  if (cachedTimezoneOffset === null) {
    cachedTimezoneOffset = -new Date().getTimezoneOffset();
  }
  return cachedTimezoneOffset;
}

function getScheduleDescription(
  id: number,
  seasonUseLocalTimezone: boolean = false,
) {
  // Calculate the local timezone offset in minutes
  const timezoneOffsetMinutes = !seasonUseLocalTimezone
    ? 0
    : getTimezoneOffset();

  const series = SERIES_JSON[id.toString() as keyof typeof SERIES_JSON];

  // Generate schedule description from actual race schedule data
  // Pass the timezone offset if using local timezone
  const scheduleDescription =
    series?.raceSchedule &&
    createSeriesScheduleDescription(series.raceSchedule, timezoneOffsetMinutes);
  return scheduleDescription;
}

export default getScheduleDescription;
