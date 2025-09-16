import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import SERIES_JSON from "./raw/all-series.json";
import TRACKS_JSON from "./raw/tracks.json";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const thisYear = new Date().getUTCFullYear();
const lastYear = thisYear - 1;
const threeYears = thisYear - 3;
const fiveYears = thisYear - 5;
const tenYears = thisYear - 10;

const keys = {
  [thisYear]: "thisYear",
  [lastYear]: "lastYear",
  [threeYears]: "threeYears",
  [fiveYears]: "fiveYears",
  [tenYears]: "tenYears",
};

const getYears = (prev: { [key: string]: number }, yearString: string) => {
  const year = parseInt(yearString);
  const value = { ...prev };

  value.ever = (value.ever ?? 0) + 1;
  if (year >= tenYears) {
    value[keys[tenYears]] = (value[keys[tenYears]] ?? 0) + 1;
    if (year >= fiveYears) {
      value[keys[fiveYears]] = (value[keys[fiveYears]] ?? 0) + 1;
      if (year >= threeYears) {
        value[keys[threeYears]] = (value[keys[threeYears]] ?? 0) + 1;
        if (year >= lastYear) {
          value[keys[lastYear]] = (value[keys[lastYear]] ?? 0) + 1;
          if (year === thisYear) {
            value[keys[thisYear]] = (value[keys[thisYear]] ?? 0) + 1;
          }
        }
      }
    }
  }

  return value;
};

(async () => {
  const tracksMap: any = {};

  const len = SERIES_JSON.length;

  console.log("Fetching all series past seasons");
  let i = 1;
  for (const seriesItem of SERIES_JSON) {
    const { series_name, series_id } = seriesItem;

    console.log(`[${i++}/${len}] ${series_name} - Reading ${series_id}.json`);

    const contents = await readFile(
      path.join(dirname, `./raw/past/${series_id}.json`),
      "utf8",
    );

    const { series } = JSON.parse(contents);
    if (!series.official) {
      continue;
    }

    series.seasons.forEach((season: any) => {
      season.race_weeks.forEach((week: any) => {
        const sku = TRACKS_JSON.find(
          (t) => t.track_id === week.track.track_id,
        )?.sku;
        if (!sku) {
          return;
        }
        const prev = tracksMap[sku] ?? {
          sku,
          id: week.track.track_id,
          released: thisYear,
        };

        tracksMap[sku] = {
          ...prev,
          released: Math.min(season.season_year, prev.released),
          all: {
            ...getYears(prev.all ?? {}, season.season_year),
          },
          [series.category]: {
            ...getYears(prev[series.category] ?? {}, season.season_year),
          },
        };
      });
    });

    await writeFile(
      path.join(dirname, "../src/ir-data/stats.json"),
      JSON.stringify(tracksMap, null, 2),
    );
  }
})();
