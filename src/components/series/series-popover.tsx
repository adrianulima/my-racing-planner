import { setFavoriteSeriesItem, useIr } from "@/store/ir";
import { TContent } from "@/ir-data/utils/types";
import { For, Table, Text } from "@chakra-ui/react";
import CARS_JSON from "../../ir-data/cars.json";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import LicenseBadge from "../badges/license-badge";
import StarCheckbox from "./star-checkbox";

function SeriesPopover({
  content,
  id,
}: {
  content: "cars" | "tracks";
  id: number;
}) {
  const contentItem = (
    content === "cars"
      ? CARS_JSON[id.toString() as keyof typeof CARS_JSON]
      : TRACKS_JSON[id.toString() as keyof typeof TRACKS_JSON]
  ) as TContent | undefined;

  const { favoriteSeries } = useIr();

  const listSeries = contentItem
    ? (contentItem.skuSeries ? contentItem.skuSeries : contentItem.series) || []
    : [];

  return (
    <Table.ScrollArea width="100%" maxH={"320px"}>
      <Table.Root size="sm" striped>
        <Table.Body fontSize={"xs"}>
          <For
            each={listSeries}
            children={(item: number) => {
              const series =
                SERIES_JSON[item.toString() as keyof typeof SERIES_JSON];
              return (
                series && (
                  <Table.Row bgColor={"transparent"} key={item}>
                    <Table.Cell
                      w={"20px"}
                      textAlign={"center"}
                      p={0}
                      borderBottom={0}
                      px={"4px"}
                    >
                      <StarCheckbox
                        size={"xs"}
                        mt={"4px"}
                        checked={favoriteSeries.includes(item)}
                        onCheckedChange={({ checked }) =>
                          setFavoriteSeriesItem(series.id, !!checked)
                        }
                      />
                    </Table.Cell>
                    <Table.Cell
                      width={"100%"}
                      display={"flex"}
                      alignItems={"center"}
                      p={0}
                      borderBottom={0}
                      px={"4px"}
                      fontWeight={"bold"}
                      maxW={"264px"}
                    >
                      <Text truncate>{series.name}</Text>
                    </Table.Cell>
                    <Table.Cell
                      w={"20px"}
                      p={0}
                      borderBottom={0}
                      px={"4px"}
                      paddingInline={0}
                    >
                      <LicenseBadge
                        letter={series.license.letter}
                        color={series.license.color}
                        size={"xs"}
                      >
                        {series.license.letter}
                      </LicenseBadge>
                    </Table.Cell>
                  </Table.Row>
                )
              );
            }}
          />
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}

export default SeriesPopover;
