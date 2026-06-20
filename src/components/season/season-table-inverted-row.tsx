import { IR_URL } from "@/ir-data/utils/urls";
import { ownNurbCombined, wishNurbCombined } from "@/ir-data/utils/tracks";
import { setFavoriteSeriesItem, useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { trackEvent } from "@/utils/analytics";
import { Box, Image, Table, Text, VStack } from "@chakra-ui/react";
import {
  faArrowRightArrowLeft,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import useScreenSize from "@/hooks/useScreenSize";
import { useTranslation } from "react-i18next";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import LicenseBadge from "../badges/license-badge";
import { createSimpleScheduleDescription } from "@/utils/simple-schedule";
import getScheduleDescription from "../series/getScheduleDescription";
import { Tooltip } from "../ui/tooltip";
import SeasonCarsPopover from "./season-cars-popover";
import SeasonTableHeaderParticipation from "./season-table-header-participation";
import SeasonTableRowCell from "./season-table-row-cell";
import { getWeekOffOpacity } from "./season-table-constants";
import { TSeriesDateMap } from "./useSeason";
import StarCheckbox from "../series/star-checkbox";
import useDelayedHoverId from "./useDelayedHoverId";

function SeasonTableInvertedRow({
  seriesId,
  seriesIndex: _seriesIndex,
  weeksStartDates,
  seriesDateMap,
  todayStartDate,
  highlightTrack,
  setHighlightTrack,
  onClickSwap,
}: {
  seriesId: number;
  seriesIndex: number;
  weeksStartDates: string[];
  seriesDateMap: TSeriesDateMap;
  todayStartDate: string;
  highlightTrack: number;
  setHighlightTrack: (n: number) => void;
  onClickSwap?: () => void;
}) {
  const {
    seasonShowReorder,
    seasonShowParticipation,
    seasonShowCarsDropdown,
    seasonUseLocalTimezone,
    seasonShowThisWeek,
    seasonShowWeekOff,
  } = useUi();
  const { myTracks, wishTracks, weekOffDates } = useIr();
  const { width } = useScreenSize();
  const { t } = useTranslation();
  const {
    activeId: visibleStarSeriesId,
    onHoverStart,
    onHoverEnd,
  } = useDelayedHoverId<number>(150);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: seriesId });

  const series = SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON];
  if (!series) return null;

  const raceDuration = createSimpleScheduleDescription(
    series.laps,
    series.duration,
  );
  const scheduleDescription = getScheduleDescription(
    seriesId,
    seasonUseLocalTimezone,
  );

  const showSwapper = seasonShowReorder && !width.md && !!onClickSwap;
  const showDrag = seasonShowReorder && width.md;

  return (
    <Table.Row
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      zIndex={isDragging ? 10 : undefined}
      bgColor={"bg.muted"}
      height="60px"
    >
      {/* Sticky series header cell */}
      <Table.Cell
        position={"sticky"}
        left={"0"}
        zIndex="docked"
        bgColor={"bg.muted"}
        width="150px"
        minWidth="150px"
        onMouseEnter={() => onHoverStart(seriesId)}
        onMouseLeave={() => onHoverEnd(seriesId)}
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
          positioning={{ placement: "right" }}
          openDelay={200}
          closeDelay={100}
        >
          <VStack
            gap={1}
            pb={seasonShowParticipation ? "12px" : 0}
            width="100%"
            position={"relative"}
          >
            {showSwapper && (
              <Box
                position={"absolute"}
                top={0}
                left={0}
                py={1}
                px={2}
                rounded={"full"}
                cursor={"pointer"}
                bg={"bg"}
                color={"fg.muted"}
                borderWidth={1}
                onClick={onClickSwap}
              >
                <FontAwesomeIcon size="sm" icon={faArrowRightArrowLeft} />
              </Box>
            )}
            {showDrag && (
              <Box
                position={"absolute"}
                top={1}
                left={1}
                px={2}
                rounded={"4px"}
                cursor={isDragging ? "grabbing" : "grab"}
                color={"fg.muted"}
                {...attributes}
                {...listeners}
              >
                <FontAwesomeIcon icon={faGripLines} />
              </Box>
            )}
            {series.logo && (
              <Image
                loading="lazy"
                userSelect={"none"}
                draggable={false}
                h="30px"
                fit="contain"
                src={`${IR_URL.image}/img/logos/series/${series.logo}`}
              />
            )}
            <Box width="100%" px={1}>
              <Text textAlign={"center"} lineClamp="2" width="100%">
                {series.name}
              </Text>
            </Box>
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
          opacity={visibleStarSeriesId === seriesId ? 1 : 0}
          pointerEvents={visibleStarSeriesId === seriesId ? "auto" : "none"}
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

        {seasonShowCarsDropdown && <SeasonCarsPopover cars={series.cars} />}
      </Table.Cell>

      {/* One cell per week */}
      {weeksStartDates.map((date) => {
        const trackId = seriesDateMap?.[
          seriesId as keyof typeof seriesDateMap
        ]?.[date] as number;
        const track = TRACKS_JSON[String(trackId) as keyof typeof TRACKS_JSON];
        const wish =
          track &&
          (wishTracks.includes(track.sku) ||
            wishNurbCombined(track.id, wishTracks, myTracks));
        const owned =
          track &&
          (myTracks.includes(track.sku) || ownNurbCombined(track.id, myTracks));

        const thisWeek = seasonShowThisWeek && todayStartDate === date;
        const isWeekOff = weekOffDates.includes(date);
        const weekOffOpacity = getWeekOffOpacity(isWeekOff, seasonShowWeekOff);

        return track ? (
          <SeasonTableRowCell
            key={date}
            seriesId={seriesId}
            trackId={trackId}
            wish={wish}
            owned={owned}
            free={track.free}
            trackContentId={track.id}
            name={track.name}
            config={track.config}
            sku={track.sku}
            date={date}
            seriesDateMap={seriesDateMap}
            highlight={highlightTrack === track?.sku}
            setHighlightTrack={setHighlightTrack}
            noSortableWrapper
            borderLeftWidth={thisWeek ? "2px" : undefined}
            borderRightWidth={thisWeek ? "2px" : undefined}
            borderLeftColor={thisWeek ? "bg.inverted" : undefined}
            borderRightColor={thisWeek ? "bg.inverted" : undefined}
            opacity={weekOffOpacity}
          />
        ) : (
          <Table.Cell
            key={date}
            borderLeftWidth={thisWeek ? "2px" : undefined}
            borderRightWidth={thisWeek ? "2px" : undefined}
            borderLeftColor={thisWeek ? "bg.inverted" : undefined}
            borderRightColor={thisWeek ? "bg.inverted" : undefined}
            opacity={weekOffOpacity}
          />
        );
      })}
    </Table.Row>
  );
}

export default SeasonTableInvertedRow;
