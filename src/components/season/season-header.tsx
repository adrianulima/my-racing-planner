import { useIr } from "@/store/ir";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import { useTranslation } from "react-i18next";
import PageHeader from "../page/page-header";

function SeasonHeader({ filteredFavorites }: { filteredFavorites: number[] }) {
  const { myTracks, wishTracks } = useIr();
  const { t } = useTranslation();
  let free = 0,
    owned = 0,
    wish = 0,
    uniqueFree = 0,
    uniqueOwned = 0,
    uniqueWish = 0;
  const trackSkus = new Set<string>();
  filteredFavorites.forEach((seriesId) => {
    const weeks =
      SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON]?.weeks ?? [];
    weeks.forEach((w) => {
      const track =
        TRACKS_JSON[w.track.id.toString() as keyof typeof TRACKS_JSON];
      if (track) {
        if (track.free) free++;
        if (myTracks.includes(track.sku)) owned++;
        if (wishTracks.includes(track.sku)) wish++;
        if (!trackSkus.has(String(track.sku))) {
          if (track.free) uniqueFree++;
          if (myTracks.includes(track.sku)) uniqueOwned++;
          if (wishTracks.includes(track.sku)) uniqueWish++;
        }
        trackSkus.add(String(track.sku));
      }
    });
  });

  const counts = { free, owned, wish, uniqueFree, uniqueOwned, uniqueWish };

  return (
    <PageHeader
      freeCount={`${counts.uniqueFree} (${counts.free}x)`}
      ownedCount={`${counts.uniqueOwned} (${counts.owned}x)`}
      wishCount={`${counts.uniqueWish} (${counts.wish}x)`}
      title={t("pages.season.title")}
      description={t("pages.season.description")}
    />
  );
}

export default SeasonHeader;
