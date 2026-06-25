import {
  PopoverArrow,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoryIcon } from "@/ir-data/utils/icons";
import { Category } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import { setFavoriteSeriesItem } from "@/store/ir";
import { trackEvent } from "@/utils/analytics";
import {
  Badge,
  Box,
  Center,
  HStack,
  Image,
  Table,
  Text,
} from "@chakra-ui/react";
import {
  faCar,
  faCaretDown,
  faLock,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DurationBadge from "../badges/duration-badge";
import LicenseBadge from "../badges/license-badge";
import ContentNameBadge from "../content/content-name-badge";
import ContentPopover from "../content/content-popover";
import { Tooltip } from "../ui/tooltip";
import StarCheckbox from "./star-checkbox";
import getScheduleDescription from "./getScheduleDescription";
import { useUi } from "@/store/ui";
import { useTranslation } from "react-i18next";
import { getCategoryTranslationKey } from "@/i18n/category";
import CARS_JSON from "@/ir-data/cars.json";
import TRACKS_JSON from "@/ir-data/tracks.json";
import { useIr } from "@/store/ir";
import { ownNurbCombined, wishNurbCombined } from "@/ir-data/utils/tracks";
import { useMemo } from "react";

const WISH_HIGHLIGHT_COLOR = { base: "blue.500", _dark: "blue.300" };

function SeriesTableRow({
  id,
  logo,
  name,
  cars,
  weeks,
  favorite,
  fixed,
  category,
  license,
  color,
  duration,
  laps,
  official,
}: {
  id: number;
  logo?: string;
  name: string;
  cars: number[];
  weeks: { track: { id: number } }[];
  favorite: boolean;
  fixed: boolean;
  category: string;
  license: string;
  color: string;
  duration: number | null;
  laps: number | null;
  official: boolean;
}) {
  const tracks = useMemo(
    () => [...new Set(weeks.map((w) => w.track.id))],
    [weeks],
  );
  const { myCars, myTracks, wishCars, wishTracks } = useIr();

  const { ownedCars, ownedWishCars, hasWishCars } = useMemo(() => {
    const myCarsSet = new Set(myCars);
    const wishCarsSet = new Set(wishCars);

    let ownedCars = 0;
    let ownedWishCars = 0;

    for (const carId of cars) {
      const car = CARS_JSON[carId as unknown as keyof typeof CARS_JSON];
      if (!car) continue;

      const isOwned = car.free || myCarsSet.has(car.sku);
      if (isOwned) ownedCars++;
      if (isOwned || wishCarsSet.has(car.sku)) ownedWishCars++;
    }

    return {
      ownedCars,
      ownedWishCars,
      hasWishCars: ownedWishCars > ownedCars,
    };
  }, [cars, myCars, wishCars]);

  const { ownedWishTracks, hasWishTracks } = useMemo(() => {
    const myTracksSet = new Set(myTracks);
    const wishTracksSet = new Set(wishTracks);

    let ownedWishTracks = 0;
    let hasWishTracks = false;

    for (const trackId of tracks) {
      const track = TRACKS_JSON[trackId as unknown as keyof typeof TRACKS_JSON];
      if (!track) continue;

      const isOwned =
        track.free ||
        myTracksSet.has(track.sku) ||
        ownNurbCombined(trackId, myTracks);

      if (
        isOwned ||
        wishTracksSet.has(track.sku) ||
        wishNurbCombined(trackId, wishTracks, myTracks)
      ) {
        ownedWishTracks++;
      }

      if (
        wishTracksSet.has(track.sku) ||
        wishNurbCombined(trackId, wishTracks, myTracks)
      ) {
        hasWishTracks = true;
      }
    }

    return { ownedWishTracks, hasWishTracks };
  }, [tracks, myTracks, wishTracks]);

  const { seasonUseLocalTimezone } = useUi();
  const { t } = useTranslation();
  const scheduleDescription = useMemo(
    () => getScheduleDescription(id, seasonUseLocalTimezone),
    [id, seasonUseLocalTimezone],
  );
  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell minWidth={"40px"} textAlign={"center"}>
        <StarCheckbox
          onClick={(e) => e.stopPropagation()}
          checked={favorite}
          onCheckedChange={(e) => {
            setFavoriteSeriesItem(id, !!e.checked);
            trackEvent("favorite_series_change", {
              action: e.checked ? "add" : "remove",
              category,
              license,
            });
          }}
        />
      </Table.Cell>
      <Table.Cell minWidth={"60px"} textAlign={"center"}>
        {logo && (
          <Center>
            <Tooltip
              lazyMount
              unmountOnExit
              key={logo}
              content={
                <Image
                  loading="lazy"
                  userSelect={"none"}
                  draggable={false}
                  h={"80px"}
                  w={"160px"}
                  fit="contain"
                  src={`${IR_URL.image}/img/logos/series/${logo}`}
                />
              }
              showArrow
              positioning={{ placement: "top" }}
              openDelay={200}
              closeDelay={100}
            >
              <Image
                loading="lazy"
                userSelect={"none"}
                draggable={false}
                h="24px"
                fit="contain"
                src={`${IR_URL.image}/img/logos/series/${logo}`}
              />
            </Tooltip>
          </Center>
        )}
      </Table.Cell>
      <Table.Cell width={"100%"}>
        <ContentNameBadge name={name}>
          {!official && (
            <Badge colorPalette="yellow" mr={1}>
              {t("common.unranked")}
            </Badge>
          )}
        </ContentNameBadge>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        {fixed && (
          <Tooltip
            lazyMount
            unmountOnExit
            content={t("common.fixedSetup")}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
          >
            <Badge variant={"solid"} _light={{ bg: "gray.600" }}>
              <FontAwesomeIcon icon={faLock} size="sm" />
              {t("common.fixed")}
            </Badge>
          </Tooltip>
        )}
      </Table.Cell>
      <Table.Cell minWidth={"110px"} textAlign={"center"}>
        <PopoverRoot lazyMount unmountOnExit>
          <PopoverTrigger asChild>
            <HStack gap={1} justifyContent={"center"} cursor={"pointer"}>
              <FontAwesomeIcon icon={faCar} />
              <Text whiteSpace={"nowrap"}>
                <Box
                  as="span"
                  color={
                    ownedWishCars >= cars.length
                      ? undefined
                      : hasWishCars && ownedCars === 0
                        ? WISH_HIGHLIGHT_COLOR
                        : undefined
                  }
                >
                  {ownedWishCars}
                </Box>
                <Box as="span">/{cars.length}</Box>
              </Text>
              <FontAwesomeIcon icon={faCaretDown} />
            </HStack>
          </PopoverTrigger>
          <PopoverContent p={2}>
            <PopoverArrow />
            <ContentPopover content="cars" list={cars} />
          </PopoverContent>
        </PopoverRoot>
      </Table.Cell>
      <Table.Cell minWidth={"110px"} textAlign={"center"}>
        <PopoverRoot lazyMount unmountOnExit>
          <PopoverTrigger asChild>
            <HStack gap={1} justifyContent={"center"} cursor={"pointer"}>
              <FontAwesomeIcon icon={faRoad} />
              <Text whiteSpace={"nowrap"}>
                <Box
                  as="span"
                  color={hasWishTracks ? WISH_HIGHLIGHT_COLOR : undefined}
                >
                  {ownedWishTracks}
                </Box>
                <Box as="span">/{tracks.length}</Box>
              </Text>
              <FontAwesomeIcon icon={faCaretDown} />
            </HStack>
          </PopoverTrigger>
          <PopoverContent p={2}>
            <PopoverArrow />
            <ContentPopover content="tracks" list={tracks} />
          </PopoverContent>
        </PopoverRoot>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <Tooltip
          lazyMount
          unmountOnExit
          content={t(
            getCategoryTranslationKey(
              Category[category as keyof typeof Category],
            ),
          )}
          showArrow
          positioning={{ placement: "top" }}
          openDelay={200}
          closeDelay={100}
        >
          <CategoryIcon fontSize="16px" category={category} />
        </Tooltip>
      </Table.Cell>
      <Table.Cell minWidth={"130px"} textAlign={"center"}>
        <Tooltip
          lazyMount
          unmountOnExit
          content={scheduleDescription}
          showArrow
          positioning={{ placement: "top" }}
          openDelay={200}
          closeDelay={100}
        >
          <Box>
            <DurationBadge duration={duration} laps={laps} />
          </Box>
        </Tooltip>
      </Table.Cell>
      <Table.Cell minWidth={"40px"} textAlign={"center"}>
        <LicenseBadge letter={license} color={color}>
          {license}
        </LicenseBadge>
      </Table.Cell>
    </Table.Row>
  );
}

export default SeriesTableRow;
