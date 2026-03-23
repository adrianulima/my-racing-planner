import { useNotifications } from "@/store/notifications";
import { ETabs } from "@/store/ui";
import { Group, Separator, Stack } from "@chakra-ui/react";
import {
  faChartLine,
  faCircleQuestion,
  faFileLines,
  faInfoCircle,
  faLanguage,
  faMoon,
  faShareFromSquare,
  faShieldHalved,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "wouter";
import AboutDialog from "../about/about-dialog";
import BMCIcon from "../bmc/icon";
import ChangelogDialog from "../changelog/changelog-dialog";
import { openExportDialog } from "../export/export-dialog-global";
import HelpDialog from "../help/help-dialog";
import PrivacyPolicyAnalog from "../privacy-policy/privacy-policy-dialog";
import { useColorMode } from "../ui/color-mode";
import MoreMenuItem from "./more-menu-item";

function MoreMenuContent({ close }: { close: () => void }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { changelog, privacyPolicy } = useNotifications();
  const [_, navigate] = useLocation();
  return (
    <Stack>
      <Group grow gap="0" alignItems={"start"}>
        <AboutDialog>
          <MoreMenuItem small label="About" icon={faInfoCircle} />
        </AboutDialog>
        <Separator orientation={"vertical"} />
        <HelpDialog>
          <MoreMenuItem small label="Help" icon={faCircleQuestion} />
        </HelpDialog>
        <Separator orientation={"vertical"} />
        <PrivacyPolicyAnalog>
          <MoreMenuItem
            small
            label="Privacy"
            icon={faShieldHalved}
            notification={privacyPolicy}
          />
        </PrivacyPolicyAnalog>
        <Separator orientation={"vertical"} />
        <ChangelogDialog>
          <MoreMenuItem
            small
            label="Change Log"
            icon={faFileLines}
            notification={changelog}
          />
        </ChangelogDialog>
      </Group>
      <Separator />
      <MoreMenuItem
        label="History"
        icon={faChartLine}
        onClick={() => {
          close();
          navigate(ETabs.History);
        }}
      />
      <Separator />
      <MoreMenuItem
        label="Buy me a Coffee"
        onClick={close}
        as={"a"}
        href="https://buymeacoffee.com/adrianulima"
        target="_blank"
        rel="noreferrer"
      >
        <BMCIcon />
      </MoreMenuItem>
      <Separator />
      <MoreMenuItem label="Export My Content" icon={faShareFromSquare} onClick={() => { close(); openExportDialog(); }} />
      <Separator />
      <MoreMenuItem label="Switch Language" icon={faLanguage} disabled />
      <Separator />
      <MoreMenuItem
        label="Toggle Color Mode"
        icon={colorMode === "light" ? faSun : faMoon}
        onClick={toggleColorMode}
      />
    </Stack>
  );
}

export default MoreMenuContent;
