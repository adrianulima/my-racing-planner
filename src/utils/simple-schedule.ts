/**
 * Creates a simple human-readable race schedule description based on laps and duration
 * @param laps The number of laps for the race (can be null)
 * @param duration The duration in minutes for the race (can be null)
 * @returns A string with a human-readable schedule description
 */
export function createSimpleScheduleDescription(
  laps: number | null,
  duration: number | null,
): string {
  if (laps && duration) {
    return `${laps} laps or ${duration} min`;
  } else if (laps) {
    return `${laps} laps`;
  } else if (duration) {
    return `${duration} min`;
  }
  return "";
}
