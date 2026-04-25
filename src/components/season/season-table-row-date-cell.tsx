import { Table, Text, VStack } from "@chakra-ui/react";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { Tooltip } from "../ui/tooltip";

function SeasonTableRowDateCell({
  date,
  thisWeek,
  weekNumber,
}: {
  date: string;
  thisWeek: boolean;
  weekNumber: number;
}) {
  const locale = i18n.language;
  const { t } = useTranslation();
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
        <VStack alignItems="center" gap={0}>
          <Text textAlign={"center"}>
            {weekStart.toLocaleDateString("en-US", shortFormat)}
          </Text>
          <Text fontSize="xs" textAlign="center" opacity="0.8">
            ({t("common.week")} {weekNumber})
          </Text>
        </VStack>
      </Tooltip>
    </Table.Cell>
  );
}

export default SeasonTableRowDateCell;
