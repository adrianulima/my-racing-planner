import useScreenSize from "@/hooks/useScreenSize";
import {
  setFavoriteSeriesItem,
  setFavoriteSeriesList,
  useIr,
} from "@/store/ir";
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
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { useAppLayout } from "../app/useAppLayout";
import SeasonTableHeader from "./season-table-header";
import SeasonTableRow from "./season-table-row";
import useSeason from "./useSeason";

function SeasonTable({ filteredFavorites }: { filteredFavorites: number[] }) {
  const { weeksStartDates, seriesDateMap } = useSeason();
  const { favoriteSeries } = useIr();
  const { seasonShowReorder } = useUi();
  const [highlightTrack, setHighlightTrack] = useState<number>(-1);
  const { onScroll } = useAppLayout();
  const { width } = useScreenSize();

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active?.id !== over?.id) {
      setFavoriteSeriesItem;
      const oldIndex = favoriteSeries.indexOf(active.id as number);
      const newIndex = favoriteSeries.indexOf(over.id as number);
      setFavoriteSeriesList(arrayMove(favoriteSeries, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      <SortableContext
        items={filteredFavorites}
        strategy={horizontalListSortingStrategy}
        disabled={!seasonShowReorder || !width.md}
      >
        <Table.ScrollArea borderRadius={"md"} onScroll={onScroll}>
          <Table.Root size="sm" showColumnBorder stickyHeader>
            <SeasonTableHeader filteredFavorites={filteredFavorites} 
                    seriesDateMap={seriesDateMap}/>
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
                  />
                )}
              />
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </SortableContext>
    </DndContext>
  );
}

export default SeasonTable;
