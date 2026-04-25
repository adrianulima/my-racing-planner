import { useIr, toggleScheduleEntry } from "@/store/ir";
import { useUi } from "@/store/ui";
import { Text } from "@chakra-ui/react";
import { getContentColorScale } from "@/utils/color";
import ContentCheckbox from "../content/content-checkbox";
import SeasonTableCarsPopover from "./season-table-cars-popover";
import SortableColumnCell from "./sortable-column-cell";
import { Tooltip } from "../ui/tooltip";
import { TSeriesDateMap } from "./useSeason";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const { mySchedule } = useIr();
  const scheduled = mySchedule.includes(`${seriesId}_${date}`);

  const handleCellClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on interactive children (checkbox, popover button)
    const target = e.target as HTMLElement;
    if (target.closest("input, button, label, [role='checkbox']")) return;
    toggleScheduleEntry(seriesId, date);
  };

  const cars =
    (seriesDateMap?.[seriesId as keyof typeof seriesDateMap]?.[
      `${date}_cars`
    ] as number[]) || [];

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
  return (
    <SortableColumnCell
      dragId={seriesId}
      position={"relative"}
      onMouseEnter={() => seasonHighlight && setHighlightTrack(sku)}
      onMouseLeave={() => seasonHighlight && setHighlightTrack(-1)}
      bgColor={seasonHighlight && highlight ? bgColorHighlight : bgColor}
      color={color}
      onClick={handleCellClick}
      cursor="pointer"
      boxShadow={scheduled ? "inset 0 0 0 1.5px var(--chakra-colors-fg-muted)" : undefined}
    >
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
