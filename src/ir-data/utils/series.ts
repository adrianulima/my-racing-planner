import SERIES_JSON from "../series.json";

const SORTED_SERIES = Object.values(SERIES_JSON).sort((a, b) => {
  return a.name.localeCompare(b.name);
});

export default SORTED_SERIES;
