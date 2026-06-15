import { setSeasonAxisInverted } from "@/store/ui";
import { Box, Table, Text, VStack } from "@chakra-ui/react";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Tooltip } from "../ui/tooltip";
import { formatDate, getPreviousTuesday, TSeriesDateMap } from "./useSeason";

const todayStartDate = getPreviousTuesday(formatDate(new Date()));

function SeasonTableInvertedHeader({
  weeksStartDates,
  seriesDateMap: _seriesDateMap,
  weekIndexMap,
}: {
  weeksStartDates: string[];
  seriesDateMap: TSeriesDateMap;
  weekIndexMap: Record<string, number>;
}) {
  const { t } = useTranslation();
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
                <VStack alignItems="center" gap={0}>
                  <Text textAlign={"center"} fontSize="xs">
                    {weekStart.toLocaleDateString("en-US", shortFormat)}
                  </Text>
                  <Text fontSize="xs" textAlign="center" opacity="0.8">
                    ({t("common.week")} {weekIndexMap[date]})
                  </Text>
                </VStack>
              </Tooltip>
            </Table.ColumnHeader>
          );
        })}
      </Table.Row>
    </Table.Header>
  );
}

export default SeasonTableInvertedHeader;
