export const WEEK_OFF_OPACITY = 0.4;

export const getWeekOffOpacity = (
  isWeekOff: boolean,
  showWeekOff: boolean,
  defaultOpacity?: number,
) => (isWeekOff && showWeekOff ? WEEK_OFF_OPACITY : defaultOpacity);
