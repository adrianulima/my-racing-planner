import { setCartExclude, useIr } from "@/store/ir";
import {
  Flex,
  For,
  FormatNumber,
  HStack,
  IconButton,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  faCar,
  faMagnifyingGlass,
  faMinus,
  faPlus,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import CARS_LIST from "../../../ir-data/utils/cars";
import TRACKS_LIST from "../../../ir-data/utils/tracks";
import { EmptyState } from "../../ui/empty-state";
import { Tooltip } from "../../ui/tooltip";
import ShopSettingsPopover from "../shop-settings-popover";
import CheckoutButton from "./checkout-button";
import PriceDiscountPanel from "./price-discount-panel";

function CartToggleButton({
  sku,
  isExcluded,
}: {
  sku: number;
  isExcluded: boolean;
}) {
  const { t } = useTranslation();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Tooltip
      key={isExcluded ? "excluded" : "included"}
      content={isExcluded ? t("shop.addToCart") : t("shop.removeFromCart")}
      open={tooltipOpen}
      onOpenChange={(e) => setTooltipOpen(e.open)}
      portalled
    >
      <IconButton
        aria-label={isExcluded ? t("shop.addToCart") : t("shop.removeFromCart")}
        size="2xs"
        variant="ghost"
        colorPalette={isExcluded ? "green" : "red"}
        onClick={() => {
          setTooltipOpen(false);
          setCartExclude(sku, !isExcluded);
        }}
      >
        <FontAwesomeIcon icon={isExcluded ? faPlus : faMinus} />
      </IconButton>
    </Tooltip>
  );
}

function WishlistPanel() {
  const { wishCars, wishTracks, cartExcludes } = useIr();
  const { t } = useTranslation();
  const wishList = TRACKS_LIST.filter((t) => wishTracks.includes(t.sku))
    .map((c) => ({ ...c, isCar: false }))
    .concat(
      CARS_LIST.filter((c) => wishCars.includes(c.sku)).map((c) => ({
        ...c,
        isCar: true,
      })),
    );

  const wishSkus = new Set(wishList.map((item) => item.sku));
  const effectiveExcludes = new Set(
    cartExcludes.filter((sku) => wishSkus.has(sku)),
  );

  const sortedWishList = [
    ...wishList.filter((item) => !effectiveExcludes.has(item.sku)),
    ...wishList.filter((item) => effectiveExcludes.has(item.sku)),
  ];

  const cartList = wishList.filter((item) => !effectiveExcludes.has(item.sku));

  return (
    <Stack
      flex={1}
      borderRadius={"md"}
      w={"100%"}
      h={"100%"}
      maxH={"100%"}
      bgColor={"bg.muted"}
      p={4}
    >
      <HStack justifyContent={"space-between"}>
        <Text textStyle="3xl">{t("common.wishlist")}</Text>
        <ShopSettingsPopover />
      </HStack>

      <Stack
        overflowY="auto"
        flex={1}
        fontSize={{ base: "sm", md: "md" }}
        gap={{ base: 1, md: 2 }}
      >
        <Separator />
        <For
          fallback={
            <EmptyState
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              title={t("empty.emptyWishlist")}
              description={t("empty.addWishlist")}
            />
          }
          each={sortedWishList}
          children={(item) => {
            const isExcluded = effectiveExcludes.has(item.sku);
            return (
              <Fragment key={item.id}>
                <HStack opacity={isExcluded ? 0.4 : 1}>
                  <FontAwesomeIcon
                    icon={item.isCar ? faCar : faRoad}
                    size="sm"
                  />
                  <Flex flex={1}>{item.name}</Flex>
                  <FormatNumber
                    style="currency"
                    currency="USD"
                    value={item.price}
                  />
                  <CartToggleButton sku={item.sku} isExcluded={isExcluded} />
                </HStack>
                <Separator />
              </Fragment>
            );
          }}
        />
      </Stack>
      <PriceDiscountPanel wishList={cartList} />
      <CheckoutButton wishList={cartList} />
    </Stack>
  );
}

export default WishlistPanel;
