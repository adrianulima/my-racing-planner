import useScreenSize from "@/hooks/useScreenSize";
import { useNotifications } from "@/store/notifications";
import { Collapsible, Heading, HStack, StackProps } from "@chakra-ui/react";
import {
  faCircleQuestion,
  faFileLines,
  faInfoCircle,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import AboutDialog from "../about/about-dialog";
import { useAppLayout } from "../app/useAppLayout";
import ChangelogDialog from "../changelog/changelog-dialog";
import HelpDialog from "../help/help-dialog";
import PrivacyPolicyAnalog from "../privacy-policy/privacy-policy-dialog";
import TopBarButton from "./top-bar-button";
import UserDropdown from "./user-dropdown";

function TopBar({ ...props }: StackProps) {
  const { scrolled } = useAppLayout();
  const { height } = useScreenSize();
  const { changelog, privacyPolicy } = useNotifications();
  const { t } = useTranslation();
  return (
    !height.tiny && (
      <Collapsible.Root open={!scrolled}>
        <Collapsible.Content>
          <HStack
            justifyContent={"space-between"}
            mb={scrolled ? 0 : 2}
            {...props}
          >
            <Heading
              ml={2}
              color={"gray.500"}
              size="2xl"
              fontFamily="mono"
              fontWeight="bold"
              userSelect={"none"}
            >
              {t("seasonLabel.current", { year: 2026, season: 2 })}
            </Heading>
            <HStack>
              <AboutDialog ids={{ trigger: "about-dialog" }}>
                <TopBarButton
                  tooltip={t("menu.about")}
                  icon={faInfoCircle}
                  trigger={"about-dialog"}
                />
              </AboutDialog>

              <HelpDialog ids={{ trigger: "help-dialog" }}>
                <TopBarButton
                  tooltip={t("menu.help")}
                  icon={faCircleQuestion}
                  trigger={"help-dialog"}
                />
              </HelpDialog>

              <PrivacyPolicyAnalog ids={{ trigger: "privacy-policy" }}>
                <TopBarButton
                  tooltip={t("dialogs.privacyTitle")}
                  icon={faShieldHalved}
                  trigger={"privacy-policy"}
                  notification={privacyPolicy}
                />
              </PrivacyPolicyAnalog>

              <ChangelogDialog ids={{ trigger: "changelog-dialog" }}>
                <TopBarButton
                  tooltip={t("dialogs.changeLogTitle")}
                  icon={faFileLines}
                  trigger={"changelog-dialog"}
                  notification={changelog}
                />
              </ChangelogDialog>

              <UserDropdown />
            </HStack>
          </HStack>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  );
}

export default TopBar;
