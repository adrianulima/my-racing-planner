import { useDialogTracking } from "@/hooks/useDialogTracking";
import { EDialogs } from "@/store/ui";
import {
  Box,
  Em,
  Heading,
  Icon,
  Link,
  List,
  Separator,
  Text,
} from "@chakra-ui/react";
import {
  faBookmark,
  faCar,
  faCalendarDays,
  faChartLine,
  faFlagCheckered,
  faGears,
  faLanguage,
  faMessage,
  faMoon,
  faMugHot,
  faPrint,
  faRoad,
  faSackXmark,
  faShieldHalved,
  faShoppingBag,
  faStar,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trans, useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";

function HelpContent() {
  useDialogTracking(EDialogs.Help);
  const { t } = useTranslation();
  return (
    <>
      <section>
        <Heading mt={2}>
          <Trans i18nKey="help.seriesHeading" components={{ series: <Em /> }} />{" "}
          <FontAwesomeIcon size="xs" icon={faFlagCheckered} />
        </Heading>

        <Text as="p">{t("help.seriesText1")}</Text>
        <Text as="p">
          <Trans i18nKey="help.seriesText2" components={{ star: <Em /> }} />{" "}
          <Icon color={"orange"}>
            <FontAwesomeIcon icon={faStar} />
          </Icon>
        </Text>

        <Box my={3} />

        <Heading mt={2} size={"md"}>
          <Trans
            i18nKey="help.contentHeading"
            components={{ cars: <Em />, tracks: <Em /> }}
          />{" "}
          <FontAwesomeIcon size="xs" icon={faCar} />{" "}
          <FontAwesomeIcon size="xs" icon={faRoad} />
        </Heading>

        <Text as="p">
          <Trans
            i18nKey="help.contentText1"
            components={{ owned: <strong />, wish: <strong /> }}
          />
        </Text>
        <Text as="p">{t("help.contentText2")}</Text>
      </section>
      <section>
        <Heading mt={2} size={"md"}>
          {t("help.checkboxHeading")}
        </Heading>
        <Text mb={2} as="p">
          {t("help.checkboxIntro")}
        </Text>
        <List.Root variant="plain">
          <List.Item>
            <Checkbox
              mr={2}
              size={"sm"}
              readOnly={true}
              checked={false}
              controlProps={{ borderColor: "gray.400" }}
            />
            <Trans
              i18nKey="help.unchecked"
              components={{ strong: <strong /> }}
            />
          </List.Item>
          <List.Item>
            <Checkbox mr={2} size={"sm"} readOnly={true} checked={true} />
            <Trans
              i18nKey="help.checkedOwned"
              components={{ strong: <strong /> }}
            />
          </List.Item>
          <List.Item>
            <Checkbox
              mr={2}
              size={"sm"}
              readOnly={true}
              colorPalette={"blue"}
              checked={true}
              icon={<FontAwesomeIcon size="xs" icon={faBookmark} />}
            />
            <Trans
              i18nKey="help.checkedWishlist"
              components={{ strong: <strong /> }}
            />
          </List.Item>
          <List.Item>
            <Checkbox
              mr={2}
              size={"sm"}
              readOnly={true}
              colorPalette={"green"}
              checked={true}
              icon={<FontAwesomeIcon size="xs" icon={faSackXmark} />}
            />
            <Trans
              i18nKey="help.checkedFree"
              components={{ strong: <strong /> }}
            />
          </List.Item>
        </List.Root>
        <Text my={2} as="p">
          {t("help.cycleStates")}
        </Text>
      </section>
      <Separator my={3} />
      <section>
        <Heading mt={2}>
          <Trans i18nKey="help.seasonHeading" components={{ season: <Em /> }} />{" "}
          <FontAwesomeIcon size="xs" icon={faTableCellsLarge} /> Page
        </Heading>
        <Text as="p">{t("help.seasonText1")}</Text>
        <Text my={2} as="p">
          {t("help.seasonText2")}
        </Text>

        <List.Root>
          <List.Item>
            <Trans
              i18nKey="help.redCells"
              components={{ strong: <strong /> }}
            />
          </List.Item>
          <List.Item>
            <Trans
              i18nKey="help.greenCells"
              components={{ strong: <strong /> }}
            />
          </List.Item>
          <List.Item>
            <Trans
              i18nKey="help.tealCells"
              components={{ strong: <strong /> }}
            />
          </List.Item>
          <List.Item>
            <Trans
              i18nKey="help.blueCells"
              components={{ strong: <strong /> }}
            />
          </List.Item>
        </List.Root>

        <Heading mt={2} size={"md"}>
          {t("help.tableOptions")} <FontAwesomeIcon size="xs" icon={faGears} />
        </Heading>

        <List.Root>
          <List.Item>
            <strong>{t("settings.showContentCheckboxes")}</strong>:{" "}
            {t("settings.showContentCheckboxesTooltip")}
          </List.Item>
          <List.Item>
            <strong>{t("settings.showCarsDropdown")}</strong>:{" "}
            {t("settings.showCarsDropdownTooltip")}
          </List.Item>
          <List.Item>
            <strong>{t("settings.highlightHover")}</strong>:{" "}
            {t("settings.highlightHoverTooltip")}
          </List.Item>
          <List.Item>
            <strong>{t("settings.showWishlist")}</strong>:{" "}
            {t("settings.showWishlistTooltip")}
          </List.Item>
          <List.Item>
            <strong>{t("settings.showOwned")}</strong>:{" "}
            {t("settings.showOwnedTooltip")}
          </List.Item>
        </List.Root>
      </section>
      <Separator my={3} />
      <section>
        <Heading mt={2}>
          <Trans
            i18nKey="help.scheduleHeading"
            components={{ schedule: <Em /> }}
          />{" "}
          <FontAwesomeIcon size="xs" icon={faCalendarDays} />
        </Heading>
        <Text as="p">{t("help.scheduleText1")}</Text>
        <Text my={2} as="p">
          {t("help.scheduleText2")}
        </Text>
        <Text my={2} as="p">
          <Trans i18nKey="help.scheduleText3" components={{ print: <Em /> }} />{" "}
          <FontAwesomeIcon size="xs" icon={faPrint} />
        </Text>
      </section>
      <Separator my={3} />
      <section>
        <Heading mt={2}>
          <Trans i18nKey="help.shopHeading" components={{ shop: <Em /> }} />{" "}
          <FontAwesomeIcon size="xs" icon={faShoppingBag} /> Page
        </Heading>
        <Text mb={2} as="p">
          {t("help.shopText1")}
        </Text>
        <Text my={2} as="p">
          <Trans
            i18nKey="help.shopText2"
            components={{ button: <strong />, store: <Em /> }}
          />
        </Text>
        <Text my={2} fontWeight={"bold"} as="p">
          {t("about.disclaimer")}
        </Text>
      </section>
      <Separator my={3} />
      <section>
        <Heading mt={2}>{t("help.more")}</Heading>
        <List.Root>
          <List.Item>
            <strong>
              {t("common.language")}{" "}
              <FontAwesomeIcon size="xs" icon={faLanguage} />
            </strong>
            : {t("help.languageText")}
          </List.Item>
          <List.Item>
            <strong>
              {t("menu.theme")} <FontAwesomeIcon size="xs" icon={faMoon} />
            </strong>
            : {t("help.themeText")}
          </List.Item>
          <List.Item>
            <strong>
              {t("common.history")}{" "}
              <FontAwesomeIcon size="xs" icon={faChartLine} />
            </strong>
            : {t("help.historyText")}
          </List.Item>
          <List.Item>
            <strong>
              {t("menu.privacy")}{" "}
              <FontAwesomeIcon size="xs" icon={faShieldHalved} />
            </strong>
            : {t("help.privacyText")}
          </List.Item>
          <List.Item>
            <strong>
              {t("menu.buyMeCoffee")}{" "}
              <FontAwesomeIcon size="xs" icon={faMugHot} />
            </strong>
            :{" "}
            <Link
              href="https://buymeacoffee.com/adrianulima"
              target="_blank"
              rel="noreferrer"
            >
              {t("help.donateText")}
            </Link>
            .
          </List.Item>
          <List.Item>
            <strong>
              {t("help.feedbackLabel")}{" "}
              <FontAwesomeIcon size="xs" icon={faMessage} />
            </strong>
            :{" "}
            <Trans
              i18nKey="help.feedbackText"
              components={{
                email: (
                  <Tooltip
                    lazyMount
                    unmountOnExit
                    content={"adrianulima@gmail.com"}
                    showArrow
                    positioning={{ placement: "top" }}
                    openDelay={200}
                    closeDelay={100}
                  >
                    <Link
                      href="mailto:adrianulima@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                    />
                  </Tooltip>
                ),
                repo: (
                  <Link
                    href="https://github.com/adrianulima/my-racing-planner"
                    target="_blank"
                    rel="noreferrer"
                  />
                ),
              }}
            />
          </List.Item>
        </List.Root>
      </section>
      <Separator my={3} />
      <section>
        <Heading mt={2}>{t("help.pwaHeading")}</Heading>
        <Text mb={2} as="p">
          {t("help.pwaText")}
        </Text>

        <Heading mt={2} size={"md"}>
          {t("help.iosHeading")}
        </Heading>
        <List.Root as="ol">
          <List.Item>{t("help.iosStep1")}</List.Item>
          <List.Item>{t("help.iosStep2")}</List.Item>
          <List.Item>{t("help.iosStep3")}</List.Item>
          <List.Item>{t("help.iosStep4")}</List.Item>
        </List.Root>

        <Heading mt={2} size={"md"}>
          {t("help.androidHeading")}
        </Heading>
        <List.Root as="ol">
          <List.Item>{t("help.androidStep1")}</List.Item>
          <List.Item>{t("help.androidStep2")}</List.Item>
          <List.Item>{t("help.androidStep3")}</List.Item>
          <List.Item>{t("help.androidStep4")}</List.Item>
        </List.Root>
        <Text my={2} as="p">
          {t("help.pwaDone")}
        </Text>
      </section>
    </>
  );
}

export default HelpContent;
