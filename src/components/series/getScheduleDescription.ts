import { createSeriesScheduleDescription } from "@/utils/race-schedule";
import SERIES_JSON from "../../ir-data/series.json";

function getScheduleDescription(
  id: number,
  seasonUseLocalTimezone: boolean = false,
) {
  const timezoneOffsetMinutes = seasonUseLocalTimezone
    ? -new Date().getTimezoneOffset()
    : 0;

  const series = SERIES_JSON[id.toString() as keyof typeof SERIES_JSON];

  // Generate schedule description from actual race schedule data
  // Pass the timezone offset if using local timezone
  const scheduleDescription =
    series?.raceSchedule &&
    createSeriesScheduleDescription(series.raceSchedule, timezoneOffsetMinutes);
  return scheduleDescription;
}

export default getScheduleDescription;
