import { ETabs } from "@/store/ui";
import { Flex, Link, List } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../ui/empty-state";

type ScheduleEmptyStateProps = {
  navigate: (path: string) => void;
};

function ScheduleEmptyState({ navigate }: ScheduleEmptyStateProps) {
  const { t } = useTranslation();

  return (
    <Flex
      flex={1}
      borderRadius="md"
      bgColor="bg.muted"
      p={4}
      justifyContent="center"
    >
      <EmptyState
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        title={t("empty.noSeriesSelected")}
        description={t("empty.selectSeriesSchedule")}
      >
        <List.Root variant="marker">
          <List.Item>
            <Link onClick={() => navigate(ETabs.MySeason)}>
              {t("empty.goSeasonSchedule")}
            </Link>
          </List.Item>
        </List.Root>
      </EmptyState>
    </Flex>
  );
}

export default ScheduleEmptyState;
