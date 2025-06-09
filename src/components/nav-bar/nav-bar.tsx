import useScreenSize from "@/hooks/useScreenSize";
import { ETabs } from "@/store/ui";
import { For, Image, Stack, StackProps } from "@chakra-ui/react";
import {
  faCar,
  faChartLine,
  faFlagCheckered,
  faRoad,
  faShoppingBag,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "wouter";
import BMCIcon from "../bmc/icon";
import { Tooltip } from "../ui/tooltip";
import MoreMenuButton from "./more-menu-button";
import NavBarButton from "./nav-bar-button";

const tabsTop = [
  { label: "My Season", icon: faTableCellsLarge, index: ETabs.MySeason },
  { label: "My Series", icon: faFlagCheckered, index: ETabs.MySeries },
  { label: "My Cars", icon: faCar, index: ETabs.MyCars },
  { label: "My Tracks", icon: faRoad, index: ETabs.MyTracks },
  { label: "Shop Guide", icon: faShoppingBag, index: ETabs.ShopGuide },
];

function NavBar({ ...props }: StackProps) {
  const { height } = useScreenSize();
  const [location] = useLocation();
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
          content={`Racing Planner v${APP_VERSION}`}
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
              label={tab.label}
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
            label={"History"}
            icon={faChartLine}
            selected={location === ETabs.History}
            as={Link}
            href={ETabs.History}
          />

          <NavBarButton
            key={"buy-me-a-coffee"}
            label="Donate"
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
