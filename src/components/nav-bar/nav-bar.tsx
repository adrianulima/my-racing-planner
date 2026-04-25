import useScreenSize from "@/hooks/useScreenSize";
import { ETabs } from "@/store/ui";
import { For, Image, Stack, StackProps } from "@chakra-ui/react";
import {
  faCar,
  faCalendarDays,
  faChartLine,
  faFlagCheckered,
  faRoad,
  faShoppingBag,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import BMCIcon from "../bmc/icon";
import { Tooltip } from "../ui/tooltip";
import MoreMenuButton from "./more-menu-button";
import NavBarButton from "./nav-bar-button";

const tabsTop = [
  { labelKey: "nav.mySchedule", icon: faCalendarDays, index: ETabs.MySchedule },
  { labelKey: "nav.mySeason", icon: faTableCellsLarge, index: ETabs.MySeason },
  { labelKey: "nav.mySeries", icon: faFlagCheckered, index: ETabs.MySeries },
  { labelKey: "nav.myCars", icon: faCar, index: ETabs.MyCars },
  { labelKey: "nav.myTracks", icon: faRoad, index: ETabs.MyTracks },
  { labelKey: "nav.shopGuide", icon: faShoppingBag, index: ETabs.ShopGuide },
];

function NavBar({ ...props }: StackProps) {
  const { height } = useScreenSize();
  const [location] = useLocation();
  const { t } = useTranslation();
  return (
    <Stack
      {...props}
      justifyContent="space-between"
      py={3}
      color={{ base: "gray.700", _dark: "gray.300" }}
      overflowY={"auto"}
    >
      <Stack
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={!height.tiny && height.small ? 1.5 : 3}
      >
        <Tooltip
          lazyMount
          unmountOnExit
          content={t("app.version", { version: APP_VERSION })}
          showArrow
          positioning={{ placement: "bottom" }}
          openDelay={200}
          closeDelay={100}
        >
          <Image
            userSelect={"none"}
            draggable={false}
            w={"40px"}
            h={"40px"}
            src="/my-racing-planner-icon.svg"
            alt="my=racing-planner-icon"
            mb={3}
          />
        </Tooltip>
        <For
          each={tabsTop}
          children={(tab) => (
            <NavBarButton
              key={tab.index}
              label={t(tab.labelKey)}
              icon={tab.icon}
              selected={location === tab.index}
              as={Link}
              href={tab.index}
            />
          )}
        />
      </Stack>

      {height.tiny ? (
        <Stack justifyContent={"flex-start"} alignItems={"center"}>
          <MoreMenuButton selected={false} />
        </Stack>
      ) : (
        <Stack
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={!height.tiny && height.small ? 1.5 : 3}
        >
          <NavBarButton
            key={"tracks-history"}
            label={t("common.history")}
            icon={faChartLine}
            selected={location === ETabs.History}
            as={Link}
            href={ETabs.History}
          />

          <NavBarButton
            key={"buy-me-a-coffee"}
            label={t("common.donate")}
            selected={false}
            as="a"
            href="https://buymeacoffee.com/adrianulima"
            target="_blank"
            rel="noreferrer"
          >
            <BMCIcon />
          </NavBarButton>
        </Stack>
      )}
    </Stack>
  );
}

export default NavBar;
