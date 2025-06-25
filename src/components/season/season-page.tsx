import { ECarCategories } from "@/ir-data/utils/types";
import { useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { useEffect, useState } from "react";
import SERIES_JSON from "../../ir-data/series.json";
import Page from "../page/page";
import SeasonFilterPanel from "./season-filter-panel";
import SeasonHeader from "./season-header";
import SeasonPageEmpty from "./season-page-empty";
import SeasonTable from "./season-table";
import SeasonTableEmpty from "./season-table-empty";

function SeasonPage() {
  const { favoriteSeries } = useIr();
  const { seasonCategory } = useUi();

  const [filteredFavorites, setFilteredFavorites] = useState(favoriteSeries);
  useEffect(() => {
    const filtered =
      seasonCategory === ECarCategories.all
        ? favoriteSeries
        : favoriteSeries.filter(
            (seriesId: any) =>
              ECarCategories[
                (
                  SERIES_JSON[
                    seriesId.toString() as keyof typeof SERIES_JSON
                  ] ?? {}
                ).category as keyof typeof ECarCategories
              ] === seasonCategory,
          );
    setFilteredFavorites(filtered);
  }, [seasonCategory, favoriteSeries]);

  return (
    <Page>
      <SeasonHeader filteredFavorites={filteredFavorites} />
      {favoriteSeries.length > 0 && <SeasonFilterPanel />}
      {favoriteSeries.length === 0 && <SeasonPageEmpty />}
      {favoriteSeries.length > 0 && filteredFavorites.length === 0 && (
        <SeasonTableEmpty />
      )}
      {filteredFavorites.length > 0 && (
        <SeasonTable filteredFavorites={filteredFavorites} />
      )}
    </Page>
  );
}

export default SeasonPage;
