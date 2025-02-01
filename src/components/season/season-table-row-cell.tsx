import { useUi } from "@/store/ui";
import { Text } from "@chakra-ui/react";
import React from "react";
import ContentCheckbox from "../content/content-checkbox";
import SeasonTableCarsPopover from "./season-table-cars-popover";
import SortableColumnCell from "./sortable-column-cell";

function SeasonTableRowCell({
  seriesId,
  wish,
  owned,
  free,
  id,
  name,
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
  sku: number;
  date: string;
  seriesDateMap: { [key: number]: any };
  highlight: boolean;
  setHighlightTrack: (n: number) => void;
}) {
  const {
    seasonShowReorder,
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonHighlight,
    seasonShowWishlist,
    seasonShowOwned,
  } = useUi();

  const cars: number[] =
    seriesDateMap[seriesId as keyof typeof seriesDateMap][`${date}_cars`] || [];
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
  return (
    <SortableColumnCell
      dragEnabled={seasonShowReorder}
      dragId={seriesId}
      width="(100/x)%"
      position={"relative"}
      onMouseEnter={() => seasonHighlight && setHighlightTrack(sku)}
      onMouseLeave={() => seasonHighlight && setHighlightTrack(-1)}
      bgColor={seasonHighlight && highlight ? color : bgColor}
      color={seasonHighlight && highlight ? "bg" : color}
    >
      <Text textAlign={"center"} lineClamp="3">
        {name}
      </Text>
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
