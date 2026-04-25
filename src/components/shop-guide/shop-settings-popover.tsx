import {
  setShopLoyaltyDiscount,
  setShopVolumeDiscount,
  useUi,
} from "@/store/ui";
import { HStack, IconButton, Link, VStack } from "@chakra-ui/react";
import {
  faArrowUpRightFromSquare,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Tooltip } from "../ui/tooltip";
import { useTranslation } from "react-i18next";

function ShopSettingsPopover() {
  const { shopLoyaltyDiscount, shopVolumeDiscount } = useUi();
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
          <HStack>
            <Tooltip
              lazyMount
              unmountOnExit
              content={t("settings.volumeDiscountTooltip")}
              showArrow
              positioning={{ placement: "top" }}
              openDelay={200}
              closeDelay={100}
              ids={{ trigger: "volumeDiscount" }}
            >
              <Switch
                ids={{ root: "volumeDiscount" }}
                checked={shopVolumeDiscount}
                onCheckedChange={({ checked }) =>
                  setShopVolumeDiscount(checked)
                }
              >
                {t("settings.volumeDiscount")}
              </Switch>
            </Tooltip>

            <Tooltip
              lazyMount
              unmountOnExit
              content={t("settings.volumeDiscountLink")}
              showArrow
              positioning={{ placement: "top" }}
              openDelay={200}
              closeDelay={100}
            >
              <Link
                href="https://www.iracing.com/volume-discounts/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </Tooltip>
          </HStack>
          <Tooltip
            lazyMount
            unmountOnExit
            content={t("settings.loyaltyDiscountTooltip")}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
            ids={{ trigger: "loyaltyDiscount" }}
          >
            <Switch
              ids={{ root: "loyaltyDiscount" }}
              checked={shopLoyaltyDiscount}
              onCheckedChange={({ checked }) => setShopLoyaltyDiscount(checked)}
            >
              {t("settings.loyaltyDiscount")}
            </Switch>
          </Tooltip>
        </VStack>
      </PopoverContent>
    </PopoverRoot>
  );
}

export default ShopSettingsPopover;
