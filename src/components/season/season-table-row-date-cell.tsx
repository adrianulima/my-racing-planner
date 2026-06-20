import { setWeekOffWeek } from "@/store/ir";
import { useUi } from "@/store/ui";
import { Box, HStack, Table, Text, VStack } from "@chakra-ui/react";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import { WEEK_OFF_OPACITY } from "./useSeason";

function SeasonTableRowDateCell({
  date,
  thisWeek,
  weekNumber,
  isWeekOff,
}: {
  date: string;
  thisWeek: boolean;
  weekNumber: number;
  isWeekOff: boolean;
}) {
  const locale = i18n.language;
  const { t } = useTranslation();
  const { seasonShowWeekOff } = useUi();
  const longFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const shortFormat: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const weekStart = new Date(date);
  const weekEndDay = new Date(
    new Date(weekStart).setUTCDate(weekStart.getDate() + 7),
  );

  return (
    <Table.Cell
      width="60px"
      bgColor={thisWeek ? "bg.inverted" : "bg.muted"}
      color={thisWeek ? "bg" : undefined}
      position={"sticky"}
      left={"0"}
      zIndex="docked"
    >
      <Tooltip
        lazyMount
        unmountOnExit
        content={`${weekStart.toLocaleDateString(
          locale,
          longFormat,
        )} - ${weekEndDay.toLocaleDateString(locale, longFormat)}`}
        showArrow
        positioning={{ placement: "top" }}
        openDelay={200}
        closeDelay={100}
      >
        <VStack alignItems="center" gap={0} opacity={isWeekOff && seasonShowWeekOff ? WEEK_OFF_OPACITY : 1}>
          <Text textAlign={"center"}>
            {weekStart.toLocaleDateString("en-US", shortFormat)}
          </Text>
          <Text fontSize="xs" textAlign="center" opacity="0.8">
            ({t("common.week")} {weekNumber})
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
            positioning={{ placement: "top" }}
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
    </Table.Cell>
  );
}

export default SeasonTableRowDateCell;
