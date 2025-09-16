import { useUi } from "@/store/ui";
import { Text } from "@chakra-ui/react";
import React from "react";
import ContentCheckbox from "../content/content-checkbox";
import SeasonTableCarsPopover from "./season-table-cars-popover";
import SortableColumnCell from "./sortable-column-cell";
import { Tooltip } from "../ui/tooltip";

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
  seriesDateMap: { [key: number]: any };
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

  const cars: number[] =
    seriesDateMap?.[seriesId as keyof typeof seriesDateMap]?.[`${date}_cars`] ||
    [];

  const rainChance: number =
    seriesDateMap?.[seriesId as keyof typeof seriesDateMap]?.[
      `${date}_rainChance`
    ] || 0;

  const color = {
    _dark: free
      ? "green.400"
      : seasonShowOwned && owned
      ? "teal.400"
      : seasonShowWishlist && wish
      ? "blue.400"
      : "red.400",
    base: free
      ? "green.600"
      : seasonShowOwned && owned
      ? "teal.600"
      : seasonShowWishlist && wish
      ? "blue.600"
      : "red.600",
  };
  const bgColor = {
    base: free
      ? "green.50"
      : seasonShowOwned && owned
      ? "teal.50"
      : seasonShowWishlist && wish
      ? "blue.50"
      : "red.50",
    _dark: free
      ? "green.800"
      : seasonShowOwned && owned
      ? "teal.800"
      : seasonShowWishlist && wish
      ? "blue.800"
      : "red.800",
  };
  const bgColorHighlight = {
    _dark: free
      ? "green.900"
      : seasonShowOwned && owned
      ? "teal.900"
      : seasonShowWishlist && wish
      ? "blue.900"
      : "red.900",
    base: free
      ? "green.200"
      : seasonShowOwned && owned
      ? "teal.200"
      : seasonShowWishlist && wish
      ? "blue.200"
      : "red.200",
  };
  return (
    <SortableColumnCell
      dragId={seriesId}
      width="(100/x)%"
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

export default React.memo(SeasonTableRowCell);
