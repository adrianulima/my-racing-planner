import { CategoryIcon } from "@/ir-data/utils/icons";
import { ECarCategories } from "@/ir-data/utils/types";
import { setSeasonCategory, useUi } from "@/store/ui";
import { trackEvent } from "@/utils/analytics";
import { HStack, IconButton, Tabs, Text } from "@chakra-ui/react";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { getCategoryTranslationKey } from "@/i18n/category";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import SeasonSettingsPopover from "./season-settings-popover";

function SeasonFilterPanel() {
  const { seasonCategory } = useUi();
  const { t } = useTranslation();

  return (
    <HStack justifyContent={{ md: "space-between", base: "center" }} mb={2}>
      <PopoverRoot positioning={{ placement: "right-start" }}>
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
          <SeasonSettingsPopover />
        </PopoverContent>
      </PopoverRoot>

      <Tabs.Root
        size={"sm"}
        value={seasonCategory}
        onValueChange={(e) => {
          setSeasonCategory(e.value as ECarCategories);
          trackEvent("season_category_change", { category: e.value });
        }}
        variant={"enclosed"}
        width={{ md: "unset", base: "100%" }}
        flex={{ md: "unset", base: 1 }}
      >
        <Tabs.List
          flex={{ md: "unset", base: 1 }}
          width={{ md: "unset", base: "100%" }}
          minW={0}
        >
          {Object.entries(ECarCategories).map(([k, tab]: [string, string]) => (
            <Tabs.Trigger
              value={tab}
              key={tab}
              width={{ md: "auto", base: "100%" }}
              minW={0}
              maxW={{ md: "150px", base: undefined }}
              flexShrink={1}
            >
              <CategoryIcon category={k} />
              <Text
                hideBelow={tab === ECarCategories.all ? undefined : "md"}
                textWrap={"nowrap"}
                userSelect={"none"}
                minW={0}
                truncate
              >
                {t(getCategoryTranslationKey(tab))}
              </Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </HStack>
  );
}

export default SeasonFilterPanel;
