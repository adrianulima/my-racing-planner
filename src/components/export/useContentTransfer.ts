import { parseScheduleEntryKey, setContentStore } from "@/store/ir";
import { useSearch } from "wouter";

const removeQueryParams = () => {
  const url = window.location.pathname;
  window.history.replaceState(null, "", url);
};

const parseNumberList = (value?: string) =>
  value
    ?.split("-")
    .filter(Boolean)
    .map((n) => parseInt(n, 10))
    .filter(Number.isInteger) ?? [];

const parseScheduleList = (value?: string) =>
  value?.split(",").filter((key) => !!parseScheduleEntryKey(key)) ?? [];

function useContentTransfer() {
  const query = useSearch();

  const urlSearchParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlSearchParams);

  const hasNewData =
    !!query &&
    ("myCars" in params ||
      "myTracks" in params ||
      "wishCars" in params ||
      "wishTracks" in params ||
      "favoriteSeries" in params ||
      "mySchedule" in params);

  const applyData = () => {
    if (!hasNewData) return;
    const myCars = parseNumberList(params.myCars);
    const myTracks = parseNumberList(params.myTracks);
    const wishCars = parseNumberList(params.wishCars);
    const wishTracks = parseNumberList(params.wishTracks);
    const favoriteSeries = parseNumberList(params.favoriteSeries);
    const mySchedule = parseScheduleList(params.mySchedule);

    setContentStore({
      myCars,
      myTracks,
      wishCars,
      wishTracks,
      favoriteSeries,
      mySchedule,
    });
    removeQueryParams();
  };

  const ignoreData = () => {
    if (!hasNewData) return;
    removeQueryParams();
  };

  return { hasNewData, applyData, ignoreData };
}

export default useContentTransfer;
