import {
  setSeasonHighlight,
  setSeasonShowCarsDropdown,
  setSeasonShowCheckboxes,
  setSeasonShowOwned,
  setSeasonShowParticipation,
  setSeasonShowRain,
  setSeasonShowReorder,
  setSeasonShowThisWeek,
  setSeasonShowTrackConfig,
  setSeasonShowWishlist,
  setSeasonUseLocalTimezone,
  useUi,
} from "@/store/ui";
import { For, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Switch } from "../ui/switch";
import { Tooltip } from "../ui/tooltip";

function SeasonSettingsPopover() {
  const {
    seasonShowReorder,
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonShowTrackConfig,
    seasonHighlight,
    seasonShowThisWeek,
    seasonShowWishlist,
    seasonShowOwned,
    seasonShowParticipation,
    seasonShowRain,
    seasonUseLocalTimezone,
  } = useUi();
  const { t } = useTranslation();

  const timezoneName =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";

  const settingsList = [
    {
      id: "checkboxes",
      text: t("settings.showContentCheckboxes"),
      tooltip: t("settings.showContentCheckboxesTooltip"),
      checked: seasonShowCheckboxes,
      setChecked: setSeasonShowCheckboxes,
    },
    {
      id: "cars",
      text: t("settings.showCarsDropdown"),
      tooltip: t("settings.showCarsDropdownTooltip"),
      checked: seasonShowCarsDropdown,
      setChecked: setSeasonShowCarsDropdown,
    },
    {
      id: "config",
      text: t("settings.showTrackConfig"),
      tooltip: t("settings.showTrackConfigTooltip"),
      checked: seasonShowTrackConfig,
      setChecked: setSeasonShowTrackConfig,
    },
    {
      id: "hover",
      text: t("settings.highlightHover"),
      tooltip: t("settings.highlightHoverTooltip"),
      checked: seasonHighlight,
      setChecked: setSeasonHighlight,
    },
    {
      id: "reorder",
      text: t("settings.reorderColumns"),
      tooltip: t("settings.reorderColumnsTooltip"),
      checked: seasonShowReorder,
      setChecked: setSeasonShowReorder,
    },
    {
      id: "thisWeek",
      text: t("settings.highlightCurrentWeek"),
      tooltip: t("settings.highlightCurrentWeekTooltip"),
      checked: seasonShowThisWeek,
      setChecked: setSeasonShowThisWeek,
    },
    {
      id: "wishlist",
      text: t("settings.showWishlist"),
      tooltip: t("settings.showWishlistTooltip"),
      checked: seasonShowWishlist,
      setChecked: setSeasonShowWishlist,
    },
    {
      id: "owned",
      text: t("settings.showOwned"),
      tooltip: t("settings.showOwnedTooltip"),
      checked: seasonShowOwned,
      setChecked: setSeasonShowOwned,
    },
    {
      id: "minParticipation",
      text: t("settings.showParticipation"),
      tooltip: t("settings.showParticipationTooltip"),
      checked: seasonShowParticipation,
      setChecked: setSeasonShowParticipation,
    },
    {
      id: "rain",
      text: t("settings.showRain"),
      tooltip: t("settings.showRainTooltip"),
      checked: seasonShowRain,
      setChecked: setSeasonShowRain,
    },
    {
      id: "localTimezone",
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

export default SeasonSettingsPopover;
