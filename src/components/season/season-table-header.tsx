import { IR_URL } from "@/ir-data/utils/urls";
import { setFavoriteSeriesList, useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { Collapsible, For, Image, Table, Text, VStack } from "@chakra-ui/react";
import { arrayMove } from "@dnd-kit/sortable";
import SERIES_JSON from "../../ir-data/series.json";
import { useAppLayout } from "../app/useAppLayout";
import { Tooltip } from "../ui/tooltip";
import SeasonCarsPopover from "./season-cars-popover";
import SeasonTableHeaderParticipation from "./season-table-header-participation";
import SortableColumnHeader from "./sortable-column-header";

function SeasonTableHeader({
  filteredFavorites,
  seriesDateMap,
}: {
  filteredFavorites: number[];
  seriesDateMap: { [key: number]: any };
}) {
  const { seasonShowReorder, seasonShowCarsDropdown, seasonShowParticipation } =
    useUi();
  const { scrolled } = useAppLayout();
  const { favoriteSeries } = useIr();

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
            return (
              series && (
                <SortableColumnHeader
                  dragId={seriesId}
                  showDragButton={seasonShowReorder}
                  onClickSwap={i !== 0 ? () => onClickSwap(i) : undefined}
                  key={seriesId}
                  width="(100/x)%"
                  position={"relative"}
                  bgColor={"currentBg"}
                >
                  <VStack
                    gap={1}
                    pb={seasonShowParticipation && !scrolled ? "10px" : 0}
                  >
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

                  {seasonShowParticipation && (
                    <SeasonTableHeaderParticipation
                      seriesTracks={seriesDateMap[seriesId]}
                    />
                  )}

                  {seasonShowCarsDropdown && (
                    <SeasonCarsPopover cars={series.cars} />
                  )}
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
