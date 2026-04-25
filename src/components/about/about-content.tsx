import { useDialogTracking } from "@/hooks/useDialogTracking";
import { EDialogs } from "@/store/ui";
import { For, Heading, Link, List, Text } from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";
import { Tooltip } from "../ui/tooltip";

const contributors = [
  { name: "Adriano Lima", github: "adrianulima" },
  { name: "Juni Lima", github: "junilima" },
  { name: "Daniel López", github: "raikwallace" },
  { name: "Chris Kent", github: "cjkent" },
];

function AboutContent() {
  useDialogTracking(EDialogs.About);
  const { t } = useTranslation();
  return (
    <>
      <section>
        <Heading>{t("about.dataUpdates")}</Heading>
        <Text as="p">{t("about.dataUpdatesText")}</Text>
        <Text as="p" mt={2}>
          {t("about.changeLogText")}
        </Text>
      </section>

      <section>
        <Heading mt={2}>{t("about.feedback")}</Heading>
        <Text as="div">
          <Trans
            i18nKey="about.feedbackText"
            components={{
              repo: (
                <Link
                  href="https://github.com/adrianulima/my-racing-planner"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
              email: (
                <Tooltip
                  lazyMount
                  unmountOnExit
                  content={"adrianulima@gmail.com"}
                  showArrow
                  positioning={{ placement: "bottom" }}
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
            }}
          />
        </Text>
      </section>

      <section>
        <Text my={2} fontWeight={"bold"} as="p">
          {t("about.disclaimer")}
        </Text>
      </section>

      <section>
        <Heading mt={2}>{t("about.creator")}</Heading>
        <Text as="p">
          <Trans
            i18nKey="about.creatorText1"
            components={{ strong: <strong /> }}
          />
        </Text>
        <Text as="p" my={2}>
          {t("about.creatorText2")}
        </Text>
      </section>

      <section>
        <Heading mt={2}>{t("about.contributors")}</Heading>
        <Text as="p">{t("about.contributorsText")}</Text>
        <List.Root>
          <For
            each={contributors}
            children={(c) => (
              <List.Item
                key={c.github}
                fontWeight={c.github === "adrianulima" ? "bold" : undefined}
              >
                {c.name} (
                <Link
                  href={`https://github.com/${c.github}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{c.github}
                </Link>
                )
              </List.Item>
            )}
          />
        </List.Root>
      </section>
    </>
  );
}

export default AboutContent;
