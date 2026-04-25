import { Flex } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../ui/empty-state";

function SeasonTableEmpty() {
  const { t } = useTranslation();
  return (
    <Flex flex={1} borderRadius={"md"} bgColor={"bg.muted"} p={4}>
      <EmptyState
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        title={t("empty.noSeriesFound")}
        description={t("empty.differentCategories")}
      />
    </Flex>
  );
}

export default SeasonTableEmpty;
