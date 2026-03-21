import {
  PopoverArrow,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoryIcon } from "@/ir-data/utils/icons";
import { Category } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import {
  Badge,
  Center,
  For,
  HStack,
  Image,
  Table,
  Text,
} from "@chakra-ui/react";
import {
  faCaretDown,
  faFlagCheckered,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PriceBadge from "../badges/price-badge";
import SeriesPopover from "../series/series-popover";
import { Tooltip } from "../ui/tooltip";
import ContentCheckbox from "./content-checkbox";
import ContentNameBadge from "./content-name-badge";

function ContentTableRow({
  content,
  id,
  sku,
  price,
  name,
  logo,
  categories,
  free,
  skuGroup,
  series,
  skuIcon,
  owned,
  wish,
}: {
  content: "cars" | "tracks";
  id: number;
  sku: number;
  price: number;
  name: string;
  logo?: string;
  categories: string[];
  free: boolean;
  owned: boolean;
  wish: boolean;
  skuGroup?: { [key: string]: string };
  series?: number[];
  skuIcon: IconDefinition;
}) {
  const skuItems = skuGroup ? Object.values(skuGroup) : [];
  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell minWidth={"40px"} textAlign={"center"}>
        <ContentCheckbox
          content={content}
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
        {skuGroup && (
          <Tooltip
            lazyMount
            unmountOnExit
            content={skuItems.map((c) => (
              <Text key={c} as="p">
                {c}
              </Text>
            ))}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
          >
            <Badge variant={"solid"} _light={{ bg: "gray.600" }}>
              <FontAwesomeIcon icon={skuIcon} size="sm" />
              {skuItems.length}
            </Badge>
          </Tooltip>
        )}
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        {series && (
          <PopoverRoot lazyMount unmountOnExit>
            <PopoverTrigger asChild>
              <HStack gap={1} justifyContent={"center"} cursor={"pointer"}>
                <FontAwesomeIcon icon={faFlagCheckered} />
                {series.length}
                <FontAwesomeIcon icon={faCaretDown} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent p={2}>
              <PopoverArrow />
              <SeriesPopover id={id} content={content} />
            </PopoverContent>
          </PopoverRoot>
        )}
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <For
          each={categories}
          children={(category, i) => (
            <Tooltip
              lazyMount
              unmountOnExit
              key={`${category}`}
              content={Category[category as keyof typeof Category]}
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
        <PriceBadge price={price} />
      </Table.Cell>
    </Table.Row>
  );
}

export default ContentTableRow;
