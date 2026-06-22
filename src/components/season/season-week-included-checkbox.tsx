import { setWeekOffDate } from "@/store/ir";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";

function SeasonWeekIncludedCheckbox({
  isWeekIncluded,
  weekDate,
  tooltipPlacement,
}: {
  isWeekIncluded: boolean;
  weekDate: string;
  tooltipPlacement: "top" | "bottom";
}) {
  const { t } = useTranslation();

  return (
    <Box position="absolute" top={1} left={1} zIndex={1}>
      <Tooltip
        lazyMount
        unmountOnExit
        content={t("settings.markWeekOffTooltip")}
        showArrow
        contentProps={{
          maxW: "220px",
          whiteSpace: "normal",
        }}
        positioning={{ placement: tooltipPlacement }}
        openDelay={200}
        closeDelay={100}
      >
        <Box>
          <Checkbox
            size="xs"
            aria-label={t("settings.markWeekOff")}
            checked={isWeekIncluded}
            onCheckedChange={({ checked }) =>
              setWeekOffDate(weekDate, !checked)
            }
          />
        </Box>
      </Tooltip>
    </Box>
  );
}

export default SeasonWeekIncludedCheckbox;
