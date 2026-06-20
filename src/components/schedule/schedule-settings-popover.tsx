import {
  setSeasonShowThisWeek,
  setSeasonUseLocalTimezone,
  useUi,
} from "@/store/ui";
import { For, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Switch } from "../ui/switch";
import { Tooltip } from "../ui/tooltip";

function ScheduleSettingsPopover() {
  const { seasonShowThisWeek, seasonUseLocalTimezone } = useUi();
  const { t } = useTranslation();

  const timezoneName =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";

  const settingsList = [
    {
      id: "scheduleThisWeek",
      text: t("settings.highlightCurrentWeek"),
      tooltip: t("settings.highlightCurrentWeekTooltip"),
      checked: seasonShowThisWeek,
      setChecked: setSeasonShowThisWeek,
    },
    {
      id: "scheduleLocalTimezone",
      text: t("settings.localTimezone", { timezone: timezoneName }),
      tooltip: t("settings.localTimezoneTooltip"),
      checked: seasonUseLocalTimezone,
      setChecked: setSeasonUseLocalTimezone,
    },
  ];

  return (
    <VStack alignItems={"start"} p={2}>
      <For
        each={settingsList}
        children={(settings) => (
          <Tooltip
            lazyMount
            unmountOnExit
            key={settings.id}
            content={settings.tooltip}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
            ids={{ trigger: settings.id }}
          >
            <Switch
              ids={{ root: settings.id }}
              checked={settings.checked}
              onCheckedChange={({ checked }) => settings.setChecked(checked)}
            >
              {settings.text}
            </Switch>
          </Tooltip>
        )}
      />
    </VStack>
  );
}

export default ScheduleSettingsPopover;
