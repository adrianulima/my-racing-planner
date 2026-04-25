import { useIr } from "@/store/ir";
import { Flex, Table } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../../ui/empty-state";

function TracksUsedEmpty() {
  const { favoriteSeries } = useIr();
  const { t } = useTranslation();

  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell colSpan={8} minWidth={"100%"}>
        <Flex justifyContent={"start"} height={"100%"}>
          <EmptyState
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            title={
              favoriteSeries.length > 0
                ? t("empty.noPaidTracksMissing")
                : t("empty.noSeriesSelected")
            }
            description={
              favoriteSeries.length > 0
                ? t("empty.ownAllFavoriteTracks")
                : t("empty.noFavoriteSeries")
            }
          />
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
}

export default TracksUsedEmpty;
