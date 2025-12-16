import "dotenv/config";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  apiGetCarAssets,
  apiGetCarClasses,
  apiGetCars,
  apiGetLicenses,
  apiGetSeries,
  apiGetSeriesAssets,
  apiGetSeriesSeasons,
  apiGetTrackAssets,
  apiGetTracks,
  authenticate,
} from "./api";

const dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const username = process.env.IRACING_USERNAME ?? "";
  const password = process.env.IRACING_PASSWORD ?? "";
  const clientId = process.env.IRACING_CLIENT_ID ?? "";
  const clientSecret = process.env.IRACING_CLIENT_SECRET ?? "";

  if (
    username === "" ||
    password === "" ||
    clientId === "" ||
    clientSecret === ""
  ) {
    console.error(
      "Missing iRacing credentials. Please set IRACING_USERNAME, IRACING_PASSWORD, IRACING_CLIENT_ID, and IRACING_CLIENT_SECRET in .env file",
    );
    return;
  }

  await authenticate(username, password, clientId, clientSecret);

  console.log("Fetching cars.json");
  const cars = await apiGetCars();
  await writeFile(
    path.join(dirname, "./raw/cars.json"),
    JSON.stringify(cars.data, null, 2),
  );

  console.log("Fetching car-assets.json");
  const carAssets = await apiGetCarAssets();
  await writeFile(
    path.join(dirname, "./raw/car-assets.json"),
    JSON.stringify(carAssets.data, null, 2),
  );

  console.log("Fetching tracks.json");
  const tracks = await apiGetTracks();
  await writeFile(
    path.join(dirname, "./raw/tracks.json"),
    JSON.stringify(tracks.data, null, 2),
  );

  console.log("Fetching track-assets.json");
  const trackAssets = await apiGetTrackAssets();
  await writeFile(
    path.join(dirname, "./raw/track-assets.json"),
    JSON.stringify(trackAssets.data, null, 2),
  );

  console.log("Fetching all-series.json");
  const series = await apiGetSeries();
  await writeFile(
    path.join(dirname, "./raw/all-series.json"),
    JSON.stringify(series.data, null, 2),
  );

  console.log("Fetching series-season.json");
  const seriesSeason = await apiGetSeriesSeasons();
  await writeFile(
    path.join(dirname, "./raw/series-season.json"),
    JSON.stringify(seriesSeason.data, null, 2),
  );

  console.log("Fetching series-assets.json");
  const seriesAssets = await apiGetSeriesAssets();
  await writeFile(
    path.join(dirname, "./raw/series-assets.json"),
    JSON.stringify(seriesAssets.data, null, 2),
  );

  console.log("Fetching car-classes.json");
  const carClass = await apiGetCarClasses();
  await writeFile(
    path.join(dirname, "./raw/car-classes.json"),
    JSON.stringify(carClass.data, null, 2),
  );

  console.log("Fetching licenses.json");
  const lookupLicenses = await apiGetLicenses();
  await writeFile(
    path.join(dirname, "./raw/licenses.json"),
    JSON.stringify(lookupLicenses.data, null, 2),
  );

  // console.log("Fetching seasons.json");
  // const seasons = await apiGetSeasons("2025", "1");
  // await writeFile(
  //   path.join(dirname, "./raw/seasons.json"),
  //   JSON.stringify(seasons.data, null, 2),
  // );
})();
