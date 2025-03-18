import { IR_URL } from "@/ir-data/utils/urls";
import { setFavoriteSeriesList, useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { Collapsible, For, Image, Table, Text, VStack } from "@chakra-ui/react";
import { arrayMove } from "@dnd-kit/sortable";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import { useAppLayout } from "../app/useAppLayout";
import { Tooltip } from "../ui/tooltip";
import SeasonCarsPopover from "./season-cars-popover";
import SortableColumnHeader from "./sortable-column-header";
import { ownNurbCombined } from "@/ir-data/utils/tracks";

function SeasonTableHeader({
  filteredFavorites,
  seriesDateMap,
}: {
  filteredFavorites: number[];
  seriesDateMap: { [key: number]: any };
}) {
  const { seasonShowReorder, seasonShowCarsDropdown, seasonShowParticipation } = useUi();
  const { scrolled } = useAppLayout();
  const { favoriteSeries, myTracks } = useIr();

  const onClickSwap = (index: number) => {
    setFavoriteSeriesList(arrayMove(favoriteSeries, index, index - 1));
  };
  return (
    <Table.Header>
      <Table.Row bgColor={"bg.muted"} zIndex="sticky">
        <Table.ColumnHeader
          textAlign={"center"}
          width="60px"
          bgColor={"bg.muted"}
          position={"sticky"}
          left={"0"}
          zIndex="sticky"
        >
          Week
        </Table.ColumnHeader>

        <For
          each={filteredFavorites}
          children={(seriesId, i) => {
            const series =
              SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON];
            const tracksIds = Object.values(seriesDateMap[seriesId as keyof typeof seriesDateMap])
            const numberOfTracksNeededForParticipation = Math.ceil(tracksIds.length * 0.66)
            const tracks: any[] = []
            tracksIds.forEach((trackId) => {
              tracks.push(TRACKS_JSON[trackId as keyof typeof TRACKS_JSON]);
            }
            )
            const numberOfTracks = Object.keys(tracks.filter((track: any) => track.free || (myTracks.includes(track.sku) ||
            ownNurbCombined(track.id, myTracks)))).length
            const enoughTracks = numberOfTracks >= numberOfTracksNeededForParticipation
            return ( series && (
              <SortableColumnHeader
                dragId={seriesId}
                showDragButton={seasonShowReorder}
                onClickSwap={i !== 0 ? () => onClickSwap(i) : undefined}
                key={seriesId}
                width="(100/x)%"
                position={"relative"}
                bgColor={"currentBg"}
              >
                <>
                  {seasonShowParticipation && (
                    <div style={{ backgroundColor: enoughTracks ? "#124a28" : "#511111", color: "white", padding: "5px", display: "block", position: "absolute", bottom: "0", left: "0", width: "100%", zIndex: 1, marginBottom: "2px" }}>
                        <Text
                            textAlign={"center"}
                          >
                            Participation Credit Program: {enoughTracks ? "Yes" : "No"} ({numberOfTracks}/{numberOfTracksNeededForParticipation})
                          </Text>
                    </div>
                  )}
                  <VStack
                  paddingBottom={ seasonShowParticipation ? "30px" : "0"}>
                    {series.logo && (
                      <Image
                        loading="lazy"
                        userSelect={"none"}
                        draggable={false}
                        h="40px"
                        fit="contain"
                        src={`${IR_URL.image}/img/logos/series/${series.logo}`}
                      />
                    )}

                      <Collapsible.Root open={!scrolled}>
                        <Collapsible.Content>
                          <Tooltip
                            lazyMount
                            unmountOnExit
                            content={series.name}
                            showArrow
                            positioning={{ placement: "bottom" }}
                            openDelay={200}
                            closeDelay={100}
                          >
                            <Text
                              textAlign={"center"}
                              lineClamp="2"
                              maxW={"200px"}
                            >
                              {series.name}
                            </Text>
                          </Tooltip>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    </VStack>
                    {seasonShowCarsDropdown && (
                      <SeasonCarsPopover cars={series.cars} />
                    )}
                  </>
                </SortableColumnHeader>
              )
            );
          }}
        />
      </Table.Row>
    </Table.Header>
  );
}

export default SeasonTableHeader;
