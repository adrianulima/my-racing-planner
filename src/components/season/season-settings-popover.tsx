import {
  setSeasonHighlight,
  setSeasonShowCarsDropdown,
  setSeasonShowCheckboxes,
  setSeasonShowOwned,
  setSeasonShowParticipation,
  setSeasonShowReorder,
  setSeasonShowThisWeek,
  setSeasonShowTrackConfig,
  setSeasonShowWishlist,
  useUi,
} from "@/store/ui";
import { For, VStack } from "@chakra-ui/react";
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
  } = useUi();

  const settingsList = [
    {
      id: "checkboxes",
      text: "Show content checkboxes",
      tooltip: "Show track checkboxes to quickly switch tracks you own",
      checked: seasonShowCheckboxes,
      setChecked: setSeasonShowCheckboxes,
    },
    {
      id: "cars",
      text: "Show cars dropdown",
      tooltip: "Show cars dropdown to quickly switch cars you own",
      checked: seasonShowCarsDropdown,
      setChecked: setSeasonShowCarsDropdown,
    },
    {
      id: "config",
      text: "Show track config",
      tooltip: "Show track configuration used that week",
      checked: seasonShowTrackConfig,
      setChecked: setSeasonShowTrackConfig,
    },
    {
      id: "hover",
      text: "Highlight on track hover",
      tooltip: "Highlight all cells with the same hovered track",
      checked: seasonHighlight,
      setChecked: setSeasonHighlight,
    },
    {
      id: "reorder",
      text: "Reorder columns",
      tooltip: "Enable series columns reordering",
      checked: seasonShowReorder,
      setChecked: setSeasonShowReorder,
    },
    {
      id: "thisWeek",
      text: "Highlight current week",
      tooltip: "Highlight current week row",
      checked: seasonShowThisWeek,
      setChecked: setSeasonShowThisWeek,
    },
    {
      id: "wishlist",
      text: "Show wishlist",
      tooltip: "Either wishlist items should be colored",
      checked: seasonShowWishlist,
      setChecked: setSeasonShowWishlist,
    },
    {
      id: "owned",
      text: "Show owned",
      tooltip: "Either owned items should be colored",
      checked: seasonShowOwned,
      setChecked: setSeasonShowOwned,
    },
    {
      id: "minParticipation",
      text: "Show participation credit program",
      tooltip:
        "Either series you have enough tracks to get reward should be colored",
      checked: seasonShowParticipation,
      setChecked: setSeasonShowParticipation,
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
