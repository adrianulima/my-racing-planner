import { useUi } from "@/store/ui";
import { Table } from "@chakra-ui/react";
import SeasonWeekDateLabel from "./season-week-date-label";
import SeasonWeekIncludedCheckbox from "./season-week-included-checkbox";

function SeasonTableRowDateCell({
  date,
  thisWeek,
  weekIndex,
  isWeekOff,
}: {
  date: string;
  thisWeek: boolean;
  weekIndex: number;
  isWeekOff: boolean;
}) {
  const { seasonShowWeekOff } = useUi();

  return (
    <Table.Cell
      width="60px"
      bgColor={thisWeek ? "bg.inverted" : "bg.muted"}
      color={thisWeek ? "bg" : undefined}
      position={"sticky"}
      left={"0"}
      zIndex="docked"
    >
      <SeasonWeekDateLabel
        date={date}
        isWeekOff={isWeekOff}
        weekIndex={weekIndex}
        tooltipPlacement="top"
      />
      {seasonShowWeekOff && (
        <SeasonWeekIncludedCheckbox
          isWeekIncluded={!isWeekOff}
          weekDate={date}
          tooltipPlacement="top"
        />
      )}
    </Table.Cell>
  );
}

export default SeasonTableRowDateCell;
