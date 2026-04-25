import { Box, BoxProps, Tabs, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export enum EShopTab {
  TracksUsed = "TracksUsed",
  WishlistPanel = "WishlistPanel",
}

function ShopSubPage({
  tab,
  setTab,
  ...rest
}: BoxProps & {
  tab: EShopTab;
  setTab: (t: EShopTab) => void;
}) {
  const { t } = useTranslation();
  return (
    <Box {...rest}>
      <Tabs.Root
        size={"sm"}
        value={tab}
        onValueChange={(e) => setTab(e.value as EShopTab)}
        variant={"enclosed"}
        width={"100%"}
        flex={1}
      >
        <Tabs.List flex={1} width={"100%"}>
          <Tabs.Trigger value={EShopTab.TracksUsed} width={"100%"}>
            <Text textWrap={"nowrap"}>{t("pages.shop.tracksUsed")}</Text>
          </Tabs.Trigger>
          <Tabs.Trigger value={EShopTab.WishlistPanel} width={"100%"}>
            <Text textWrap={"nowrap"}>{t("common.wishlist")}</Text>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
}

export default ShopSubPage;
