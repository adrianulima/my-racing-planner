import useWindowSize from "@/hooks/useWindowSize";
import { ETabs, setSelectedPage, useUi } from "@/store/ui";
import { For, Image, Stack, StackProps } from "@chakra-ui/react";
import {
  faCar,
  faCircleQuestion,
  faFlagCheckered,
  faInfoCircle,
  faLanguage,
  faMoon,
  faRoad,
  faShoppingBag,
  faSun,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import HelpDialog from "../help";
import { useColorMode } from "../ui/color-mode";
import { Tooltip } from "../ui/tooltip";
import NavBarButton from "./nav-bar-button";

const tabsTop = [
  { label: "My Season", icon: faTableCellsLarge, index: ETabs.MySeason },
  { label: "My Series", icon: faFlagCheckered, index: ETabs.MySeries },
  { label: "My Cars", icon: faCar, index: ETabs.MyCars },
  { label: "My Tracks", icon: faRoad, index: ETabs.MyTracks },
  { label: "Shop Guide", icon: faShoppingBag, index: ETabs.ShopGuide },
];

function NavBar({ ...props }: StackProps) {
  const { selectedPage } = useUi();
  const { colorMode, toggleColorMode } = useColorMode();
  const { height } = useWindowSize();
  const small = height <= 680;
  return (
    <Stack
      {...props}
      justifyContent="space-between"
      paddingTop={3}
      paddingBottom={1.5}
      color={{ base: "gray.700", _dark: "gray.300" }}
    >
      <Stack
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={small ? 1.5 : 3}
      >
        <Tooltip
          lazyMount
          unmountOnExit
          content={`My Racing Planner v${APP_VERSION}`}
          showArrow
          positioning={{ placement: "bottom" }}
          openDelay={200}
          closeDelay={100}
        >
          <Image
            w={"40px"}
            h={"40px"}
            src="/my-racing-planner/my-racing-planner-icon.svg"
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
              selected={selectedPage === tab.index}
              onClick={() => setSelectedPage(tab.index)}
            />
          )}
        />
      </Stack>
      <Stack
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={small ? 1.5 : 3}
      >
        <NavBarButton
          key={"about"}
          label={"About"}
          icon={faInfoCircle}
          selected={selectedPage === ETabs.About}
          onClick={() => setSelectedPage(ETabs.About)}
        />
        <HelpDialog>
          <NavBarButton
            key={"help"}
            label={"Help"}
            icon={faCircleQuestion}
            selected={false}
            onClick={() => (document.activeElement as HTMLElement).blur()}
          />
        </HelpDialog>

        <NavBarButton
          key={"language"}
          label={"English"}
          icon={faLanguage}
          selected={false}
          disabled
        />

        <NavBarButton
          key={"color-mode"}
          label={colorMode === "light" ? "Light" : "Dark"}
          icon={colorMode === "light" ? faSun : faMoon}
          selected={false}
          onClick={toggleColorMode}
        />
      </Stack>
    </Stack>
  );
}

export default NavBar;
