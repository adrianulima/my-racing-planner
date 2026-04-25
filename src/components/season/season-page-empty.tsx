import { ETabs, setHelpPresented } from "@/store/ui";
import { Flex, Link, List } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../ui/empty-state";

function SeasonPageEmpty() {
  const [_, navigate] = useLocation();
  const { t } = useTranslation();
  return (
    <Flex
      flex={1}
      borderRadius={"md"}
      bgColor={"bg.muted"}
      p={4}
      justifyContent={"center"}
    >
      <EmptyState
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        title={t("empty.noSeriesSelected")}
        description={t("empty.noFavoriteSeries")}
      >
        <List.Root variant="marker">
          <List.Item>
            <Link onClick={() => setHelpPresented(false)}>
              {t("empty.readHelp")}
            </Link>
          </List.Item>
          <List.Item onClick={() => navigate(ETabs.MySeries)}>
            <Link>{t("empty.goSeries")}</Link>
          </List.Item>
        </List.Root>
      </EmptyState>
    </Flex>
  );
}

export default SeasonPageEmpty;
