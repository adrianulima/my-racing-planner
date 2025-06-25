import { IR_URL } from "@/ir-data/utils/urls";
import { setFavoriteSeriesList, useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { createSeriesScheduleDescription } from "@/utils/race-schedule";
import { createSimpleScheduleDescription } from "@/utils/simple-schedule";
import {
  Box,
  Collapsible,
  For,
  Image,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo } from "react";
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
  const {
    seasonShowReorder,
    seasonShowCarsDropdown,
    seasonShowParticipation,
    seasonUseLocalTimezone,
  } = useUi();
  const { scrolled } = useAppLayout();
  const { favoriteSeries } = useIr();

  // Calculate the local timezone offset in minutes
  const timezoneOffsetMinutes = useMemo(() => {
    if (!seasonUseLocalTimezone) return 0;
    // Get the local timezone offset in minutes
    // Note: getTimezoneOffset() returns the offset in minutes, but with opposite sign
    // e.g., for UTC+2, it returns -120, so we need to negate it
    return -new Date().getTimezoneOffset();
  }, [seasonUseLocalTimezone]);

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

            // Generate race format description
            const raceFormatDescription =
              series &&
              createSimpleScheduleDescription(series.laps, series.duration);

            // Generate schedule description from actual race schedule data
            // Pass the timezone offset if using local timezone
            const scheduleDescription =
              series?.raceSchedule &&
              createSeriesScheduleDescription(
                series.raceSchedule,
                timezoneOffsetMinutes,
              );

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
                  <Tooltip
                    lazyMount
                    unmountOnExit
                    content={
                      <VStack>
                        <Text
                          textAlign={"center"}
                          lineClamp="2"
                          width="100%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                        >
                          {series.name}
                        </Text>
                        {raceFormatDescription && (
                          <Text
                            textAlign="center"
                            width="100%"
                            whiteSpace="normal"
                            wordBreak="break-word"
                          >
                            {raceFormatDescription} race
                          </Text>
                        )}

                        {scheduleDescription && (
                          <VStack>
                            <Text
                              textAlign="center"
                              width="100%"
                              whiteSpace="normal"
                              wordBreak="break-word"
                            >
                              {scheduleDescription}
                            </Text>
                          </VStack>
                        )}
                      </VStack>
                    }
                    showArrow
                    positioning={{ placement: "bottom" }}
                    openDelay={200}
                    closeDelay={100}
                  >
                    <VStack
                      gap={1}
                      pb={seasonShowParticipation && !scrolled ? "12px" : 0}
                      width="100%"
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
                        <Collapsible.Content style={{ width: "100%" }}>
                          <Box width="100%" px={1}>
                            <Text
                              textAlign={"center"}
                              lineClamp="2"
                              width="100%"
                            >
                              {series.name}
                            </Text>
                          </Box>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    </VStack>
                  </Tooltip>

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
