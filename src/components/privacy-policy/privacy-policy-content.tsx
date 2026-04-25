import { useDialogTracking } from "@/hooks/useDialogTracking";
import { setPrivacyPolicyRead } from "@/store/notifications";
import { EDialogs } from "@/store/ui";
import { Heading, Link, List, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Tooltip } from "../ui/tooltip";

export const PRIVACY_VERSION = "Wed 15 Jan, 2025";

function PrivacyPolicyContent() {
  useDialogTracking(EDialogs.PrivacyPolicy);
  const { t } = useTranslation();
  useEffect(() => { setPrivacyPolicyRead(); }, []);
  return (
    <>
      <Text textAlign={"center"} as="p">
        {t("privacy.lastUpdated", { date: PRIVACY_VERSION })}
      </Text>
      <section>
        <Heading>{t("privacy.collectedData")}</Heading>
        <Text as="p">{t("privacy.collectedDataText")}</Text>
      </section>

      <section>
        <Heading mt={2}>{t("privacy.localStorage")}</Heading>
        <Text as="p">{t("privacy.localStorageText1")}</Text>
        <Text my={2} as="p">
          {t("privacy.localStorageText2")}
        </Text>
      </section>

      <section>
        <Heading mt={2}>{t("privacy.analytics")}</Heading>
        <Text as="p">{t("privacy.analyticsIntro")}</Text>

        <List.Root>
          <List.Item>
            <strong>{t("privacy.pageVisits")}</strong> ({t("privacy.pageVisitsText")})
          </List.Item>
          <List.Item>
            <strong>{t("privacy.outboundClicks")}</strong> ({t("privacy.outboundClicksText")})
          </List.Item>
        </List.Root>
        <Text my={2} as="p">
          {t("privacy.analyticsText")}
        </Text>
      </section>

      <section>
        <Heading mt={2}>{t("privacy.thirdParty")}</Heading>
        <Text as="p">{t("privacy.thirdPartyText")}</Text>
      </section>

      <section>
        <Heading mt={2}>{t("privacy.choices")}</Heading>
        <Text as="p">{t("privacy.choicesText1")}</Text>
        <Text my={2} as="p">
          {t("privacy.choicesText2")}
        </Text>
      </section>

      <section>
        <Heading mt={2}>{t("privacy.contact")}</Heading>
        <Text as="p">
          <Trans
            i18nKey="privacy.contactText"
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
        </Text>
      </section>
    </>
  );
}

export default PrivacyPolicyContent;
