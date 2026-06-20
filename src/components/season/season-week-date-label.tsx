import { useUi } from "@/store/ui";
import { Text, VStack } from "@chakra-ui/react";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Tooltip } from "../ui/tooltip";
import { getWeekOffOpacity } from "./season-table-constants";

function SeasonWeekDateLabel({
  date,
  isWeekOff,
  weekIndex,
  tooltipPlacement,
  dateFontSize,
}: {
  date: string;
  isWeekOff: boolean;
  weekIndex: number;
  tooltipPlacement: "top" | "bottom";
  dateFontSize?: string;
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
    <Tooltip
      lazyMount
      unmountOnExit
      content={`${weekStart.toLocaleDateString(
        locale,
        longFormat,
      )} - ${weekEndDay.toLocaleDateString(locale, longFormat)}`}
      showArrow
      positioning={{ placement: tooltipPlacement }}
      openDelay={200}
      closeDelay={100}
    >
      <VStack
        alignItems="center"
        gap={0}
        opacity={getWeekOffOpacity(isWeekOff, seasonShowWeekOff, 1)}
      >
        <Text textAlign={"center"} fontSize={dateFontSize}>
          {weekStart.toLocaleDateString("en-US", shortFormat)}
        </Text>
        <Text fontSize="xs" textAlign="center" opacity="0.8">
          ({t("common.week")} {weekIndex + 1})
        </Text>
      </VStack>
    </Tooltip>
  );
}

export default SeasonWeekDateLabel;
