import useScreenSize from "@/hooks/useScreenSize";
import { useNotifications } from "@/store/notifications";
import { Collapsible, Heading, HStack, StackProps } from "@chakra-ui/react";
import {
  faCircleQuestion,
  faFileLines,
  faInfoCircle,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
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
              2025 Season 4
            </Heading>
            <HStack>
              <AboutDialog ids={{ trigger: "about-dialog" }}>
                <TopBarButton
                  tooltip={"About"}
                  icon={faInfoCircle}
                  trigger={"about-dialog"}
                />
              </AboutDialog>

              <HelpDialog ids={{ trigger: "help-dialog" }}>
                <TopBarButton
                  tooltip={"Help"}
                  icon={faCircleQuestion}
                  trigger={"help-dialog"}
                />
              </HelpDialog>

              <PrivacyPolicyAnalog ids={{ trigger: "privacy-policy" }}>
                <TopBarButton
                  tooltip={"Privacy Policy"}
                  icon={faShieldHalved}
                  trigger={"privacy-policy"}
                  notification={privacyPolicy}
                />
              </PrivacyPolicyAnalog>

              <ChangelogDialog ids={{ trigger: "changelog-dialog" }}>
                <TopBarButton
                  tooltip={"Change Log"}
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
