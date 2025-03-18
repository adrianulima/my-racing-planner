import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import SERIES_JSON from "../ir-data/series.json";

interface IMyContentStore {
  myCars: number[];
  myTracks: number[];
  wishCars: number[];
  wishTracks: number[];
  favoriteSeries: number[];
}

export const useIrStore = create(
  persist<IMyContentStore>(
    () => ({
      myCars: [],
      myTracks: [],
      wishCars: [],
      wishTracks: [],
      favoriteSeries: [],
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

export const useIr = () => {
  const myCars = useIrStore((state) => state.myCars);
  const myTracks = useIrStore((state) => state.myTracks);
  const wishCars = useIrStore((state) => state.wishCars);
  const wishTracks = useIrStore((state) => state.wishTracks);
  const favoriteSeriesRaw = useIrStore((state) => state.favoriteSeries);

  const favoriteSeries = useMemo(() => {
    return favoriteSeriesRaw.filter(
      (id) => !!SERIES_JSON[id.toString() as keyof typeof SERIES_JSON],
    );
  }, [favoriteSeriesRaw]);

  return {
    myCars,
    myTracks,
    wishCars,
    wishTracks,
    favoriteSeries,
  };
};
