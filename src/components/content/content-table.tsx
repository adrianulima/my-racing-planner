import { Table, VisuallyHidden } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import InfinityTable from "../table/infinity-table";

type Dict<T = unknown> = Record<string, T>;
function ContentTable<T extends string | number | Dict | undefined>({
  list,
  rows,
  filterButton,
}: {
  list: T[] | readonly T[] | undefined;
  rows: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
  filterButton?: ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <InfinityTable list={list} rows={rows} cols={7}>
      <Table.Row bgColor={"bg.muted"}>
        <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
          {filterButton}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"60px"} textAlign={"center"}>
          <VisuallyHidden>{t("common.contentLogo")}</VisuallyHidden>
        </Table.ColumnHeader>
        <Table.ColumnHeader width={"100%"}>
          {t("common.name")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.includes")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.series")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.category")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.price")}
        </Table.ColumnHeader>
      </Table.Row>
    </InfinityTable>
  );
}

export default ContentTable;
