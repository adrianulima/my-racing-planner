import { create } from "zustand";
import { persist } from "zustand/middleware";
import SERIES_JSON from "../ir-data/series.json";

export interface IMyContentStore {
  myCars: number[];
  myTracks: number[];
  wishCars: number[];
  wishTracks: number[];
  favoriteSeries: number[];
  mySchedule: string[];
  cartExcludes: number[];
  weekOffDates: string[];
}

const getPreviousTuesday = (date: string): string => {
  const inputDate = new Date(date);
  const utcDay = inputDate.getUTCDay();

  if (utcDay !== 2) {
    const offset = utcDay - 2 >= 0 ? utcDay - 2 : utcDay - 2 + 7;
    inputDate.setUTCDate(inputDate.getUTCDate() - offset);
  }

  const year = inputDate.getUTCFullYear();
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const sanitizeFavoriteSeries = (list: number[] = []) => {
  const unique = new Set<number>();

  for (const id of list) {
    if (
      Number.isInteger(id) &&
      id > 0 &&
      !!SERIES_JSON[id.toString() as keyof typeof SERIES_JSON]
    ) {
      unique.add(id);
    }
  }

  return [...unique];
};

const DEFAULT_CONTENT_STORE: IMyContentStore = {
  myCars: [],
  myTracks: [],
  wishCars: [],
  wishTracks: [],
  favoriteSeries: [],
  mySchedule: [],
  cartExcludes: [],
  weekOffDates: [],
};

export const getScheduleEntryKey = (seriesId: number, date: string) =>
  `${seriesId}_${date}`;

export function parseScheduleEntryKey(key: string) {
  const idx = key.indexOf("_");
  const seriesId = Number(key.substring(0, idx));
  const date = key.substring(idx + 1);

  if (
    idx <= 0 ||
    !Number.isInteger(seriesId) ||
    seriesId <= 0 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    return null;
  }

  return {
    seriesId,
    date,
  };
}

export function sanitizeScheduleEntries(
  keys: string[] = [],
  allowedSeries?: number[],
) {
  const allowedSet = allowedSeries ? new Set(allowedSeries) : null;
  const seriesWeeksCache = new Map<number, Set<string>>();
  const sanitized = new Set<string>();

  for (const key of keys) {
    const parsed = parseScheduleEntryKey(key);
    if (!parsed) continue;

    const { seriesId, date } = parsed;
    if (allowedSet && !allowedSet.has(seriesId)) continue;

    const series = SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON];
    if (!series) continue;

    if (!seriesWeeksCache.has(seriesId)) {
      const validDates = new Set<string>(
        ((series.weeks as { date: string }[] | undefined) ?? []).map((week) =>
          getPreviousTuesday(week.date),
        ),
      );
      seriesWeeksCache.set(seriesId, validDates);
    }

    const validDates = seriesWeeksCache.get(seriesId);
    if (!validDates?.has(date)) continue;

    sanitized.add(key);
  }

  return [...sanitized];
}

export const useIrStore = create(
  persist<IMyContentStore>(() => DEFAULT_CONTENT_STORE, {
    name: "my-content",
    merge: (persistedState, currentState) => {
      const persisted = (persistedState ?? {}) as Partial<IMyContentStore>;
      const favoriteSeries = sanitizeFavoriteSeries(
        persisted.favoriteSeries ?? currentState.favoriteSeries,
      );

      return {
        ...currentState,
        ...persisted,
        favoriteSeries,
        weekOffDates: persisted.weekOffDates ?? currentState.weekOffDates,
        mySchedule: sanitizeScheduleEntries(
          persisted.mySchedule ?? currentState.mySchedule,
          favoriteSeries,
        ),
      };
    },
  }),
);

type TContentStoreInput = Omit<IMyContentStore, "weekOffDates"> &
  Partial<Pick<IMyContentStore, "weekOffDates">>;

export const setContentStore = (store: TContentStoreInput) => {
  const favoriteSeries = sanitizeFavoriteSeries(store.favoriteSeries);

  useIrStore.setState({
    ...store,
    favoriteSeries,
    weekOffDates: store.weekOffDates ?? [],
    mySchedule: sanitizeScheduleEntries(store.mySchedule, favoriteSeries),
  });
};

export const setMyCar = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    myCars: enabled
      ? [...state.myCars, id]
      : state.myCars.filter((car: number) => car !== id),
  }));

export const setMyTrack = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    myTracks: enabled
      ? [...state.myTracks, id]
      : state.myTracks.filter((track: number) => track !== id),
  }));

export const setWishCar = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    wishCars: enabled
      ? [...state.wishCars, id]
      : state.wishCars.filter((car: number) => car !== id),
  }));

export const setWishTrack = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    wishTracks: enabled
      ? [...state.wishTracks, id]
      : state.wishTracks.filter((track: number) => track !== id),
  }));

export const setFavoriteSeriesItem = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => {
    const favoriteSeries = sanitizeFavoriteSeries(
      enabled
        ? [...state.favoriteSeries, id]
        : state.favoriteSeries.filter((series: number) => series !== id),
    );

    return {
      favoriteSeries,
      mySchedule: sanitizeScheduleEntries(state.mySchedule, favoriteSeries),
    };
  });

export const setFavoriteSeriesList = (list: number[]) =>
  useIrStore.setState((state: IMyContentStore) => {
    const favoriteSeries = sanitizeFavoriteSeries(list);
    return {
      favoriteSeries,
      mySchedule: sanitizeScheduleEntries(state.mySchedule, favoriteSeries),
    };
  });

export const setCartExclude = (sku: number, excluded: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    cartExcludes: excluded
      ? [...(state.cartExcludes ?? []), sku]
      : (state.cartExcludes ?? []).filter((s: number) => s !== sku),
  }));

export const setWeekOffDate = (date: string, weekOff: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    weekOffDates: weekOff
      ? [...new Set([...(state.weekOffDates ?? []), date])]
      : (state.weekOffDates ?? []).filter((d) => d !== date),
  }));

export const toggleScheduleEntry = (seriesId: number, date: string) => {
  const key = getScheduleEntryKey(seriesId, date);
  useIrStore.setState((state: IMyContentStore) => ({
    mySchedule: state.mySchedule.includes(key)
      ? state.mySchedule.filter((k) => k !== key)
      : [...state.mySchedule, key],
  }));
};

export const useIr = () => {
  const myCars = useIrStore((state) => state.myCars);
  const myTracks = useIrStore((state) => state.myTracks);
  const wishCars = useIrStore((state) => state.wishCars);
  const wishTracks = useIrStore((state) => state.wishTracks);
  const favoriteSeriesRaw = useIrStore((state) => state.favoriteSeries);
  const mySchedule = useIrStore((state) => state.mySchedule ?? []);
  const cartExcludes = useIrStore((state) => state.cartExcludes ?? []);
  const weekOffDates = useIrStore((state) => state.weekOffDates ?? []);

  const favoriteSeries = favoriteSeriesRaw.filter(
    (id) => !!SERIES_JSON[id.toString() as keyof typeof SERIES_JSON],
  );

  return {
    myCars,
    myTracks,
    wishCars,
    wishTracks,
    favoriteSeries,
    mySchedule,
    cartExcludes,
    weekOffDates,
  };
};
