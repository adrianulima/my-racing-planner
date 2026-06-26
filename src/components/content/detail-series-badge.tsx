import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { useTranslation } from "react-i18next";
import { useIr } from "@/store/ir";
import { IR_URL } from "@/ir-data/utils/urls";
import SERIES_JSON from "@/ir-data/series.json";
import CARS_JSON from "@/ir-data/cars.json";
import TRACKS_JSON from "@/ir-data/tracks.json";
import { getContentColorScale } from "@/utils/color";
import ContentCheckbox from "./content-checkbox";
import SeasonCarsPopover from "../season/season-cars-popover";
import getScheduleDescription from "../series/getScheduleDescription";
import type { DetailWeek } from "./use-detail-data";

function SeriesBadge({
  seriesId,
  week,
  trackOwnershipMap,
  showConfig,
  showOwned,
  showWishlist,
  showCheckbox,
  showCarsDropdown,
  useLocalTimezone,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
}: {
  seriesId: number;
  week: DetailWeek;
  trackOwnershipMap: Map<number, { owned: boolean; wish: boolean }>;
  showConfig: boolean;
  showOwned: boolean;
  showWishlist: boolean;
  showCheckbox: boolean;
  showCarsDropdown: boolean;
  useLocalTimezone: boolean;
  isHighlighted: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const { t } = useTranslation();
  const { myCars, wishCars } = useIr();
  const series =
    SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON];
  const track =
    TRACKS_JSON[week.trackId.toString() as keyof typeof TRACKS_JSON];
  const trackOwn = trackOwnershipMap.get(week.trackId);
  const hasOwnedCar = (series?.cars ?? []).some((carId) => {
    const car = CARS_JSON[carId.toString() as keyof typeof CARS_JSON];
    return car && (myCars.includes(car.sku) || car.free);
  });
  const hasWishCar = (series?.cars ?? []).some((carId) => {
    const car = CARS_JSON[carId.toString() as keyof typeof CARS_JSON];
    return car && !myCars.includes(car.sku) && !car.free && wishCars.includes(car.sku);
  });
  const trackOwned = !!trackOwn?.owned || !!track?.free || false;
  const trackWish = !!trackOwn?.wish && !trackOwned;
  const trackAvailable = trackOwned || trackWish;
  const carAvailable = hasOwnedCar || hasWishCar;
  const owned = trackOwned && hasOwnedCar;
  const wish = trackAvailable && carAvailable && !owned;
  const free = !!track?.free;
  const scale = getContentColorScale(
    false,
    showOwned && owned,
    showWishlist && wish,
  );
  const bgColor = {
    base: `${scale}.50` as const,
    _dark: `${scale}.800` as const,
  };
  const bgColorHighlight = {
    base: `${scale}.200` as const,
    _dark: `${scale}.900` as const,
  };

  return (
    <VStack
      gap={0.5}
      alignItems={"stretch"}
      width={"100%"}
      height={"100%"}
      p={2}
      bgColor={isHighlighted ? bgColorHighlight : bgColor}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      position={"relative"}
    >
      <HStack gap={1.5} minH={"24px"}>
        {series?.logo && (
          <Image
            loading="lazy"
            userSelect={"none"}
            draggable={false}
            h={"20px"}
            w={"20px"}
            fit="contain"
            src={`${IR_URL.image}/img/logos/series/${series.logo}`}
          />
        )}
        <Text
          fontSize={"xs"}
          fontWeight={"semibold"}
          lineClamp={1}
          flex={1}
        >
          {series?.name ?? ""}
        </Text>
        {showCarsDropdown && series && series.cars && series.cars.length > 0 && (
          <SeasonCarsPopover
            cars={series.cars ?? []}
            position={"static"}
            bgColor={"transparent"}
            px={1}
            fontSize={"xs"}
            gap={0.5}
            _hover={{ bg: "bg.subtle", borderRadius: "md" }}
          />
        )}
      </HStack>
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
            top={"35px"}
            right={"10px"}
            fontSize={"14px"}
            lineHeight={1}
            zIndex={1}
            userSelect={"none"}
          >
            💧
          </Text>
        </Tooltip>
      )}

      {showConfig && week.trackConfig ? (
        <Text fontSize={"10px"} color={"fg.muted"} lineClamp={1}>
          {week.trackConfig}
        </Text>
      ) : null}

      {series && (
        <Text fontSize={"10px"} color={"fg.muted"}>
          {getScheduleDescription(seriesId, useLocalTimezone)}
        </Text>
      )}

      {showCheckbox && track && (
        <ContentCheckbox
          size={"xs"}
          content={"tracks"}
          sku={track.sku as number}
          contentId={week.trackId}
          free={free}
          owned={owned}
          wish={wish}
        />
      )}
    </VStack>
  );
}

export default SeriesBadge;
