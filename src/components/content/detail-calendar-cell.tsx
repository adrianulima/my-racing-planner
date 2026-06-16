import { Table, Text } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { useTranslation } from "react-i18next";
import TRACKS_JSON from "@/ir-data/tracks.json";
import { getContentColorScale } from "@/utils/color";
import ContentCheckbox from "./content-checkbox";
import type { DetailWeek } from "./use-detail-data";

function CalendarCell({
  week,
  trackOwnershipMap,
  highlight,
  onMouseEnter,
  onMouseLeave,
  showConfig,
  showOwned,
  showWishlist,
  showCheckbox,
}: {
  week: DetailWeek | undefined;
  trackOwnershipMap: Map<number, { owned: boolean; wish: boolean }>;
  highlight: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showConfig: boolean;
  showOwned: boolean;
  showWishlist: boolean;
  showCheckbox: boolean;
}) {
  const { t } = useTranslation();
  const track = week
    ? TRACKS_JSON[week.trackId.toString() as keyof typeof TRACKS_JSON]
    : undefined;
  const trackOwn = week ? trackOwnershipMap.get(week.trackId) : undefined;
  const owned = !!trackOwn?.owned || !!track?.free || false;
  const wish = !!trackOwn?.wish && !owned;
  const free = !!track?.free;
  const scale = getContentColorScale(
    free,
    showOwned && owned,
    showWishlist && wish,
  );
  const color = {
    _dark: `${scale}.400` as const,
    base: `${scale}.600` as const,
  };
  const bgColor = {
    base: `${scale}.50` as const,
    _dark: `${scale}.800` as const,
  };

  return (
    <Table.Cell
      bgColor={highlight
        ? { base: `${scale}.200` as const, _dark: `${scale}.900` as const }
        : bgColor}
      color={color}
      textAlign={"center"}
      px={1}
      minWidth={"90px"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      position={"relative"}
    >
      {week ? (
        <>
          {(week.rainChance ?? 0) > 0 && (
            <Tooltip
              lazyMount
              unmountOnExit
              content={t("content.rainChance", { chance: week.rainChance })}
              showArrow
              positioning={{ placement: "left" }}
              openDelay={200}
              closeDelay={100}
            >
              <Text
                position={"absolute"}
                top={1}
                right={1}
                fontSize={"14px"}
                lineHeight={1}
                zIndex={1}
                userSelect={"none"}
              >
                💧
              </Text>
            </Tooltip>
          )}
          {showCheckbox && track && (
            <ContentCheckbox
              size={"xs"}
              position={"absolute"}
              left={1}
              top={1}
              content={"tracks"}
              sku={track.sku as number}
              contentId={week.trackId}
              free={free}
              owned={owned}
              wish={wish}
            />
          )}
          <Text
            userSelect={"none"}
            textAlign={"center"}
            lineClamp={3}
            lineHeight={"18px"}
            fontSize={"xs"}
          >
            {week.trackName}
          </Text>
          {showConfig && week.trackConfig && (
            <Text
              userSelect={"none"}
              textAlign={"center"}
              lineClamp={3}
              lineHeight={"12px"}
              fontSize={"10px"}
              pt={"2px"}
            >
              ({week.trackConfig})
            </Text>
          )}
        </>
      ) : (
        <Text fontSize={"xs"} color={"fg.muted"}>
          -
        </Text>
      )}
    </Table.Cell>
  );
}

export default CalendarCell;
