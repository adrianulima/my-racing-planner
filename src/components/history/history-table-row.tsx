import { CategoryIcon } from "@/ir-data/utils/icons";
import { Category } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import { Badge, Center, For, Image, Table, Text } from "@chakra-ui/react";
import ContentCheckbox from "../content/content-checkbox";
import ContentNameBadge from "../content/content-name-badge";
import { Tooltip } from "../ui/tooltip";
import { useTranslation } from "react-i18next";
import { getCategoryTranslationKey } from "@/i18n/category";

function HistoryTableRow({
  id,
  sku,
  count,
  name,
  logo,
  free,
  owned,
  wish,
  categories,
  released,
  usagePerYear,
}: {
  id: number;
  sku: number;
  name: string;
  count: number;
  logo?: string;
  free: boolean;
  owned: boolean;
  wish: boolean;
  categories: string[];
  released: number;
  usagePerYear: number;
}) {
  const { t } = useTranslation();
  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell minWidth={"40px"} textAlign={"center"}>
        <ContentCheckbox
          content={"tracks"}
          contentId={id}
          sku={sku}
          free={free}
          owned={owned}
          wish={wish}
        />
      </Table.Cell>
      <Table.Cell minWidth={"60px"} textAlign={"center"}>
        {logo && (
          <Center>
            <Tooltip
              lazyMount
              unmountOnExit
              key={logo}
              content={
                <Image
                  loading="lazy"
                  userSelect={"none"}
                  draggable={false}
                  h={"80px"}
                  w={"160px"}
                  fit="contain"
                  src={`${IR_URL.image}${logo}`}
                />
              }
              showArrow
              positioning={{ placement: "top" }}
              openDelay={200}
              closeDelay={100}
            >
              <Image
                loading="lazy"
                userSelect={"none"}
                draggable={false}
                h="24px"
                fit="contain"
                src={`${IR_URL.image}${logo}`}
              />
            </Tooltip>
          </Center>
        )}
      </Table.Cell>
      <Table.Cell width={"100%"}>
        <ContentNameBadge name={name} />
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <For
          each={categories}
          children={(category, i) => (
            <Tooltip
              lazyMount
              unmountOnExit
              key={`${category}`}
              content={t(getCategoryTranslationKey(Category[category as keyof typeof Category]))}
              showArrow
              positioning={{ placement: "top" }}
              openDelay={200}
              closeDelay={100}
            >
              <CategoryIcon
                fontSize="16px"
                ml={i > 0 ? "6px" : undefined}
                category={category}
              />
            </Tooltip>
          )}
        />
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <Text>{released}</Text>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <Badge variant={"solid"} _light={{ bg: "gray.600" }}>
          {usagePerYear.toFixed(1)}
        </Badge>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <Text fontWeight={"bold"}>{count}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default HistoryTableRow;
