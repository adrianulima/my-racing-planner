import SORTED_TRACKS, { FREE_TRACKS } from "@/ir-data/utils/tracks";
import { ETrackCategories } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import { useIr } from "@/store/ir";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import ContentPage from "./content-page";

function TracksPage() {
  const { myTracks, wishTracks } = useIr();
  return (
    <ContentPage
      allTab={ETrackCategories.all}
      content={"tracks"}
      contentListJson={SORTED_TRACKS}
      description={
        "Mark the tracks you own and select your favorites. Use the wishlist to preview the content before you buy it."
      }
      freeCount={FREE_TRACKS}
      infoUrl={(id) => `${IR_URL.members}/shop/tracks?trackId=${id}`}
      myContent={myTracks}
      skuIcon={faRoad}
      tabs={ETrackCategories}
      title={"My Tracks"}
      wish={wishTracks}
    />
  );
}

export default TracksPage;
