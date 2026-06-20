import { useIr } from "@/store/ir";
import { setSeasonAxisInverted, useUi } from "@/store/ui";
import { Box, Table } from "@chakra-ui/react";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Tooltip } from "../ui/tooltip";
import SeasonWeekDateLabel from "./season-week-date-label";
import SeasonWeekIncludedCheckbox from "./season-week-included-checkbox";

function SeasonTableInvertedHeader({
  weeksStartDates,
  todayStartDate,
  weekIndexMap,
}: {
  weeksStartDates: string[];
  todayStartDate: string;
  weekIndexMap: Record<string, number>;
}) {
  const { t } = useTranslation();
  const { weekOffDates } = useIr();
  const { seasonShowThisWeek, seasonShowWeekOff } = useUi();

  return (
    <Table.Header>
      <Table.Row bgColor={"bg.muted"} zIndex="sticky">
        <Table.ColumnHeader
          bgColor={"bg.muted"}
          position={"sticky"}
          left={"0"}
          zIndex="sticky"
          width="150px"
          minWidth="150px"
        >
          <Tooltip
            lazyMount
            unmountOnExit
            content={t("settings.invertAxis")}
            showArrow
            positioning={{ placement: "bottom" }}
            openDelay={200}
            closeDelay={100}
          >
            <Box
              as="button"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width="100%"
              height="100%"
              cursor={"pointer"}
              onClick={() => setSeasonAxisInverted(false)}
              color={"fg.muted"}
              _hover={{ color: "fg" }}
            >
              <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
            </Box>
          </Tooltip>
        </Table.ColumnHeader>

        {weeksStartDates.map((date) => {
          const thisWeek = seasonShowThisWeek && todayStartDate === date;
          const weekIndex = weekIndexMap[date];
          const isWeekOff = weekOffDates.includes(date);

          return (
            <Table.ColumnHeader
              key={date}
              minWidth="80px"
              bgColor={thisWeek ? "bg.inverted" : "bg.muted"}
              color={thisWeek ? "bg" : undefined}
              borderLeftWidth={thisWeek ? "2px" : undefined}
              borderRightWidth={thisWeek ? "2px" : undefined}
              borderLeftColor={thisWeek ? "bg.inverted" : undefined}
              borderRightColor={thisWeek ? "bg.inverted" : undefined}
              position={"relative"}
            >
              <SeasonWeekDateLabel
                date={date}
                dateFontSize="xs"
                isWeekOff={isWeekOff}
                weekIndex={weekIndex}
                tooltipPlacement="bottom"
              />
              {seasonShowWeekOff && (
                <SeasonWeekIncludedCheckbox
                  isWeekIncluded={!isWeekOff}
                  weekDate={date}
                  tooltipPlacement="bottom"
                />
              )}
            </Table.ColumnHeader>
          );
        })}
      </Table.Row>
    </Table.Header>
  );
}

export default SeasonTableInvertedHeader;
