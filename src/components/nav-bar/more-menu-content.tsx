import { useNotifications } from "@/store/notifications";
import { ETabs } from "@/store/ui";
import { Group, Separator, Stack } from "@chakra-ui/react";
import {
  faCalendarDays,
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
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import AboutDialog from "../about/about-dialog";
import BMCIcon from "../bmc/icon";
import ChangelogDialog from "../changelog/changelog-dialog";
import { openExportDialog } from "../export/export-dialog-global";
import HelpDialog from "../help/help-dialog";
import { openLanguageDialog } from "../language/language-dialog-global";
import PrivacyPolicyAnalog from "../privacy-policy/privacy-policy-dialog";
import { useColorMode } from "../ui/color-mode";
import MoreMenuItem from "./more-menu-item";

function MoreMenuContent({ close }: { close: () => void }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { changelog, privacyPolicy } = useNotifications();
  const { t } = useTranslation();
  const [_, navigate] = useLocation();
  return (
    <Stack>
      <Group grow gap="0" alignItems={"start"}>
        <AboutDialog>
          <MoreMenuItem small label={t("menu.about")} icon={faInfoCircle} />
        </AboutDialog>
        <Separator orientation={"vertical"} />
        <HelpDialog>
          <MoreMenuItem small label={t("menu.help")} icon={faCircleQuestion} />
        </HelpDialog>
        <Separator orientation={"vertical"} />
        <PrivacyPolicyAnalog>
          <MoreMenuItem
            small
            label={t("menu.privacy")}
            icon={faShieldHalved}
            notification={privacyPolicy}
          />
        </PrivacyPolicyAnalog>
        <Separator orientation={"vertical"} />
        <ChangelogDialog>
          <MoreMenuItem
            small
            label={t("menu.changeLog")}
            icon={faFileLines}
            notification={changelog}
          />
        </ChangelogDialog>
      </Group>
      <Separator />
      <MoreMenuItem
        label={t("nav.mySchedule")}
        icon={faCalendarDays}
        onClick={() => {
          close();
          navigate(ETabs.MySchedule);
        }}
      />
      <Separator />
      <MoreMenuItem
        label={t("common.history")}
        icon={faChartLine}
        onClick={() => {
          close();
          navigate(ETabs.History);
        }}
      />
      <Separator />
      <MoreMenuItem
        label={t("menu.buyMeCoffee")}
        onClick={close}
        as={"a"}
        href="https://buymeacoffee.com/adrianulima"
        target="_blank"
        rel="noreferrer"
      >
        <BMCIcon />
      </MoreMenuItem>
      <Separator />
      <MoreMenuItem label={t("menu.exportMyContent")} icon={faShareFromSquare} onClick={() => { close(); openExportDialog(); }} />
      <Separator />
      <MoreMenuItem label={t("languages.switch")} icon={faLanguage} onClick={() => { close(); openLanguageDialog(); }} />
      <Separator />
      <MoreMenuItem
        label={t("menu.toggleColorMode")}
        icon={colorMode === "light" ? faSun : faMoon}
        onClick={toggleColorMode}
      />
    </Stack>
  );
}

export default MoreMenuContent;
