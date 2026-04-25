import i18n from "@/i18n";

/**
 * Utilities for creating human-readable race schedule descriptions
 * from iRacing API race_time_descriptors objects
 */

interface RaceTimeDescriptor {
  dayOffset: number[];
  firstSessionTime: string;
  repeatMinutes?: number;
  repeating: boolean;
  sessionMinutes: number;
  startDate: string;
  superSession: boolean;
}

/**
 * Creates a human-readable description of a race schedule
 * @param descriptor The race time descriptor object from the iRacing API
 * @param timezoneOffsetMinutes Optional timezone offset in minutes (positive for east of UTC, negative for west)
 * @returns A string with a human-readable schedule description
 */
export function createReadableSchedule(
  descriptor: RaceTimeDescriptor,
  timezoneOffsetMinutes: number = 0,
): string {
  // Check if descriptor has required properties
  if (!descriptor || !descriptor.firstSessionTime) {
    return i18n.t("schedule.unavailable");
  }

  // Get the start time in a readable format and adjust for timezone
  const startTime = descriptor.firstSessionTime.substring(0, 5);
  let [hours, minutes] = startTime.split(":").map(Number);

  // Apply timezone offset
  const totalMinutes = hours * 60 + minutes + timezoneOffsetMinutes;
  hours = Math.floor(totalMinutes / 60) % 24; // Ensure hours wrap around 24
  minutes = totalMinutes % 60;

  // Handle repeating races
  const repeatMinutes = descriptor.repeatMinutes || 0;

  // For repeating events, we need to determine the pattern
  if (isEveryDayPattern(descriptor.dayOffset)) {
    // Daily races (offsets 0,1,2,3,4,5,6 from start date)
    return createDailyScheduleDescription(hours, minutes, repeatMinutes);
  } else if (isWeeklyPattern(descriptor.dayOffset)) {
    // Weekly races (offsets with consistent 7-day intervals)
    return createWeeklyScheduleDescription(hours, minutes, repeatMinutes);
  } else if (descriptor.dayOffset.length === 1) {
    // Single day races
    return i18n.t("schedule.onDate", {
      date: formatDate(descriptor.startDate, descriptor.dayOffset[0]),
      pattern: createTimePattern(hours, minutes, repeatMinutes),
    });
  } else {
    // Multiple specific days
    return createMultipleDaysScheduleDescription(
      descriptor,
      hours,
      minutes,
      repeatMinutes,
      timezoneOffsetMinutes,
    );
  }
}

/**
 * Determines if the dayOffset array represents an every-day pattern
 */
function isEveryDayPattern(dayOffsets: number[]): boolean {
  if (dayOffsets.length !== 7) return false;

  // Check if it's a consecutive sequence from 0-6
  for (let i = 0; i < 7; i++) {
    if (!dayOffsets.includes(i)) return false;
  }

  return true;
}

/**
 * Determines if the dayOffset array represents a weekly pattern
 */
function isWeeklyPattern(dayOffsets: number[]): boolean {
  if (dayOffsets.length <= 1) return false;

  // Check if all offsets are multiples of 7 from some base day
  const baseDays = new Set(dayOffsets.map((d) => d % 7));
  return baseDays.size === 1 || (baseDays.size <= 2 && dayOffsets.length >= 3);
}

/**
 * Creates a description for daily repeating races
 */
function createDailyScheduleDescription(
  hours: number,
  minutes: number,
  repeatMinutes: number,
): string {
  // Handle common intervals
  if (repeatMinutes === 15) {
    return i18n.t("schedule.every15");
  } else if (repeatMinutes === 30) {
    if (minutes === 0) {
      return i18n.t("schedule.every30At00");
    } else if (minutes === 15) {
      return i18n.t("schedule.every30At15");
    } else {
      return i18n.t("schedule.every30StartingMinutes", {
        minutes: formatMinutesStr(minutes),
      });
    }
  } else if (repeatMinutes === 60) {
    if (minutes === 0) {
      return i18n.t("schedule.everyHourAt", { minutes: "00" });
    } else if (minutes === 45) {
      return i18n.t("schedule.everyHourAt", { minutes: "45" });
    } else {
      return i18n.t("schedule.everyHourAt", {
        minutes: formatMinutesStr(minutes),
      });
    }
  } else if (repeatMinutes === 120) {
    // Even/odd hour patterns - this is where timezone offset matters
    const isEvenHour = hours % 2 === 0;

    if (isEvenHour) {
      if (minutes === 0) {
        return i18n.t("schedule.everyEven2At", { minutes: "00" });
      } else if (minutes === 45) {
        return i18n.t("schedule.everyEven2At", { minutes: "45" });
      } else {
        return i18n.t("schedule.everyEven2At", {
          minutes: formatMinutesStr(minutes),
        });
      }
    } else {
      if (minutes === 0) {
        return i18n.t("schedule.everyOdd2At", { minutes: "00" });
      } else if (minutes === 45) {
        return i18n.t("schedule.everyOdd2At", { minutes: "45" });
      } else {
        return i18n.t("schedule.everyOdd2At", {
          minutes: formatMinutesStr(minutes),
        });
      }
    }
  } else {
    // Generic case
    return i18n.t("schedule.everyMinutes", { minutes: repeatMinutes });
  }
}

/**
 * Creates a description for weekly race schedules
 */
function createWeeklyScheduleDescription(
  hours: number,
  minutes: number,
  repeatMinutes: number,
): string {
  // This is a simplified implementation
  // In a real implementation, you'd determine the day of week

  if (repeatMinutes === 0) {
    return i18n.t("schedule.weeklyAt", {
      time: formatTimeString(hours, minutes),
    });
  } else if (repeatMinutes === 60) {
    return i18n.t("schedule.weeklyEveryHour", {
      time: formatTimeString(hours, minutes),
    });
  } else if (repeatMinutes === 120) {
    return i18n.t("schedule.weeklyEvery2", {
      time: formatTimeString(hours, minutes),
    });
  } else {
    return i18n.t("schedule.weeklyEveryMinutes", {
      minutes: repeatMinutes,
      time: formatTimeString(hours, minutes),
    });
  }
}

/**
 * Creates a description for schedules with multiple specific days
 */
function createMultipleDaysScheduleDescription(
  descriptor: RaceTimeDescriptor,
  hours: number,
  minutes: number,
  repeatMinutes: number,
  timezoneOffsetMinutes: number = 0,
): string {
  // Calculate the days of the week for each offset
  const daysOfWeek = descriptor.dayOffset.map((offset) => {
    // When applying timezone offset, we need to check if the day changes
    const date = new Date(descriptor.startDate);

    // First add the day offset
    date.setDate(date.getDate() + offset);

    // Then adjust for timezone if needed
    if (timezoneOffsetMinutes !== 0) {
      // Get the time from firstSessionTime
      const [sessionHours, sessionMinutes] = descriptor.firstSessionTime
        .split(":")
        .map(Number);

      // Set the time on the date object
      date.setHours(sessionHours, sessionMinutes, 0, 0);

      // Apply timezone offset
      date.setMinutes(date.getMinutes() + timezoneOffsetMinutes);
    }

    return date.toLocaleDateString(i18n.language, { weekday: "long" });
  });

  // Format time
  const timeStr = formatTimeString(hours, minutes);

  if (repeatMinutes === 0) {
    return i18n.t("schedule.racesAtOn", {
      time: timeStr,
      days: formatList(daysOfWeek),
    });
  } else if (repeatMinutes === 60) {
    return i18n.t("schedule.racesEveryHourOn", {
      days: formatList(daysOfWeek),
      time: timeStr,
    });
  } else if (repeatMinutes === 120) {
    return i18n.t("schedule.racesEvery2On", {
      days: formatList(daysOfWeek),
      time: timeStr,
    });
  } else {
    return i18n.t("schedule.racesEveryMinutesOn", {
      minutes: repeatMinutes,
      days: formatList(daysOfWeek),
      time: timeStr,
    });
  }
}

/**
 * Creates a description of the time pattern
 */
function createTimePattern(
  hours: number,
  minutes: number,
  repeatMinutes: number,
): string {
  const timeStr = formatTimeString(hours, minutes);

  if (repeatMinutes === 0) {
    return i18n.t("schedule.atTime", { time: timeStr });
  } else if (repeatMinutes === 60) {
    if (minutes === 0) {
      return i18n.t("schedule.patternEveryHourAt", { minutes: "00" });
    } else if (minutes === 45) {
      return i18n.t("schedule.patternEveryHourAt", { minutes: "45" });
    } else {
      return i18n.t("schedule.patternEveryHourAt", {
        minutes: formatMinutesStr(minutes),
      });
    }
  } else if (repeatMinutes === 120) {
    const isEvenHour = hours % 2 === 0;

    if (isEvenHour) {
      if (minutes === 45) {
        return i18n.t("schedule.patternEveryEven2At");
      } else {
        return i18n.t("schedule.patternEveryEven2Starting", {
          time: timeStr,
        });
      }
    } else {
      if (minutes === 45) {
        return i18n.t("schedule.patternEveryOdd2At");
      } else {
        return i18n.t("schedule.patternEveryOdd2Starting", {
          time: timeStr,
        });
      }
    }
  } else if (repeatMinutes === 30) {
    if (minutes === 0) {
      return i18n.t("schedule.patternEvery30At00");
    } else if (minutes === 15) {
      return i18n.t("schedule.patternEvery30At15");
    } else {
      return i18n.t("schedule.patternEvery30Starting", { time: timeStr });
    }
  } else {
    return i18n.t("schedule.patternEveryMinutesStarting", {
      minutes: repeatMinutes,
      time: timeStr,
    });
  }
}

/**
 * Formats a time string in 12-hour format
 */
function formatTimeString(hours: number, minutes: number): string {
  // Ensure hours are in 0-23 range
  hours = ((hours % 24) + 24) % 24;

  const period = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${formatMinutesStr(minutes)}${period}`;
}

/**
 * Formats minutes with leading zero if needed
 */
function formatMinutesStr(minutes: number): string {
  // Ensure minutes are in 0-59 range
  minutes = ((minutes % 60) + 60) % 60;
  return minutes.toString().padStart(2, "0");
}

/**
 * Formats a list of items in a natural language way
 */
function formatList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2)
    return i18n.t("schedule.listTwo", { first: items[0], second: items[1] });

  const lastItem = items[items.length - 1];
  const otherItems = items.slice(0, -1).join(", ");
  return i18n.t("schedule.listMany", { items: otherItems, last: lastItem });
}

/**
 * Formats a date with an offset
 */
function formatDate(startDate: string, offset: number): string {
  const date = new Date(startDate);
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString(i18n.language, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Creates a human-readable description for all race time descriptors in a series
 * @param descriptors Array of race time descriptors
 * @param timezoneOffsetMinutes Optional timezone offset in minutes
 * @returns A string with all schedule descriptions
 */
export function createSeriesScheduleDescription(
  descriptors: Partial<RaceTimeDescriptor>[],
  timezoneOffsetMinutes: number = 0,
): string {
  if (!descriptors || descriptors.length === 0) {
    return i18n.t("schedule.noScheduled");
  }

  // Filter out invalid descriptors
  const validDescriptors = descriptors.filter(
    (descriptor) =>
      descriptor &&
      descriptor.repeating &&
      descriptor.firstSessionTime &&
      descriptor.dayOffset,
  );

  if (validDescriptors.length === 0) {
    return i18n.t("schedule.unavailable");
  }

  // Handle single descriptor case
  if (validDescriptors.length === 1) {
    return createReadableSchedule(
      validDescriptors[0] as RaceTimeDescriptor,
      timezoneOffsetMinutes,
    );
  }

  // Handle multiple descriptors
  return validDescriptors
    .map((descriptor, index) => {
      return i18n.t("schedule.scheduleN", {
        number: index + 1,
        schedule: createReadableSchedule(
          descriptor as RaceTimeDescriptor,
          timezoneOffsetMinutes,
        ),
      });
    })
    .join("\n");
}
