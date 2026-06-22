import { getScheduleEntryKey, toggleScheduleEntry, useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { trackEvent } from "@/utils/analytics";
import { Table, TableCellProps, Text } from "@chakra-ui/react";
import { getContentColorScale } from "@/utils/color";
import ContentCheckbox from "../content/content-checkbox";
import SeasonTableCarsPopover from "./season-table-cars-popover";
import SortableColumnCell from "./sortable-column-cell";
import { Tooltip } from "../ui/tooltip";
import { TSeriesDateMap } from "./useSeason";
import { useTranslation } from "react-i18next";
import { KeyboardEvent, MouseEvent } from "react";
import CARS_JSON from "../../ir-data/cars.json";

function SeasonTableRowCell({
  seriesId,
  wish,
  owned,
  free,
  trackContentId,
  name,
  config,
  sku,
  date,
  seriesDateMap,
  highlight,
  setHighlightTrack,
  noSortableWrapper,
  ...extraCellProps
}: {
  seriesId: number;
  trackId: number;
  wish: boolean;
  owned: boolean;
  free: boolean;
  trackContentId: number;
  name: string;
  config: string;
  sku: number;
  date: string;
  seriesDateMap: TSeriesDateMap;
  highlight: boolean;
  setHighlightTrack: (n: number) => void;
  noSortableWrapper?: boolean;
} & Omit<TableCellProps, "color" | "id">) {
  const {
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonShowTrackConfig,
    seasonHighlight,
    seasonShowWishlist,
    seasonShowOwned,
    seasonShowRain,
  } = useUi();
  const { t } = useTranslation();

  const { mySchedule } = useIr();
  const scheduled = mySchedule.includes(getScheduleEntryKey(seriesId, date));

  const toggleScheduled = () => {
    trackEvent("schedule_entry_change", {
      action: scheduled ? "remove" : "add",
      track_state: free
        ? "free"
        : owned
          ? "owned"
          : wish
            ? "wishlist"
            : "missing",
    });
    toggleScheduleEntry(seriesId, date);
  };

  const handleCellClick = (e: MouseEvent) => {
    // Don't toggle if clicking on interactive children (checkbox, popover button)
    const target = e.target as HTMLElement;
    if (target.closest("input, button, label")) return;
    toggleScheduled();
  };

  const handleCellKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    toggleScheduled();
  };

  const cars =
    (seriesDateMap?.[seriesId as keyof typeof seriesDateMap]?.[
      `${date}_cars`
    ] as number[]) || [];
  const carLabel =
    cars.length === 1
      ? CARS_JSON[cars[0].toString() as keyof typeof CARS_JSON]?.name ||
        `1 ${t("common.cars").toLowerCase()}`
      : cars.length > 1
        ? `${cars.length} ${t("common.cars").toLowerCase()}`
        : undefined;

  const rainChance =
    (seriesDateMap?.[seriesId as keyof typeof seriesDateMap]?.[
      `${date}_rainChance`
    ] as number) || 0;

  const scale = getContentColorScale(
    free,
    seasonShowOwned && owned,
    seasonShowWishlist && wish,
  );
  const color = { _dark: `${scale}.400`, base: `${scale}.600` };
  const bgColor = { base: `${scale}.50`, _dark: `${scale}.800` };
  const bgColorHighlight = { _dark: `${scale}.900`, base: `${scale}.200` };

  const cellProps = {
    position: "relative" as const,
    ...extraCellProps,
    onMouseEnter: () => seasonHighlight && setHighlightTrack(sku),
    onMouseLeave: () => seasonHighlight && setHighlightTrack(-1),
    bgColor: seasonHighlight && highlight ? bgColorHighlight : bgColor,
    color,
    onClick: handleCellClick,
    onKeyDown: handleCellKeyDown,
    cursor: "pointer" as const,
    tabIndex: 0,
    role: "checkbox",
    "aria-checked": scheduled,
    "aria-label": `${name} ${t("nav.mySchedule")}`,
    boxShadow: scheduled
      ? {
          base: `inset 0 0 0 2px var(--chakra-colors-${scale}-600)`,
          _dark: `inset 0 0 0 2px var(--chakra-colors-${scale}-400)`,
        }
      : undefined,
  };

  const cellContent = (
    <>
      {seasonShowRain && rainChance > 0 && (
        <Tooltip
          lazyMount
          unmountOnExit
          content={t("content.rainChance", { chance: rainChance })}
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
      {carLabel && (
        <Text
          userSelect={"none"}
          textAlign={"center"}
          lineClamp="2"
          lineHeight={"12px"}
          fontSize={"12px"}
          fontStyle={"italic"}
          pt="3px"
        >
          {carLabel}
        </Text>
      )}
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
          contentId={trackContentId}
          free={free}
          owned={owned}
          wish={wish}
        />
      )}
    </>
  );

  return noSortableWrapper ? (
    <Table.Cell {...cellProps}>{cellContent}</Table.Cell>
  ) : (
    <SortableColumnCell dragId={seriesId} {...cellProps}>
      {cellContent}
    </SortableColumnCell>
  );
}

export default SeasonTableRowCell;
