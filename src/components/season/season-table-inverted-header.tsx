import { setWeekOffWeek, useIr } from "@/store/ir";
import { setSeasonAxisInverted } from "@/store/ui";
import { Box, HStack, Table, Text, VStack } from "@chakra-ui/react";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import { formatDate, getPreviousTuesday, TSeriesDateMap, WEEK_OFF_OPACITY } from "./useSeason";

const todayStartDate = getPreviousTuesday(formatDate(new Date()));

function SeasonTableInvertedHeader({
  weeksStartDates,
  seriesDateMap: _seriesDateMap,
}: {
  weeksStartDates: string[];
  seriesDateMap: TSeriesDateMap;
}) {
  const { t } = useTranslation();
  const { weekOffWeeks } = useIr();
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

        {weeksStartDates.map((date, index) => {
          const thisWeek = todayStartDate === date;
          const isWeekOff = weekOffWeeks.includes(index);
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
                <VStack alignItems="center" gap={0} opacity={isWeekOff ? WEEK_OFF_OPACITY : 1}>
                  <Text textAlign={"center"} fontSize="xs">
                    {weekStart.toLocaleDateString("en-US", shortFormat)}
                  </Text>
                  <Text fontSize="xs" textAlign="center" opacity="0.8">
                    ({t("common.week")} {index + 1})
                  </Text>
                </VStack>
              </Tooltip>
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
                      onCheckedChange={({ checked }) => setWeekOffWeek(index, !checked)}
                    />
                  </Box>
                </Tooltip>
              </HStack>
            </Table.ColumnHeader>
          );
        })}
      </Table.Row>
    </Table.Header>
  );
}

export default SeasonTableInvertedHeader;
