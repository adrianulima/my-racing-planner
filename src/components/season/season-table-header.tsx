import { IR_URL } from "@/ir-data/utils/urls";
import { useUi } from "@/store/ui";
import { For, Image, Table, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import SERIES_JSON from "../../ir-data/series.json";
import { Tooltip } from "../ui/tooltip";
import SeasonCarsPopover from "./season-cars-popover";
import SortableColumnHeader from "./sortable-column-header";

function SeasonTableHeader({
  tableScroll,
  filteredFavorites,
}: {
  tableScroll: boolean;
  filteredFavorites: number[];
}) {
  const { seasonStickyHeader, seasonShowReorder, seasonShowCarsDropdown } =
    useUi();
  const [hideHeaderText, setHideHeaderText] = useState(false);
  return (
    <Table.Header>
      <Table.Row bgColor={"bg.muted"}>
        <Table.ColumnHeader textAlign={"center"} width="60px">
          Week
        </Table.ColumnHeader>

        <For
          each={filteredFavorites}
          children={(seriesId) => {
            const series =
              SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON];
            return (
              <SortableColumnHeader
                dragId={seriesId}
                dragEnabled={seasonShowReorder}
                key={seriesId}
                width="(100/x)%"
                position={"relative"}
                bgColor={"currentBg"}
              >
                <>
                  <VStack>
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
                        opacity={!seasonStickyHeader || !tableScroll ? 1 : 0}
                        transition={"opacity 0.2s linear"}
                        onTransitionEnd={() => setHideHeaderText(tableScroll)}
                      >
                        {(!seasonStickyHeader ||
                          !tableScroll ||
                          !hideHeaderText) &&
                          series.name}
                      </Text>
                    </Tooltip>
                  </VStack>
                  {seasonShowCarsDropdown && (
                    <SeasonCarsPopover cars={series.cars} />
                  )}
                </>
              </SortableColumnHeader>
            );
          }}
        />
      </Table.Row>
    </Table.Header>
  );
}

export default SeasonTableHeader;
