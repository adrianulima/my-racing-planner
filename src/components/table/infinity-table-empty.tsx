import { List, Table } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../ui/empty-state";

function InfinityTableEmpty({ cols }: { cols: number }) {
  const { t } = useTranslation();
  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell colSpan={cols} minWidth={"100%"}>
        <EmptyState
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          title={t("empty.noResults")}
          description={t("empty.adjustSearch")}
        >
          <List.Root variant="marker">
            <List.Item>{t("empty.removeFilters")}</List.Item>
            <List.Item>{t("empty.differentCategories")}</List.Item>
          </List.Root>
        </EmptyState>
      </Table.Cell>
    </Table.Row>
  );
}

export default InfinityTableEmpty;
