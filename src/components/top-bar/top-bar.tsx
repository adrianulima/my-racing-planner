import useScreenSize from "@/hooks/useScreenSize";
import {
  showBanner,
  useBannerVisibility,
  useNotifications,
} from "@/store/notifications";
import {
  Badge,
  Collapsible,
  Heading,
  HStack,
  StackProps,
} from "@chakra-ui/react";
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
  const { isVisible: bannerVisible } = useBannerVisibility();
  return (
    !height.tiny && (
      <Collapsible.Root open={!scrolled}>
        <Collapsible.Content>
          <HStack
            justifyContent={"space-between"}
            mb={scrolled ? 0 : 2}
            {...props}
          >
            <HStack ml={2} gap={2}>
              <Heading
                color={"gray.500"}
                size="2xl"
                fontFamily="mono"
                fontWeight="bold"
                userSelect={"none"}
              >
                2025 Season 4
              </Heading>
              {!bannerVisible && (
                <Badge
                  bg="red.600"
                  color="white"
                  fontSize="xs"
                  px={2}
                  py={2}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={showBanner}
                  title="Click to view update notice"
                  _hover={{ transform: "scale(1.1)", bg: "red.700" }}
                  transition="all 0.2s"
                  fontWeight="bold"
                  minW="24px"
                  minH="24px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  2026
                </Badge>
              )}
            </HStack>
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
