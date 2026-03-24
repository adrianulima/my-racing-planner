import { setContentStore } from "@/store/ir";
import { useSearch } from "wouter";

const removeQueryParams = () => {
  const url = window.location.pathname;
  window.history.replaceState(null, "", url);
};

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
    const myCars = params.myCars
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));
    const myTracks = params.myTracks
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));
    const wishCars = params.wishCars
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));
    const wishTracks = params.wishTracks
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));
    const favoriteSeries = params.favoriteSeries
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));
    const mySchedule = params.mySchedule
      ?.split(",")
      .filter(Boolean) ?? [];

    setContentStore({ myCars, myTracks, wishCars, wishTracks, favoriteSeries, mySchedule });
    removeQueryParams();
  };

  const ignoreData = () => {
    if (!hasNewData) return;
    removeQueryParams();
  };

  return { hasNewData, applyData, ignoreData };
}

export default useContentTransfer;
