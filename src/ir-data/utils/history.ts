import STATS_JSON from "../stats.json";
import { ECarCategories } from "./types";

export enum EHistorySince {
  Ever = "ever",
  TenYears = "tenYears",
  FiveYears = "fiveYears",
  ThreeYears = "threeYears",
  LastYear = "lastYear",
  ThisYear = "thisYear",
}

export enum ESortHistory {
  Released,
  UsagePerYear,
  Usage,
}

type TCountsBySince = Partial<Record<EHistorySince, number>>;
type TStatsItem = {
  sku: number;
  id: number;
  released: number;
} & Partial<Record<keyof typeof ECarCategories, TCountsBySince>>;

function getKeyFromValue(
  value: ECarCategories,
): keyof typeof ECarCategories | undefined {
  const entry = Object.entries(ECarCategories).find(
    ([_, val]) => val === value,
  );
  return entry ? (entry[0] as keyof typeof ECarCategories) : undefined;
}

const thisYear = new Date().getUTCFullYear();
const lastYear = thisYear - 1;
const threeYears = thisYear - 3;
const fiveYears = thisYear - 5;
const tenYears = thisYear - 10;

const years = {
  [EHistorySince.ThisYear]: thisYear,
  [EHistorySince.LastYear]: lastYear,
  [EHistorySince.ThreeYears]: threeYears,
  [EHistorySince.FiveYears]: fiveYears,
  [EHistorySince.TenYears]: tenYears,
};

export const getSortedHistory = (
  category: ECarCategories = ECarCategories.all,
  since: EHistorySince = EHistorySince.Ever,
  sortBy: ESortHistory = ESortHistory.Usage,
) => {
  const k = getKeyFromValue(category);
  return Object.values(STATS_JSON)
    .map((item: TStatsItem) => {
      const categoryStats = k ? item[k] : undefined;
      const count = categoryStats?.[since] ?? 0;
      return {
        sku: item.sku,
        id: item.id,
        released: item.released,
        usagePerYear: count
          ? count /
            Math.max(
              thisYear +
                1 -
                Math.max(
                  item.released,
                  years[since as keyof typeof years] ?? 0,
                ),
              1,
            )
          : 0,
        count,
      };
    })
    .sort((a, b) => {
      if (sortBy === ESortHistory.Usage) {
        return a.count < b.count ? 1 : -1;
      }

      if (sortBy === ESortHistory.UsagePerYear) {
        return a.usagePerYear < b.usagePerYear ? 1 : -1;
      }

      return a.released < b.released ? 1 : -1;
    });
};
