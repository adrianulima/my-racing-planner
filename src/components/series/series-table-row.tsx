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
import { Badge, Box, Center, HStack, Image, Table } from "@chakra-ui/react";
import {
  faCar,
  faCaretDown,
  faLock,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import DurationBadge from "../badges/duration-badge";
import LicenseBadge from "../badges/license-badge";
import ContentNameBadge from "../content/content-name-badge";
import ContentPopover from "../content/content-popover";
import { Tooltip } from "../ui/tooltip";
import StarCheckbox from "./star-checkbox";
import getScheduleDescription from "./getScheduleDescription";
import { useUi } from "@/store/ui";

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
  const tracks = useMemo(() => [...new Set(weeks.map((w) => w.track.id))], []);
  const { seasonUseLocalTimezone } = useUi();
  const scheduleDescription = getScheduleDescription(
    id,
    seasonUseLocalTimezone,
  );
  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell minWidth={"40px"} textAlign={"center"}>
        <StarCheckbox
          onClick={(e) => e.stopPropagation()}
          checked={favorite}
          onCheckedChange={(e) => setFavoriteSeriesItem(id, !!e.checked)}
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
              Unranked
            </Badge>
          )}
        </ContentNameBadge>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        {fixed && (
          <Tooltip
            lazyMount
            unmountOnExit
            content={"Fixed Setup"}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
          >
            <Badge variant={"solid"} _light={{ bg: "gray.600" }}>
              <FontAwesomeIcon icon={faLock} size="sm" />
              Fixed
            </Badge>
          </Tooltip>
        )}
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <PopoverRoot lazyMount unmountOnExit>
          <PopoverTrigger asChild>
            <HStack gap={1} justifyContent={"center"} cursor={"pointer"}>
              <FontAwesomeIcon icon={faCar} />
              {cars.length}
              <FontAwesomeIcon icon={faCaretDown} />
            </HStack>
          </PopoverTrigger>
          <PopoverContent p={2}>
            <PopoverArrow />
            <ContentPopover content="cars" list={cars} />
          </PopoverContent>
        </PopoverRoot>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <PopoverRoot lazyMount unmountOnExit>
          <PopoverTrigger asChild>
            <HStack gap={1} justifyContent={"center"} cursor={"pointer"}>
              <FontAwesomeIcon icon={faRoad} />
              {tracks.length}
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
          content={Category[category as keyof typeof Category]}
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

export default React.memo(SeriesTableRow);
