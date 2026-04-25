import useDebounce from "@/hooks/useDebounce";
import { TContent } from "@/ir-data/utils/types";
import {
  faBookmark,
  faSackXmark,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import ContentFilterPanel from "./content-filter-panel";
import ContentSubPage from "./content-sub-page";
import ContentTable from "./content-table";
import ContentTableRow from "./content-table-row";

enum EContentCheckState {
  None,
  Free,
  Wish,
  Owned,
}

function ContentPage({
  allTab,
  content,
  contentListJson,
  description,
  freeCount,
  myContent,
  skuIcon,
  tabs,
  title,
  wish,
}: {
  allTab: string;
  content: "cars" | "tracks";
  contentListJson: TContent[];
  description: string;
  freeCount: number;
  myContent: number[];
  skuIcon: IconDefinition;
  tabs: { [key: string]: string };
  title: string;
  wish: number[];
}) {
  const [tabCategory, setTabCategory] = useState<string>(allTab);
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState(contentListJson);
  const [filterChecks, setFilterChecks] = useState(EContentCheckState.None);
  const { t } = useTranslation();

  const filterOwned = filterChecks === EContentCheckState.Owned;
  const filterWish = filterChecks === EContentCheckState.Wish;
  const filterFree = filterChecks === EContentCheckState.Free;

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const filteredContent =
      tabCategory === allTab
        ? contentListJson
        : contentListJson.filter((content) =>
            content.categories.some((v: string) => tabs[v] === tabCategory),
          );

    const filteredContentWithCheck =
      filterChecks !== EContentCheckState.None
        ? filteredContent.filter((content) => {
            if (filterChecks === EContentCheckState.Free) {
              return content.free;
            } else if (filterChecks === EContentCheckState.Wish) {
              return wish.includes(content.sku);
            } else if (filterChecks === EContentCheckState.Owned) {
              return myContent.includes(content.sku);
            }
          })
        : filteredContent;

    const trimmedSearch = debouncedSearch
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const filteredContentWithSearch = trimmedSearch
      ? filteredContentWithCheck.filter((content) =>
          content.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(trimmedSearch),
        )
      : filteredContentWithCheck;

    setList(filteredContentWithSearch);
  }, [debouncedSearch, tabCategory, filterChecks]);

  return (
    <Page>
      <PageHeader
        freeCount={freeCount}
        ownedCount={myContent.length ?? 0}
        wishCount={wish.length ?? 0}
        title={title}
        description={description}
      >
        <ContentSubPage hideFrom={"md"} />
      </PageHeader>

      <ContentFilterPanel
        tabs={tabs}
        tab={tabCategory}
        onTabChange={setTabCategory}
        search={search}
        onSearchChange={setSearch}
      />

      <ContentTable
        filterButton={
          <Tooltip
            lazyMount
            unmountOnExit
            content={t("filters.checkboxState")}
            showArrow
            openDelay={200}
            closeDelay={100}
            ids={{ trigger: "checkFilter" }}
          >
            <Checkbox
              ids={{ root: "checkFilter" }}
              checked={filterFree || filterOwned || filterWish}
              controlProps={{
                bgColor:
                  filterFree || filterOwned || filterWish
                    ? { _hover: "fg", base: "gray.400" }
                    : undefined,
                borderColor: { _hover: "fg", base: "gray.400" },
              }}
              icon={
                filterFree ? (
                  <FontAwesomeIcon size={"xs"} icon={faSackXmark} />
                ) : filterWish ? (
                  <FontAwesomeIcon size={"xs"} icon={faBookmark} />
                ) : undefined
              }
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={() => {
                if (filterOwned) {
                  setFilterChecks(EContentCheckState.Wish);
                } else if (filterWish) {
                  setFilterChecks(EContentCheckState.Free);
                } else if (filterFree) {
                  setFilterChecks(EContentCheckState.None);
                } else {
                  setFilterChecks(EContentCheckState.Owned);
                }
              }}
            />
          </Tooltip>
        }
        list={list}
        rows={(item) => {
          const owned = myContent.includes(item.sku);
          const wished = !owned && wish.includes(item.sku);
          return (
            <ContentTableRow
              key={item.id}
              id={item.id}
              sku={item.sku}
              content={content}
              skuIcon={skuIcon}
              price={item.price}
              name={item.name}
              logo={item.logo}
              categories={item.categories}
              free={item.free}
              skuGroup={item.skuGroup}
              series={item.skuSeries ? item.skuSeries : item.series}
              owned={owned}
              wish={wished}
            />
          );
        }}
      />
    </Page>
  );
}

export default ContentPage;
