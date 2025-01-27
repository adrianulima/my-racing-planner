import { getPreviousTuesday } from "@/components/season/useSeason";
import { useIr } from "@/store/ir";
import { Flex, For, Table, VisuallyHidden } from "@chakra-ui/react";
import { useMemo } from "react";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import TRACKS_LIST from "../../ir-data/utils/tracks";
import TracksUsedEmpty from "./tracks-used-empty";
import TracksUsedRow from "./tracks-used-row";

function TracksUsedTable() {
  const { wishTracks, favoriteSeries } = useIr();

  const tracksMap = useMemo(
    () =>
      favoriteSeries.reduce((acc, curr) => {
        const series = SERIES_JSON[curr.toString() as keyof typeof SERIES_JSON];
        series.weeks.forEach((week) => {
          const track =
            TRACKS_JSON[week.track.id.toString() as keyof typeof TRACKS_JSON];
          if (track.free) {
            return acc;
          }
          const skuId = ("group" in track ? track.group : track.id) as number;
          acc[skuId] = acc[skuId] ?? {
            id: skuId,
            name: track.name,
            sku: track.sku,
            weeks: {},
            used: 0,
          };
          const weekDate = getPreviousTuesday(week.date);
          acc[skuId].weeks[series.id] = acc[skuId].weeks[series.id] ?? [];
          acc[skuId].weeks[series.id].push(weekDate);
          acc[skuId].used++;
        }, null);
        return acc;
      }, {} as { id: number; name: string; sku: number; weeks: { [key: number]: string[] }; used: number }[]),
    [favoriteSeries],
  );

  const tracksList = useMemo(
    () =>
      Object.values(tracksMap)
        .sort(
          (a, b) =>
            b.used +
            Object.keys(b.weeks).length -
            (a.used + Object.keys(a.weeks).length),
        )
        .concat(
          wishTracks
            .map((sku) => {
              const track = TRACKS_LIST.find((t) => t.sku === sku);
              return !!track && !(track.id in tracksMap)
                ? {
                    id: track.id,
                    name: track.name,
                    sku: track.sku,
                    weeks: {},
                    used: 0,
                  }
                : null;
            })
            .filter((t) => !!t),
        ),
    [tracksMap],
  );

  return (
    <Flex
      flex={1}
      borderRadius={"md"}
      overflowY={"auto"}
      maxH={"100%"}
      w={"100%"}
      h={"100%"}
      alignItems={"start"}
    >
      <Table.ScrollArea borderRadius={"md"} width={"100%"}>
        <Table.Root striped>
          <Table.Header>
            <Table.Row bgColor={"bg.muted"}>
              <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
                <VisuallyHidden>Owned content</VisuallyHidden>
              </Table.ColumnHeader>
              <Table.ColumnHeader width="100%">Name</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>Used</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              fallback={<TracksUsedEmpty />}
              each={tracksList}
              children={(item) => <TracksUsedRow item={item} key={item.id} />}
            />
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Flex>
  );
}

export default TracksUsedTable;
