import { ESortHistory } from "@/ir-data/utils/history";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HStack,
  IconButton,
  Table,
  Text,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  faArrowDownWideShort,
  faFilter,
  faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import InfinityTable from "../table/infinity-table";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";

type Dict<T = unknown> = Record<string, T>;
function HistoryTable<T extends string | number | Dict | undefined>({
  list,
  rows,
  sortBy,
  setSortBy,
  ownershipFilter,
  onOwnershipFilterChange,
}: {
  list: T[] | readonly T[] | undefined;
  rows: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
  sortBy: ESortHistory;
  setSortBy: (v: ESortHistory) => void;
  ownershipFilter: string[];
  onOwnershipFilterChange: (v: string[]) => void;
}) {
  const { t } = useTranslation();
  const boldIf = (value: ESortHistory) =>
    sortBy === value ? "bold" : undefined;
  const hasFilter = ownershipFilter.length > 0;

  const toggleFilter = (value: string) => {
    if (ownershipFilter.includes(value)) {
      onOwnershipFilterChange(ownershipFilter.filter((v) => v !== value));
    } else {
      onOwnershipFilterChange([...ownershipFilter, value]);
    }
  };
  return (
    <InfinityTable list={list} rows={rows} cols={7}>
      <Table.Row bgColor={"bg.muted"}>
        <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
          <PopoverRoot>
            <PopoverTrigger asChild>
              <IconButton
                aria-label={t("filters.ownership")}
                variant={hasFilter ? "solid" : "ghost"}
                size={"xs"}
                colorPalette={hasFilter ? "blue" : undefined}
              >
                <FontAwesomeIcon
                  icon={hasFilter ? faFilterCircleXmark : faFilter}
                />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent width={"auto"}>
              <VStack alignItems={"start"} p={2}>
                <Checkbox
                  checked={ownershipFilter.includes("owned")}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFilter("owned");
                  }}
                >
                  {t("common.owned")}
                </Checkbox>
                <Checkbox
                  checked={ownershipFilter.includes("not_owned")}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFilter("not_owned");
                  }}
                >
                  {t("common.notOwned")}
                </Checkbox>
                <Checkbox
                  checked={ownershipFilter.includes("free")}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFilter("free");
                  }}
                >
                  {t("common.free")}
                </Checkbox>
              </VStack>
            </PopoverContent>
          </PopoverRoot>
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
