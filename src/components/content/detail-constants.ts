import TRACKS_JSON from "@/ir-data/tracks.json";
import type { DetailSeriesEntry, DetailWeek } from "./use-detail-data";

export const LICENSE_COLORS: Record<string, string> = {
  A: "0153db",
  B: "00c702",
  C: "feec04",
  D: "fc8a27",
  R: "fc0706",
};

export const LICENSE_NAMES: Record<string, string> = {
  A: "Class A",
  B: "Class B",
  C: "Class C",
  D: "Class D",
  R: "Rookie",
};

export const LICENSE_OPTIONS = ["A", "B", "C", "D", "R"];

export const CATEGORY_OPTIONS = [
  { key: "oval", label: "Oval" },
  { key: "sports_car", label: "Sports Car" },
  { key: "formula_car", label: "Formula Car" },
  { key: "dirt_oval", label: "Dirt Oval" },
  { key: "dirt_road", label: "Dirt Road" },
];

export function getTodayStartDate(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = (day + 5) % 7;
  const tuesday = new Date(now);
  tuesday.setDate(now.getDate() - diff);
  const y = tuesday.getFullYear();
  const m = String(tuesday.getMonth() + 1).padStart(2, "0");
  const d = String(tuesday.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function buildTrackOwnershipMap(
  myTracks: number[],
  wishTracks: number[],
): Map<number, { owned: boolean; wish: boolean }> {
  const ownMap = new Map<number, { owned: boolean; wish: boolean }>();
  Object.entries(TRACKS_JSON).forEach(([configId, track]) => {
    const cid = Number(configId);
    const owned = myTracks.includes(track.sku);
    const wish = wishTracks.includes(track.sku);
    ownMap.set(cid, { owned, wish });
    const group = (track as Record<string, unknown>).skuGroup;
    if (group && typeof group === "object" && !Array.isArray(group)) {
      Object.keys(group).forEach((key) => {
        const numKey = Number(key);
        if (!ownMap.has(numKey)) {
          ownMap.set(numKey, { owned, wish });
        }
      });
    }
  });
  return ownMap;
}

export function buildDateEntryMap(
  entries: DetailSeriesEntry[],
): Map<string, Map<number, DetailWeek>> {
  const dem = new Map<string, Map<number, DetailWeek>>();
  entries.forEach((e) => {
    e.weeks.forEach((w) => {
      if (!w.date) return;
      if (!dem.has(w.date)) dem.set(w.date, new Map());
      dem.get(w.date)!.set(e.seriesId, w);
    });
  });
  return dem;
}
