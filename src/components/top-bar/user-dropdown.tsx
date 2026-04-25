import { Box, Flex } from "@chakra-ui/react";
import {
  faLanguage,
  faMoon,
  faShareFromSquare,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { openExportDialog } from "../export/export-dialog-global";
import { openLanguageDialog } from "../language/language-dialog-global";
import { Avatar } from "../ui/avatar";
import { useColorMode } from "../ui/color-mode";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";

function UserDropdown() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  // const signedIn = false;
  return (
    <MenuRoot>
      <MenuTrigger cursor={"pointer"}>
        <Avatar
          // name="Adriano Lima"
          // src="link-to-avatar"
          // shape="rounded"
          colorPalette={"bg"}
          size="sm"
        />
      </MenuTrigger>
      <MenuContent>
        {/* {!signedIn && (
          <MenuItem value="login" valueText="Log In" disabled>
            <Flex justifyContent={"center"} w={"1rem"}>
              <FontAwesomeIcon icon={faRightToBracket} />
            </Flex>
            <Box flex="1">Log In</Box>
          </MenuItem>
        )} */}

        <MenuItem
          value="export"
          valueText={t("menu.exportMyContent")}
          onClick={openExportDialog}
        >
          <Flex justifyContent={"center"} w={"1rem"}>
            <FontAwesomeIcon icon={faShareFromSquare} />
          </Flex>
          <Box flex="1">{t("menu.exportMyContent")}</Box>
        </MenuItem>

        <MenuItem
          value="language"
          valueText={t("common.language")}
          onClick={openLanguageDialog}
        >
          <Flex justifyContent={"center"} w={"1rem"}>
            <FontAwesomeIcon icon={faLanguage} />
          </Flex>
          <Box flex="1">{t("languages.switch")}</Box>
        </MenuItem>

        <MenuItem
          value="toggle-theme"
          valueText={t("menu.toggleTheme")}
          onClick={toggleColorMode}
        >
          <Flex justifyContent={"center"} w={"1rem"}>
            <FontAwesomeIcon icon={colorMode === "light" ? faSun : faMoon} />
          </Flex>
          <Box flex="1">{t("menu.toggleColorMode")}</Box>
        </MenuItem>

        {/* {signedIn && (
          <MenuItem value="logout" valueText="Log Out">
            <Flex justifyContent={"center"} w={"1rem"}>
              <FontAwesomeIcon icon={faPowerOff} />
            </Flex>
            <Box flex="1">Log Out</Box>
          </MenuItem>
        )} */}
      </MenuContent>
    </MenuRoot>
  );
}

export default UserDropdown;
