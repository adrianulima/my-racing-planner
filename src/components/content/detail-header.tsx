import {
  Badge,
  Center,
  For,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IR_URL } from "@/ir-data/utils/urls";
import { CategoryIcon } from "@/ir-data/utils/icons";
import { Category } from "@/ir-data/utils/types";
import { getCategoryTranslationKey } from "@/i18n/category";
import { useTranslation } from "react-i18next";
import ContentCheckbox from "./content-checkbox";
import PriceBadge from "../badges/price-badge";
import type { DetailData } from "./use-detail-data";

import { useState } from "react";

function DetailHeader({ data }: { data: DetailData }) {
  const { item, type, owned, wish } = data;
  const { t } = useTranslation();
  const [logoError, setLogoError] = useState(false);
  return (
    <HStack
      gap={4}
      p={4}
      bg={"bg.subtle"}
      borderRadius={"lg"}
      borderWidth={1}
      borderColor={"border"}
      alignItems={"start"}
      flexWrap={"wrap"}
    >
      {item.logo && !logoError && (
        <Center
          minW={"160px"}
          minH={"80px"}
          bg={"bg.panel"}
          borderRadius={"md"}
          p={2}
        >
          <Image
            loading="lazy"
            userSelect={"none"}
            draggable={false}
            h={"80px"}
            w={"160px"}
            fit="contain"
            src={`${IR_URL.image}${item.logo}`}
            onError={() => setLogoError(true)}
          />
        </Center>
      )}
      <VStack alignItems={"start"} gap={1.5} flex={1}>
        <HStack gap={2} flexWrap={"wrap"}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {item.name}
          </Text>
          {item.config && (
            <Badge colorPalette={"gray"} variant={"subtle"}>
              {item.config}
            </Badge>
          )}
        </HStack>
        {item.skuGroup && (
          <Text fontSize={"sm"} color={"fg.muted"}>
            {Object.values(item.skuGroup).join(" · ")}
          </Text>
        )}
        <HStack gap={2} flexWrap={"wrap"}>
          <PriceBadge price={item.price} />
          <For
            each={item.categories}
            children={(category) => (
              <HStack key={category} gap={1}>
                <CategoryIcon fontSize="14px" category={category} />
                <Text fontSize={"sm"} color={"fg.muted"}>
                  {t(getCategoryTranslationKey(Category[category as keyof typeof Category]))}
                </Text>
              </HStack>
            )}
          />
        </HStack>
        <Text fontSize={"xs"} color={"fg.muted"}>
          SKU: {item.sku}
        </Text>
        <ContentCheckbox
          content={type}
          contentId={item.id}
          sku={item.sku}
          free={item.free}
          owned={owned}
          wish={wish}
        />
      </VStack>
    </HStack>
  );
}

export default DetailHeader;
