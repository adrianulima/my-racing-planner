import { ESortHistory } from "@/ir-data/utils/history";
import { HStack, Table, Text, VisuallyHidden } from "@chakra-ui/react";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import InfinityTable from "../table/infinity-table";

type Dict<T = unknown> = Record<string, T>;
function HistoryTable<T extends string | number | Dict | undefined>({
  list,
  rows,
  sortBy,
  setSortBy,
}: {
  list: T[] | readonly T[] | undefined;
  rows: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
  sortBy: ESortHistory;
  setSortBy: (v: ESortHistory) => void;
}) {
  const { t } = useTranslation();
  const boldIf = (value: ESortHistory) =>
    sortBy === value ? "bold" : undefined;
  return (
    <InfinityTable list={list} rows={rows} cols={7}>
      <Table.Row bgColor={"bg.muted"}>
        <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
          <VisuallyHidden>{t("common.ownedContentCheckbox")}</VisuallyHidden>
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"60px"} textAlign={"center"}>
          <VisuallyHidden>{t("common.contentLogo")}</VisuallyHidden>
        </Table.ColumnHeader>
        <Table.ColumnHeader width={"100%"}>
          {t("common.name")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.category")}
        </Table.ColumnHeader>
        <Table.ColumnHeader
          minWidth={"90px"}
          textAlign={"center"}
          cursor={"pointer"}
          onClick={() => setSortBy(ESortHistory.Released)}
        >
          <HStack gap={1} justifyContent={"center"}>
            <Text fontWeight={boldIf(ESortHistory.Released)}>
              {t("common.released")}
            </Text>
            {sortBy === ESortHistory.Released && (
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            )}
          </HStack>
        </Table.ColumnHeader>
        <Table.ColumnHeader
          minWidth={"90px"}
          textAlign={"center"}
          cursor={"pointer"}
          onClick={() => setSortBy(ESortHistory.UsagePerYear)}
        >
          <HStack gap={1} justifyContent={"center"}>
            <Text fontWeight={boldIf(ESortHistory.UsagePerYear)}>
              {t("common.usagePerYear")}
            </Text>
            {sortBy === ESortHistory.UsagePerYear && (
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            )}
          </HStack>
        </Table.ColumnHeader>
        <Table.ColumnHeader
          minWidth={"90px"}
          textAlign={"center"}
          cursor={"pointer"}
          onClick={() => setSortBy(ESortHistory.Usage)}
        >
          <HStack gap={1} justifyContent={"center"}>
            <Text fontWeight={boldIf(ESortHistory.Usage)}>
              {t("common.used")}
            </Text>
            {sortBy === ESortHistory.Usage && (
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            )}
          </HStack>
        </Table.ColumnHeader>
      </Table.Row>
    </InfinityTable>
  );
}

export default HistoryTable;
