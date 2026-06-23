import {
  setSeriesShowCarCounts,
  setSeriesShowTrackCounts,
  useUi,
} from "@/store/ui";
import { VStack } from "@chakra-ui/react";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { IconButton } from "@chakra-ui/react";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Tooltip } from "../ui/tooltip";

function SeriesSettingsPopover() {
  const { seriesShowCarCounts, seriesShowTrackCounts } = useUi();
  const { t } = useTranslation();
  return (
    <PopoverRoot positioning={{ placement: "left-start" }}>
      <PopoverTrigger asChild>
        <IconButton
          aria-label={t("common.settings")}
          variant={"outline"}
          size={"lg"}
          bgColor={{ base: "bg.muted", _hover: "bg" }}
          borderRadius={"md"}
        >
          <FontAwesomeIcon icon={faGears} />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <VStack alignItems={"start"} p={2}>
          <Tooltip
            lazyMount
            unmountOnExit
            content={t("settings.seriesShowCarCountsTooltip")}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
            ids={{ trigger: "seriesShowCarCounts" }}
          >
            <Switch
              ids={{ root: "seriesShowCarCounts" }}
              checked={seriesShowCarCounts}
              onCheckedChange={({ checked }) =>
                setSeriesShowCarCounts(checked)
              }
            >
              {t("settings.seriesShowCarCounts")}
            </Switch>
          </Tooltip>
          <Tooltip
            lazyMount
            unmountOnExit
            content={t("settings.seriesShowTrackCountsTooltip")}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
            ids={{ trigger: "seriesShowTrackCounts" }}
          >
            <Switch
              ids={{ root: "seriesShowTrackCounts" }}
              checked={seriesShowTrackCounts}
              onCheckedChange={({ checked }) =>
                setSeriesShowTrackCounts(checked)
              }
            >
              {t("settings.seriesShowTrackCounts")}
            </Switch>
          </Tooltip>
        </VStack>
      </PopoverContent>
    </PopoverRoot>
  );
}

export default SeriesSettingsPopover;
