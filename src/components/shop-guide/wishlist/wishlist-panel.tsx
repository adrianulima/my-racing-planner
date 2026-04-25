import { useIr } from "@/store/ir";
import {
  Flex,
  For,
  FormatNumber,
  HStack,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  faCar,
  faMagnifyingGlass,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import CARS_LIST from "../../../ir-data/utils/cars";
import TRACKS_LIST from "../../../ir-data/utils/tracks";
import { EmptyState } from "../../ui/empty-state";
import ShopSettingsPopover from "../shop-settings-popover";
import CheckoutButton from "./checkout-button";
import PriceDiscountPanel from "./price-discount-panel";

function WishlistPanel() {
  const { wishCars, wishTracks } = useIr();
  const { t } = useTranslation();
  const wishList = TRACKS_LIST.filter((t) => wishTracks.includes(t.sku))
    .map((c) => ({ ...c, isCar: false }))
    .concat(
      CARS_LIST.filter((c) => wishCars.includes(c.sku)).map((c) => ({
        ...c,
        isCar: true,
      })),
    );

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
          each={wishList}
          children={(item) => (
            <Fragment key={item.id}>
              <HStack>
                <FontAwesomeIcon icon={item.isCar ? faCar : faRoad} size="sm" />
                <Flex flex={1}>{item.name}</Flex>
                <FormatNumber
                  style="currency"
                  currency="USD"
                  value={item.price}
                />
              </HStack>
              <Separator />
            </Fragment>
          )}
        />
      </Stack>
      <PriceDiscountPanel wishList={wishList} />
      <CheckoutButton wishList={wishList} />
    </Stack>
  );
}

export default WishlistPanel;
