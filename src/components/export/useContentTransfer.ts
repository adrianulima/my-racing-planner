import { parseScheduleEntryKey, setContentStore } from "@/store/ir";
import { trackEvent } from "@/utils/analytics";
import { useEffect, useRef } from "react";
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

  const detectedRef = useRef(false);
  useEffect(() => {
    if (hasNewData && !detectedRef.current) {
      detectedRef.current = true;
      trackEvent("content_transfer_detected");
    }
  }, [hasNewData]);

  const applyData = () => {
    if (!hasNewData) return;
    const myCars = parseNumberList(params.myCars);
    const myTracks = parseNumberList(params.myTracks);
    const wishCars = parseNumberList(params.wishCars);
    const wishTracks = parseNumberList(params.wishTracks);
    const favoriteSeries = parseNumberList(params.favoriteSeries);
    const mySchedule = parseScheduleList(params.mySchedule);

    trackEvent("content_transfer_apply", {
      cars_owned_count: myCars.length,
      tracks_owned_count: myTracks.length,
      wishlist_count: wishCars.length + wishTracks.length,
      favorite_series_count: favoriteSeries.length,
      schedule_count: mySchedule.length,
    });

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
    trackEvent("content_transfer_ignore");
    removeQueryParams();
  };

  return { hasNewData, applyData, ignoreData };
}

export default useContentTransfer;
