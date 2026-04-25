import SORTED_TRACKS, { FREE_TRACKS_COUNT } from "@/ir-data/utils/tracks";
import { ETrackCategories } from "@/ir-data/utils/types";
import { useIr } from "@/store/ir";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import ContentPage from "./content-page";

function TracksPage() {
  const { myTracks, wishTracks } = useIr();
  const { t } = useTranslation();
  return (
    <ContentPage
      allTab={ETrackCategories.all}
      content={"tracks"}
      contentListJson={SORTED_TRACKS}
      description={t("pages.tracks.description")}
      freeCount={FREE_TRACKS_COUNT}
      myContent={myTracks}
      skuIcon={faRoad}
      tabs={ETrackCategories}
      title={t("pages.tracks.title")}
      wish={wishTracks}
    />
  );
}

export default TracksPage;
