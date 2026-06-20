import { setWeekOffWeek, useIr } from "@/store/ir";
import { setSeasonAxisInverted, useUi } from "@/store/ui";
import { Box, HStack, Table, Text, VStack } from "@chakra-ui/react";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import { TSeriesDateMap, WEEK_OFF_OPACITY } from "./useSeason";

function SeasonTableInvertedHeader({
  weeksStartDates,
  seriesDateMap: _seriesDateMap,
  todayStartDate,
  weekIndexMap,
}: {
  weeksStartDates: string[];
  seriesDateMap: TSeriesDateMap;
  todayStartDate: string;
  weekIndexMap: Record<string, number>;
}) {
  const { t } = useTranslation();
  const { weekOffWeeks } = useIr();
  const { seasonShowWeekOff } = useUi();
  const locale = i18n.language;
  const shortFormat: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const longFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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
          const thisWeek = todayStartDate === date;
          const weekNumber = weekIndexMap[date];
          const isWeekOff = weekOffWeeks.includes(weekNumber);
          const weekStart = new Date(date);
          const weekEndDay = new Date(
            new Date(weekStart).setUTCDate(weekStart.getUTCDate() + 7),
          );

          return (
            <Table.ColumnHeader
              key={date}
              minWidth="80px"
              bgColor={thisWeek ? "bg.inverted" : "bg.muted"}
              color={thisWeek ? "bg" : undefined}
            >
              <Tooltip
                lazyMount
                unmountOnExit
                content={`${weekStart.toLocaleDateString(locale, longFormat)} - ${weekEndDay.toLocaleDateString(locale, longFormat)}`}
                showArrow
                positioning={{ placement: "bottom" }}
                openDelay={200}
                closeDelay={100}
              >
                <VStack alignItems="center" gap={0} opacity={isWeekOff && seasonShowWeekOff ? WEEK_OFF_OPACITY : 1}>
                  <Text textAlign={"center"} fontSize="xs">
                    {weekStart.toLocaleDateString("en-US", shortFormat)}
                  </Text>
                  <Text fontSize="xs" textAlign="center" opacity="0.8">
                    ({t("common.week")} {weekIndexMap[date]})
                  </Text>
                </VStack>
              </Tooltip>
              {seasonShowWeekOff && (
                <HStack justifyContent={"center"} mt={1}>
                  <Tooltip
                    lazyMount
                    unmountOnExit
                    content={t("settings.markWeekOffTooltip")}
                    showArrow
                    positioning={{ placement: "bottom" }}
                    openDelay={200}
                    closeDelay={100}
                  >
                    <Box>
                      <Checkbox
                        size="xs"
                        aria-label={t("settings.markWeekOff")}
                        checked={!isWeekOff}
                        onCheckedChange={({ checked }) =>
                          setWeekOffWeek(weekNumber, !checked)
                        }
                      />
                    </Box>
                  </Tooltip>
                </HStack>
              )}
            </Table.ColumnHeader>
          );
        })}
      </Table.Row>
    </Table.Header>
  );
}

export default SeasonTableInvertedHeader;
