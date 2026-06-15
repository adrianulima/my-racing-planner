import useScreenSize from "@/hooks/useScreenSize";
import { setFavoriteSeriesList, useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { For, Table } from "@chakra-ui/react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { useAppLayout } from "../app/useAppLayout";
import SeasonTableHeader from "./season-table-header";
import SeasonTableRow from "./season-table-row";
import SeasonTableInvertedHeader from "./season-table-inverted-header";
import SeasonTableInvertedRow from "./season-table-inverted-row";
import useSeason, { formatDate, getPreviousTuesday } from "./useSeason";

const todayStartDate = getPreviousTuesday(formatDate(new Date()));

function SeasonTable({ filteredFavorites }: { filteredFavorites: number[] }) {
  const { weeksStartDates: allWeeks, seriesDateMap } = useSeason();
  const { favoriteSeries } = useIr();
  const { seasonShowReorder, seasonAxisInverted, seasonHidePastWeeks } = useUi();
  const weeksStartDates = seasonHidePastWeeks ? allWeeks.filter((date) => date >= todayStartDate) : allWeeks;

  const weekIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
		allWeeks.forEach((date, index) => {
			map[date] = index + 1;
    });
    return map;
  }, [allWeeks]);
  
  const [highlightTrack, setHighlightTrack] = useState<number>(-1);
  const { onScroll } = useAppLayout();
  const { width } = useScreenSize();

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active?.id !== over?.id) {
      const oldIndex = favoriteSeries.indexOf(active.id as number);
      const newIndex = favoriteSeries.indexOf(over.id as number);
      setFavoriteSeriesList(arrayMove(favoriteSeries, oldIndex, newIndex));
    }
  }

  const onClickSwap = (index: number) => {
    setFavoriteSeriesList(arrayMove(favoriteSeries, index, index - 1));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[
        seasonAxisInverted ? restrictToVerticalAxis : restrictToHorizontalAxis,
      ]}
    >
      <SortableContext
        items={filteredFavorites}
        strategy={
          seasonAxisInverted
            ? verticalListSortingStrategy
            : horizontalListSortingStrategy
        }
        disabled={!seasonShowReorder || !width.md}
      >
        <Table.ScrollArea borderRadius={"md"} onScroll={onScroll}>
          <Table.Root size="sm" showColumnBorder stickyHeader>
            {seasonAxisInverted ? (
              <>
                <SeasonTableInvertedHeader
                  weeksStartDates={weeksStartDates}
                  seriesDateMap={seriesDateMap}
                  weekIndexMap={weekIndexMap}
                />
                <Table.Body>
                  <For
                    each={filteredFavorites}
                    children={(seriesId, index) => (
                      <SeasonTableInvertedRow
                        key={seriesId}
                        seriesId={seriesId}
                        seriesIndex={index}
                        weeksStartDates={weeksStartDates}
                        seriesDateMap={seriesDateMap}
                        highlightTrack={highlightTrack}
                        setHighlightTrack={setHighlightTrack}
                        onClickSwap={
                          index !== 0 ? () => onClickSwap(index) : undefined
                        }
                      />
                    )}
                  />
                </Table.Body>
              </>
            ) : (
              <>
                <SeasonTableHeader
                  filteredFavorites={filteredFavorites}
                  seriesDateMap={seriesDateMap}
                />
                <Table.Body>
                  <For
                    each={weeksStartDates}
                    children={(date) => (
                      <SeasonTableRow
                        seriesDateMap={seriesDateMap}
                        key={date}
                        date={date}
                        filteredFavorites={filteredFavorites}
                        highlightTrack={highlightTrack}
                        setHighlightTrack={setHighlightTrack}
                        weekNumber={weekIndexMap[date]}
                      />
                    )}
                  />
                </Table.Body>
              </>
            )}
          </Table.Root>
        </Table.ScrollArea>
      </SortableContext>
    </DndContext>
  );
}

export default SeasonTable;
