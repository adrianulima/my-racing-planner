import useDebounce from "@/hooks/useDebounce";
import SORTED_SERIES from "@/ir-data/utils/series";
import { ECarCategories } from "@/ir-data/utils/types";
import { useIr } from "@/store/ir";
import { useEffect, useState } from "react";
import ContentFilterPanel from "../content/content-filter-panel";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import SeriesTable from "./series-table";
import SeriesTableRow from "./series-table-row";

function SeriesPage() {
  const [tabCategory, setTabCategory] = useState<ECarCategories>(
    ECarCategories.all,
  );
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState(SORTED_SERIES);

  const debouncedSearch = useDebounce(search, 500);

  const { favoriteSeries } = useIr();

  useEffect(() => {
    const filteredContent =
      tabCategory === ECarCategories.all
        ? SORTED_SERIES
        : SORTED_SERIES.filter(
            (content: any) =>
              ECarCategories[
                content.category as keyof typeof ECarCategories
              ] === tabCategory,
          );
    const trimmedSearch = debouncedSearch
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const filteredContentWithSearch = !!trimmedSearch
      ? filteredContent.filter((content) =>
          content.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(trimmedSearch),
        )
      : filteredContent;

    setList(filteredContentWithSearch);
  }, [debouncedSearch, tabCategory]);

  return (
    <Page>
      <PageHeader
        title="My Favorite Series"
        description="Select the series you wanna see in your season planner"
      />
      <ContentFilterPanel
        tabs={ECarCategories}
        tab={tabCategory}
        onTabChange={setTabCategory}
        search={search}
        onSearchChange={setSearch}
      />

      <SeriesTable
        list={list}
        rows={(item) => {
          return (
            <SeriesTableRow
              key={item.id}
              id={item.id}
              name={item.name}
              logo={item.logo}
              category={item.category}
              favorite={favoriteSeries.includes(item.id)}
              fixed={item.fixed}
              cars={item.cars}
              weeks={item.weeks}
              license={item.license.letter}
              color={item.license.color}
              duration={item.duration}
              laps={item.laps}
              official={item.official}
            />
          );
        }}
      />
    </Page>
  );
}

export default SeriesPage;
