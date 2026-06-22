import {
  EHistorySince,
  ESortHistory,
  getSortedHistory,
} from "@/ir-data/utils/history";
import { ECarCategories } from "@/ir-data/utils/types";
import { useIr } from "@/store/ir";
import { trackEvent } from "@/utils/analytics";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TRACKS_JSON from "../../ir-data/tracks.json";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import HistoryFilterPanel from "./history-filter-panel";
import HistoryTable from "./history-table";
import HistoryTableRow from "./history-table-row";

function HistoryPage() {
  const [tabCategory, setTabCategory] = useState<ECarCategories>(
    ECarCategories.all,
  );
  const [since, setSince] = useState<EHistorySince>(EHistorySince.Ever);
  const [sortBy, setSortBy] = useState<ESortHistory>(ESortHistory.Usage);
  const [ownershipFilter, setOwnershipFilter] = useState<string[]>([]);

  const handleSortChange = (v: ESortHistory) => {
    setSortBy(v);
    trackEvent("history_sort_change", { sort_by: v });
  };
  const [list, setList] = useState(
    getSortedHistory(ECarCategories.all, EHistorySince.Ever),
  );

  const { wishTracks, myTracks } = useIr();

  useEffect(() => {
    const filteredContent = getSortedHistory(tabCategory, since, sortBy);
    setList(filteredContent);
  }, [tabCategory, since, sortBy]);

  const filteredList = useMemo(() => {
    if (ownershipFilter.length === 0) return list;
    return list.filter((item) => {
      const track = TRACKS_JSON[item.id.toString() as keyof typeof TRACKS_JSON];
      if (!track) return false;
      const owned = myTracks.includes(item.sku);
      if (ownershipFilter.includes("owned") && owned) return true;
      if (ownershipFilter.includes("not_owned") && !owned && !track.free) return true;
      if (ownershipFilter.includes("free") && track.free) return true;
      return false;
    });
  }, [list, ownershipFilter, myTracks]);
  const { t } = useTranslation();

  return (
    <Page>
      <PageHeader
        title={t("pages.history.title")}
        description={t("pages.history.description")}
      />
      <HistoryFilterPanel
        tabs={ECarCategories}
        tab={tabCategory}
        onTabChange={setTabCategory}
        since={since}
        onSinceChange={setSince}
      />

      <HistoryTable
        sortBy={sortBy}
        setSortBy={handleSortChange}
        list={filteredList}
        ownershipFilter={ownershipFilter}
        onOwnershipFilterChange={setOwnershipFilter}
        rows={(item) => {
          const track =
            TRACKS_JSON[item.id.toString() as keyof typeof TRACKS_JSON];
          if (!track) {
            return null;
          }
          const owned = myTracks.includes(item.sku);
          const wished = !owned && wishTracks.includes(item.sku);
          return (
            <HistoryTableRow
              key={item.id}
              id={track.id}
              sku={item.sku}
              name={track.name}
              logo={track.logo}
              free={track.free}
              count={item.count}
              categories={track.categories}
              owned={owned}
              wish={wished}
              released={item.released}
              usagePerYear={item.usagePerYear}
            />
          );
        }}
      />
    </Page>
  );
}

export default HistoryPage;
