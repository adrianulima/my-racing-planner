import { Card, HStack, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered, faClock } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import type { DetailData } from "./use-detail-data";

function DetailInsights({ data }: { data: DetailData }) {
  const { type, totalWeekCount } = data;
  const { t } = useTranslation();
  const seriesCount = data.entries.length;

  return (
    <Card.Root variant={"outline"} height={"100%"}>
      <Card.Body>
        <VStack gap={3} justify={"center"} height={"100%"} alignItems={"flex-start"}>
          <HStack gap={3}>
            <FontAwesomeIcon icon={faFlagCheckered} size="lg" />
            <Text fontSize={"2xl"} fontWeight={"bold"}>{seriesCount}</Text>
            <Text fontSize={"sm"} color={"fg.muted"}>{t("common.series")}</Text>
          </HStack>
          <HStack gap={3}>
            <FontAwesomeIcon icon={faClock} size="lg" />
            <Text fontSize={"2xl"} fontWeight={"bold"}>{totalWeekCount}</Text>
            <Text fontSize={"sm"} color={"fg.muted"}>
              {type === "cars" ? t("common.weeksRaced") : t("common.weeksUsed")}
            </Text>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}

export default DetailInsights;
