import { ownNurbCombined, wishNurbCombined } from "@/ir-data/utils/tracks";
import { useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { For, Table } from "@chakra-ui/react";
import React from "react";
import TRACKS_JSON from "../../ir-data/tracks.json";
import SeasonTableRowCell from "./season-table-row-cell";
import SeasonTableRowDateCell from "./season-table-row-date-cell";
import { formatDate, getPreviousTuesday } from "./useSeason";

function SeasonTableRow({
  date,
  seriesDateMap,
  filteredFavorites,
  highlightTrack,
  setHighlightTrack,
}: {
  date: string;
  seriesDateMap: { [key: number]: any };
  filteredFavorites: number[];
  highlightTrack: number;
  setHighlightTrack: (n: number) => void;
}) {
  const { myTracks, wishTracks } = useIr();
  const { seasonShowThisWeek } = useUi();

  const thisWeek =
    seasonShowThisWeek && getPreviousTuesday(formatDate(new Date())) === date;

  return (
    <Table.Row
      bgColor={"bg.muted"}
      key={date}
      height="60px"
      borderYWidth={thisWeek ? "2px" : undefined}
      borderColor={thisWeek ? "bg.inverted" : undefined}
    >
      <SeasonTableRowDateCell date={date} thisWeek={thisWeek} />
      <For
        each={filteredFavorites}
        children={(seriesId) => {
          const trackId =
            seriesDateMap?.[seriesId as keyof typeof seriesDateMap]?.[date];
          const track = TRACKS_JSON[trackId as keyof typeof TRACKS_JSON];
          const wish =
            track &&
            (wishTracks.includes(track.sku) ||
              wishNurbCombined(track.id, wishTracks, myTracks));
          const owned =
            track &&
            (myTracks.includes(track.sku) ||
              ownNurbCombined(track.id, myTracks));
          return track ? (
            <SeasonTableRowCell
              key={seriesId}
              seriesId={seriesId}
              trackId={trackId}
              wish={wish}
              owned={owned}
              free={track.free}
              id={track.id}
              name={track.name}
              config={track.config}
              sku={track.sku}
              date={date}
              seriesDateMap={seriesDateMap}
              highlight={highlightTrack === track?.sku}
              setHighlightTrack={setHighlightTrack}
            />
          ) : (
            <Table.Cell key={seriesId} width="(100/x)%" />
          );
        }}
      />
    </Table.Row>
  );
}

export default React.memo(SeasonTableRow);
