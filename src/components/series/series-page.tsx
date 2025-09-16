import useDebounce from "@/hooks/useDebounce";
import SORTED_SERIES from "@/ir-data/utils/series";
import { ECarCategories } from "@/ir-data/utils/types";
import { useIr } from "@/store/ir";
import { useEffect, useState } from "react";
import ContentFilterPanel from "../content/content-filter-panel";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import { Tooltip } from "../ui/tooltip";
import SeriesTable from "./series-table";
import SeriesTableRow from "./series-table-row";
import StarCheckbox from "./star-checkbox";

function SeriesPage() {
  const [tabCategory, setTabCategory] = useState<ECarCategories>(
    ECarCategories.all,
  );
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState(SORTED_SERIES);
  const [filterFavs, setFilterFavs] = useState(false);

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

    const filteredContentWithFavs = !!filterFavs
      ? filteredContent.filter((content) => favoriteSeries.includes(content.id))
      : filteredContent;

    const trimmedSearch = debouncedSearch
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const filteredContentWithSearch = !!trimmedSearch
      ? filteredContentWithFavs.filter((content) =>
          content.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(trimmedSearch),
        )
      : filteredContentWithFavs;

    setList(filteredContentWithSearch);
  }, [debouncedSearch, tabCategory, filterFavs]);

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
        filterButton={
          <Tooltip
            lazyMount
            unmountOnExit
            content={"Filter favorite series only"}
            showArrow
            openDelay={200}
            closeDelay={100}
            ids={{ trigger: "favFilter" }}
          >
            <StarCheckbox
              ids={{ root: "favFilter" }}
              gray
              onClick={(e) => e.stopPropagation()}
              checked={filterFavs}
              onCheckedChange={(e) => setFilterFavs(!!e.checked)}
            />
          </Tooltip>
        }
        list={list}
        rows={(item) => (
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
        )}
      />
    </Page>
  );
}

export default SeriesPage;
