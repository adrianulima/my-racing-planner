import { useUi } from "@/store/ui";
import { Text } from "@chakra-ui/react";
import ContentCheckbox from "../content/content-checkbox";
import SeasonTableCarsPopover from "./season-table-cars-popover";
import SortableColumnCell from "./sortable-column-cell";
import { Tooltip } from "../ui/tooltip";
import { TSeriesDateMap } from "./useSeason";

function getColorScale(
  free: boolean,
  seasonShowOwned: boolean,
  owned: boolean,
  seasonShowWishlist: boolean,
  wish: boolean,
) {
  if (free) return "green";
  if (seasonShowOwned && owned) return "teal";
  if (seasonShowWishlist && wish) return "blue";
  return "red";
}

function SeasonTableRowCell({
  seriesId,
  wish,
  owned,
  free,
  id,
  name,
  config,
  sku,
  date,
  seriesDateMap,
  highlight,
  setHighlightTrack,
}: {
  seriesId: number;
  trackId: number;
  wish: boolean;
  owned: boolean;
  free: boolean;
  id: number;
  name: string;
  config: string;
  sku: number;
  date: string;
  seriesDateMap: TSeriesDateMap;
  highlight: boolean;
  setHighlightTrack: (n: number) => void;
}) {
  const {
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonShowTrackConfig,
    seasonHighlight,
    seasonShowWishlist,
    seasonShowOwned,
    seasonShowRain,
  } = useUi();

  const cars =
    (seriesDateMap?.[seriesId as keyof typeof seriesDateMap]?.[
      `${date}_cars`
    ] as number[]) || [];

  const rainChance =
    (seriesDateMap?.[seriesId as keyof typeof seriesDateMap]?.[
      `${date}_rainChance`
    ] as number) || 0;

  const scale = getColorScale(
    free,
    seasonShowOwned,
    owned,
    seasonShowWishlist,
    wish,
  );
  const color = { _dark: `${scale}.400`, base: `${scale}.600` };
  const bgColor = { base: `${scale}.50`, _dark: `${scale}.800` };
  const bgColorHighlight = { _dark: `${scale}.900`, base: `${scale}.200` };
  return (
    <SortableColumnCell
      dragId={seriesId}
      position={"relative"}
      onMouseEnter={() => seasonHighlight && setHighlightTrack(sku)}
      onMouseLeave={() => seasonHighlight && setHighlightTrack(-1)}
      bgColor={seasonHighlight && highlight ? bgColorHighlight : bgColor}
      color={color}
    >
      {seasonShowRain && rainChance > 0 && (
        <Tooltip
          lazyMount
          unmountOnExit
          content={`${rainChance}% chance of rain`}
          showArrow
          positioning={{ placement: "left" }}
          openDelay={200}
          closeDelay={100}
        >
          <Text
            position="absolute"
            top={1}
            right={1}
            fontSize="14px"
            lineHeight="1"
            zIndex="1"
            userSelect={"none"}
          >
            💧
          </Text>
        </Tooltip>
      )}
      <Text
        userSelect={"none"}
        textAlign={"center"}
        lineClamp="3"
        lineHeight={"18px"}
      >
        {name}
      </Text>
      {seasonShowTrackConfig && config && (
        <Text
          userSelect={"none"}
          textAlign={"center"}
          lineClamp="3"
          lineHeight={"12px"}
          fontSize={"10px"}
          pt="2px"
        >
          ({config})
        </Text>
      )}
      {seasonShowCarsDropdown && cars.length > 0 && (
        <SeasonTableCarsPopover cars={cars} />
      )}
      {seasonShowCheckboxes && (
        <ContentCheckbox
          size={"xs"}
          position={"absolute"}
          left={1}
          top={1}
          content={"tracks"}
          sku={sku}
          contentId={id}
          free={free}
          owned={owned}
          wish={wish}
        />
      )}
    </SortableColumnCell>
  );
}

export default SeasonTableRowCell;
