import { ETabs } from "@/store/ui";
import { For, HStack, StackProps } from "@chakra-ui/react";
import {
  faCar,
  faCalendarDays,
  faFlagCheckered,
  faRoad,
  faShoppingBag,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import MoreMenuButton from "./more-menu-button";
import NavBarButton from "./nav-bar-button";

function BottomNavBar({ ...props }: StackProps) {
  const [location] = useLocation();
  const { t } = useTranslation();

  const tabsAction = [
    { label: t("nav.mySchedule"), icon: faCalendarDays, index: ETabs.MySchedule },
    { label: t("nav.mySeason"), icon: faTableCellsLarge, index: ETabs.MySeason },
    { label: t("nav.mySeries"), icon: faFlagCheckered, index: ETabs.MySeries },
    location === ETabs.MyTracks
      ? { label: t("nav.myTracks"), icon: faRoad, index: ETabs.MyTracks }
      : { label: t("nav.myCars"), icon: faCar, index: ETabs.MyCars },
    { label: t("nav.shopGuide"), icon: faShoppingBag, index: ETabs.ShopGuide },
  ];

  return (
    <HStack
      {...props}
      justifyContent="space-between"
      p="0.75rem"
      px={"1rem"}
      alignItems={"center"}
      color={{ base: "gray.700", _dark: "gray.300" }}
    >
      <For
        each={tabsAction}
        children={(tab) => (
          <NavBarButton
            key={tab.index}
            label={tab.label}
            icon={tab.icon}
            selected={location === tab.index}
            as={Link}
            href={tab.index}
          />
        )}
      />

      <MoreMenuButton />
    </HStack>
  );
}

export default BottomNavBar;
