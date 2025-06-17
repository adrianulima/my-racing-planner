import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import CAR_ASSETS_JSON from "./raw/car-assets.json";
import CLASSES_JSON from "./raw/car-classes.json";
import CARS_JSON from "./raw/cars.json";
import LICENSES_JSON from "./raw/licenses.json";
import SERIES_ASSETS_JSON from "./raw/series-assets.json";
import SERIES_SEASON_JSON from "./raw/series-season.json";
import TRACK_ASSETS_JSON from "./raw/track-assets.json";
import TRACKS_JSON from "./raw/tracks.json";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const isLegacy = (name: string) => {
  return (
    name.toLowerCase().includes("legacy") ||
    name.toLowerCase().includes("retired")
  );
};

const NURB_COMBINED_IDS = [252, 262, 263, 264];

const isNurbCombined = (id: number) => {
  return NURB_COMBINED_IDS.includes(id);
};

(async () => {
  const classesById = CLASSES_JSON.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.car_class_id]: curr.cars_in_class.map((c) => c.car_id),
    }),
    {},
  );

  const seriesCarsTracksMaps = (SERIES_SEASON_JSON as any[]).reduce(
    (acc, curr) => {
      const seriesId = curr.schedules[0].series_id;

      const cars = [
        ...new Set(
          curr.car_switching
            ? curr.schedules
                .map((w: any) => w.race_week_cars.map((c: any) => c.car_id))
                .flat()
            : curr.car_class_ids
                .map((c: keyof typeof classesById) => classesById[c])
                .flat(),
        ),
      ];
      const tracks = curr.schedules.map((w: any) => w.track.track_id);

      acc.seriesCars[seriesId] = cars;

      cars.forEach((car: any) => {
        if (!acc.carSeries[car]) {
          acc.carSeries[car] = [];
        }
        acc.carSeries[car].push(seriesId);
      });

      tracks.forEach((tracks: any) => {
        if (!acc.trackSeries[tracks]) {
          acc.trackSeries[tracks] = [];
        }
        if (!acc.trackSeries[tracks].includes(seriesId)) {
          acc.trackSeries[tracks].push(seriesId);
        }
      });

      return acc;
    },
    {
      seriesCars: {},
      carSeries: {},
      trackSeries: {},
    } as {
      seriesCars: Record<number, number[]>;
      carSeries: Record<number, number[]>;
      trackSeries: Record<number, number[]>;
    },
  );

  const parsedCars = CARS_JSON.filter((car) => car.is_ps_purchasable).map(
    (car) => ({
      id: car.car_id,
      name: car.car_name,
      categories: car.categories,
      free: car.free_with_subscription,
      price: car.price,
      sku: car.sku,
      series: seriesCarsTracksMaps.carSeries[car.car_id] ?? [],
      logo:
        CAR_ASSETS_JSON[`${car.car_id}` as keyof typeof CAR_ASSETS_JSON]
          ?.logo ?? undefined,
    }),
  );

  const carsById = parsedCars.reduce((acc, curr) => {
    const existing = Object.values(acc).find((item) => item.sku === curr.sku);
    if (existing) {
      acc[curr.id] = { ...curr, group: existing.id };
    } else {
      const skuGroup = parsedCars
        .filter((item) => item.sku === curr.sku)
        .reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {});

      const skuKeys = Object.keys(skuGroup);
      acc[curr.id] = {
        ...curr,
        skuGroup: skuKeys.length > 1 ? skuGroup : undefined,
        skuSeries:
          skuKeys.length > 1
            ? [
                ...new Set(
                  Object.keys(skuGroup)
                    .map(
                      (sk: string) => seriesCarsTracksMaps.carSeries[sk] ?? [],
                    )
                    .flat(),
                ),
              ]
            : undefined,
      };
    }
    return acc;
  }, {} as Record<string, (typeof parsedCars)[0] & { skuGroup?: { [key: string]: string }; group?: number; skuSeries?: number[] }>);

  const parsedTracks = TRACKS_JSON.filter(
    (track) =>
      !track.retired &&
      (track.is_ps_purchasable || isNurbCombined(track.track_id)),
  ).map((track) => ({
    id: track.track_id,
    name: track.track_name,
    config: track.config_name ?? "",
    categories: [track.category],
    free: track.free_with_subscription,
    price: track.price,
    sku: track.sku,
    series: seriesCarsTracksMaps.trackSeries[track.track_id],
    logo:
      TRACK_ASSETS_JSON[`${track.track_id}` as keyof typeof TRACK_ASSETS_JSON]
        ?.logo ?? undefined,
  }));

  const tracksById = parsedTracks.reduce((acc, curr) => {
    const existing = Object.values(acc).find(
      (item) => item.sku === curr.sku && !("group" in item),
    );
    if (existing) {
      if (isLegacy(existing.name) && !isLegacy(curr.name)) {
        acc[curr.id] = {
          ...curr,
          categories: existing.categories,
          skuGroup: { ...(existing.skuGroup ?? {}) },
          skuSeries: existing.skuSeries
            ? [...(existing.skuSeries ?? [])]
            : undefined,
        };
        Object.keys(existing.skuGroup || {}).forEach((each) => {
          if (each !== curr.id.toString() && acc[each])
            acc[each].group = curr.id;
        });
        delete existing.skuGroup;
        delete existing.skuSeries;
        acc[existing.id] = { ...existing, group: curr.id };
      } else {
        acc[curr.id] = { ...curr, group: existing.id };
      }
    } else {
      const skuGroupItems = parsedTracks.filter(
        (item) => item.sku === curr.sku,
      );
      const skuGroup = skuGroupItems.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: curr.config }),
        {},
      );

      const categories = [
        ...new Set(skuGroupItems.map((item) => item.categories[0])),
      ];

      const skuKeys = Object.keys(skuGroup);
      acc[curr.id] = {
        ...curr,
        categories,
        skuGroup: skuKeys.length > 1 ? skuGroup : undefined,
        skuSeries:
          skuKeys.length > 1
            ? [
                ...new Set(
                  Object.keys(skuGroup)
                    .map(
                      (sk: string) =>
                        seriesCarsTracksMaps.trackSeries[sk] ?? [],
                    )
                    .flat(),
                ),
              ]
            : undefined,
      };
    }
    return acc;
  }, {} as Record<string, (typeof parsedTracks)[0] & { skuGroup?: { [key: string]: string }; group?: number; skuSeries?: number[] }>);

  const licensesById = LICENSES_JSON.map((group) => ({
    id: group.license_group,
    name: group.group_name,
    letter: group.levels[0].license_letter,
    color: group.levels[0].color,
  })).reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

  const seriesById = (SERIES_SEASON_JSON as any[])
    .map((season) => ({
      id: season.schedules[0].series_id,
      name: season.schedules[0].series_name,
      category: season.schedules[0].category,
      laps: season.schedules[0].race_lap_limit,
      duration: season.schedules[0].race_time_limit,
      // season: { id: season.season_id, name: season.season_name },
      switching: season.car_switching,
      official: season.official,
      fixed: season.fixed_setup,
      multiclass: season.multiclass,
      cars: seriesCarsTracksMaps.seriesCars[season.schedules[0].series_id],
      license: licensesById[season.license_group as keyof typeof licensesById],
      logo:
        SERIES_ASSETS_JSON[
          `${season.schedules[0].series_id}` as keyof typeof SERIES_ASSETS_JSON
        ]?.logo ?? undefined,
      weeks: season.schedules.map((week: any) => ({
        weekNum: week.race_week_num,
        date: week.start_date,
        cars: season.car_switching
          ? week.race_week_cars.map((c: any) => ({
              id: c.car_id,
              name: c.car_name,
            }))
          : undefined,
        track: {
          id: week.track.track_id,
          name: week.track.track_name,
          config: week.track.config_name,
        },
        rainChance: week.weather?.weather_summary?.precip_chance ?? 0,
      })),
    }))
    .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

  await writeFile(
    path.join(dirname, "./parsed/cars.json"),
    JSON.stringify(carsById, null, 2),
  );

  await writeFile(
    path.join(dirname, "./parsed/tracks.json"),
    JSON.stringify(tracksById, null, 2),
  );

  await writeFile(
    path.join(dirname, "./parsed/series.json"),
    JSON.stringify(seriesById, null, 2),
  );
})();
