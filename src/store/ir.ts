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
}

export const useIrStore = create(
  persist<IMyContentStore>(
    () => ({
      myCars: [],
      myTracks: [],
      wishCars: [],
      wishTracks: [],
      favoriteSeries: [],
      mySchedule: [],
    }),
    { name: "my-content" },
  ),
);

export const setContentStore = (store: IMyContentStore) => {
  useIrStore.setState(store);
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
  useIrStore.setState((state: IMyContentStore) => ({
    favoriteSeries: enabled
      ? [...state.favoriteSeries, id]
      : state.favoriteSeries.filter((series: number) => series !== id),
  }));

export const setFavoriteSeriesList = (list: number[]) =>
  useIrStore.setState(() => ({ favoriteSeries: list }));

export const getScheduleEntryKey = (seriesId: number, date: string) =>
  `${seriesId}_${date}`;

export const parseScheduleEntryKey = (key: string) => {
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
};

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
  };
};
