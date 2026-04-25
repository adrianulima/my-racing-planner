import { Table, VisuallyHidden } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import InfinityTable from "../table/infinity-table";

type Dict<T = unknown> = Record<string, T>;
function SeriesTable<T extends string | number | Dict | undefined>({
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
    <InfinityTable list={list} rows={rows} cols={9}>
      <Table.Row bgColor={"bg.muted"}>
        <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
          {filterButton}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"60px"} textAlign={"center"}>
          <VisuallyHidden>{t("common.seriesLogo")}</VisuallyHidden>
        </Table.ColumnHeader>
        <Table.ColumnHeader width={"100%"}>
          {t("common.name")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.setup")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.cars")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.tracks")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.category")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.duration")}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          {t("common.license")}
        </Table.ColumnHeader>
      </Table.Row>
    </InfinityTable>
  );
}

export default SeriesTable;
