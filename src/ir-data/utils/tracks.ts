import TRACKS_JSON from "../../ir-data/tracks.json";
import { TContent } from "./types";

const SORTED_TRACKS: TContent[] = Object.values(TRACKS_JSON)
  .filter((c) => !("group" in c))
  .sort((a, b) => {
    const aHasBracket = a.name.includes("[");
    const bHasBracket = b.name.includes("[");
    if (aHasBracket && !bHasBracket) {
      return 1;
    } else if (!aHasBracket && bHasBracket) {
      return -1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

export default SORTED_TRACKS;

export const FREE_TRACKS_COUNT = SORTED_TRACKS.filter((c) => c.free).length;

export const NURB_COMBINED_IDS = [252, 262, 263, 264];
export const NURB_NORDS_SKU = 10395;
export const NURB_GP_SKU = 10396;

export const isNurbCombined = (id: number) => {
  return NURB_COMBINED_IDS.includes(id);
};

export const wishNurbCombined = (
  id: number,
  wishTracks: number[],
  myTracks: number[],
) => {
  const wishGp = wishTracks.includes(NURB_GP_SKU);
  const wishNords = wishTracks.includes(NURB_NORDS_SKU);
  const ownGp = myTracks.includes(NURB_GP_SKU);
  const ownNords = myTracks.includes(NURB_NORDS_SKU);
  return (
    isNurbCombined(id) &&
    ((wishGp && wishNords) || (ownGp && wishNords) || (wishGp && ownNords))
  );
};

export const ownNurbCombined = (id: number, myTracks: number[]) => {
  return (
    isNurbCombined(id) &&
    myTracks.includes(NURB_NORDS_SKU) &&
    myTracks.includes(NURB_GP_SKU)
  );
};
