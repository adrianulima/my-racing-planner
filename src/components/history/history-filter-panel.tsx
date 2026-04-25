import useScreenSize from "@/hooks/useScreenSize";
import { EHistorySince } from "@/ir-data/utils/history";
import { CategoryIcon } from "@/ir-data/utils/icons";
import { HStack, IconButton, Tabs, Text, VStack } from "@chakra-ui/react";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { getCategoryTranslationKey } from "@/i18n/category";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import { Radio, RadioGroup } from "../ui/radio";

function HistoryFilterPanel<T extends string>({
  tabs,
  tab,
  since,
  onTabChange,
  onSinceChange,
}: {
  tabs: { [key: string]: string };
  tab: T;
  since: EHistorySince;
  onTabChange: (value: T) => void;
  onSinceChange: (value: EHistorySince) => void;
}) {
  const { width } = useScreenSize();
  const { t } = useTranslation();
  const labels = {
    [EHistorySince.Ever]: t("filters.historySince.all"),
    [EHistorySince.ThisYear]: t("filters.historySince.this_year"),
    [EHistorySince.LastYear]: t("filters.historySince.last_year"),
    [EHistorySince.ThreeYears]: t("filters.historySince.three_years"),
    [EHistorySince.FiveYears]: t("filters.historySince.five_years"),
    [EHistorySince.TenYears]: t("filters.historySince.ten_years"),
  };
  return (
    <HStack justifyContent={{ md: "space-between", base: "center" }} mb={2}>
      <PopoverRoot
        positioning={{ placement: width.md ? "right-start" : "bottom-start" }}
      >
        <PopoverTrigger asChild>
          <IconButton
            aria-label={t("common.settings")}
            variant={"outline"}
            size={"lg"}
            bgColor={{ base: "bg.muted", _hover: "bg" }}
            borderRadius={"md"}
            px={2}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <Text hideBelow={"md"}>{labels[since]}</Text>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <RadioGroup
            value={since}
            onValueChange={(e) => onSinceChange(e.value as EHistorySince)}
          >
            <VStack alignItems={"start"} p={2}>
              <Radio value={EHistorySince.Ever}>
                {labels[EHistorySince.Ever]}
              </Radio>
              <Radio value={EHistorySince.ThisYear}>
                {labels[EHistorySince.ThisYear]}
              </Radio>
              <Radio value={EHistorySince.LastYear}>
                {labels[EHistorySince.LastYear]}
              </Radio>
              <Radio value={EHistorySince.ThreeYears}>
                {labels[EHistorySince.ThreeYears]}
              </Radio>
              <Radio value={EHistorySince.FiveYears}>
                {labels[EHistorySince.FiveYears]}
              </Radio>
              <Radio value={EHistorySince.TenYears}>
                {labels[EHistorySince.TenYears]}
              </Radio>
            </VStack>
          </RadioGroup>
        </PopoverContent>
      </PopoverRoot>

      <Tabs.Root
        size={"sm"}
        value={tab}
        onValueChange={(e) => onTabChange(e.value as T)}
        variant={"enclosed"}
        width={{ md: "unset", base: "100%" }}
        flex={{ md: "unset", base: 1 }}
      >
        <Tabs.List
          flex={{ md: "unset", base: 1 }}
          width={{ md: "unset", base: "100%" }}
          minW={0}
        >
          {Object.entries(tabs).map(([k, tab]: [string, string]) => (
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
                hideBelow={tab === tabs.all ? undefined : "md"}
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

export default HistoryFilterPanel;
