import { IR_URL } from "@/ir-data/utils/urls";
import {
  setFavoriteSeriesItem,
  setFavoriteSeriesList,
  useIr,
} from "@/store/ir";
import { setSeasonAxisInverted, useUi } from "@/store/ui";
import { trackEvent } from "@/utils/analytics";
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
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SERIES_JSON from "../../ir-data/series.json";
import { useAppLayout } from "../app/useAppLayout";
import { Tooltip } from "../ui/tooltip";
import SeasonCarsPopover from "./season-cars-popover";
import SeasonTableHeaderParticipation from "./season-table-header-participation";
import SortableColumnHeader from "./sortable-column-header";
import LicenseBadge from "../badges/license-badge";
import getScheduleDescription from "../series/getScheduleDescription";
import StarCheckbox from "../series/star-checkbox";
import { TSeriesDateMap } from "./useSeason";
import { useTranslation } from "react-i18next";
import useDelayedHoverId from "./useDelayedHoverId";

function SeasonTableHeader({
  filteredFavorites,
  seriesDateMap,
}: {
  filteredFavorites: number[];
  seriesDateMap: TSeriesDateMap;
}) {
  const {
    seasonShowReorder,
    seasonShowCarsDropdown,
    seasonShowParticipation,
    seasonUseLocalTimezone,
  } = useUi();
  const { scrolled } = useAppLayout();
  const { favoriteSeries } = useIr();
  const { t } = useTranslation();
  const {
    activeId: visibleStarSeriesId,
    onHoverStart,
    onHoverEnd,
  } = useDelayedHoverId<number>(150);

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
          <Tooltip
            lazyMount
            unmountOnExit
            content={t("settings.invertAxis")}
            showArrow
            positioning={{ placement: "bottom" }}
            openDelay={200}
            closeDelay={100}
          >
            <Box
              as="button"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width="100%"
              height="100%"
              cursor={"pointer"}
              onClick={() => setSeasonAxisInverted(true)}
              color={"fg.muted"}
              _hover={{ color: "fg" }}
            >
              <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
            </Box>
          </Tooltip>
        </Table.ColumnHeader>

        <For
          each={filteredFavorites}
          children={(seriesId, i) => {
            const series =
              SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON];

            const raceDuration =
              series &&
              createSimpleScheduleDescription(series.laps, series.duration);

            const scheduleDescription = getScheduleDescription(
              seriesId,
              seasonUseLocalTimezone,
            );

            return (
              series && (
                <SortableColumnHeader
                  dragId={seriesId}
                  showDragButton={seasonShowReorder}
                  onClickSwap={i !== 0 ? () => onClickSwap(i) : undefined}
                  key={seriesId}
                  position={"relative"}
                  bgColor={"currentBg"}
                  onMouseEnter={() => onHoverStart(series.id)}
                  onMouseLeave={() => onHoverEnd(series.id)}
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
                          fontWeight="bold"
                        >
                          {series.name}
                        </Text>

                        <Text
                          textAlign="center"
                          width="100%"
                          whiteSpace="normal"
                          wordBreak="break-word"
                        >
                          <LicenseBadge
                            letter={series.license.letter}
                            color={series.license.color}
                            mr="1"
                            themeInverted
                          >
                            {series.license.letter}
                          </LicenseBadge>
                          {raceDuration} {t("common.race")}
                        </Text>

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

                  <Box
                    position="absolute"
                    top={1}
                    right={seasonShowCarsDropdown ? "84px" : 1}
                    zIndex={2}
                    opacity={visibleStarSeriesId === series.id ? 1 : 0}
                    pointerEvents={
                      visibleStarSeriesId === series.id ? "auto" : "none"
                    }
                    transition="opacity 0.15s ease"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <StarCheckbox
                      size="sm"
                      aria-label={`Unfavorite ${series.name}`}
                      checked={true}
                      onCheckedChange={() => {
                        setFavoriteSeriesItem(series.id, false);
                        trackEvent("favorite_series_change", {
                          action: "remove",
                          category: series.category,
                          license: series.license.letter,
                        });
                      }}
                    />
                  </Box>

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
