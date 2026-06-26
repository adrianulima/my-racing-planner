import {
  Box,
  Flex,
  HStack,
  IconButton,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFlagCheckered,
  faGears,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "wouter";
import useDetailData from "./use-detail-data";
import SeasonSettingsPopover from "../season/season-settings-popover";
import Page from "../page/page";
import DetailHeader from "./detail-header";
import DetailInsights from "./detail-insights";
import DetailSeriesTable from "./detail-series-table";
import DetailCalendarGrid from "./detail-calendar-grid";
import DetailCalendarTracks from "./detail-calendar-tracks";

function DetailPage({ type }: { type: "cars" | "tracks" }) {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { t } = useTranslation();
  const numId = parseInt(id, 10);

  const data = useDetailData(type, numId);

  if (!data || !data.item) {
    return (
      <Page>
        <VStack gap={4} p={8} textAlign={"center"}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {t("detail.notFound")}
          </Text>
          <Text color={"fg.muted"}>
            {t("detail.notFoundDescription")}
          </Text>
        </VStack>
      </Page>
    );
  }

  const backPath = type === "cars" ? "/cars" : "/tracks";

  return (
    <Page>
      <VStack gap={4} alignItems={"start"} width={"100%"} overflow={"auto"} pb={4}>
        <HStack
          cursor={"pointer"}
          onClick={() => navigate(backPath)}
          color={"fg.muted"}
          _hover={{ color: "fg" }}
          fontSize={"sm"}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <Text>
            {t("common.backTo")} {type === "cars" ? t("pages.cars.title") : t("pages.tracks.title")}
          </Text>
        </HStack>

        <Flex gap={4} width={"100%"} wrap={"wrap"} justify={"flex-start"}>
          <Box flex={"0 1 auto"} minW={"340px"} maxW={"500px"}>
            <DetailHeader data={data} />
          </Box>
          <Box flex={"0 1 auto"} minW={"260px"} maxW={"400px"}>
            <DetailInsights data={data} />
          </Box>
        </Flex>

        <Tabs.Root defaultValue={"series"} variant={"enclosed"} width={"100%"}>
          <Tabs.List>
            <Tabs.Trigger value={"series"}>
              <FontAwesomeIcon icon={faFlagCheckered} />
              <Text ml={1}>{t("common.series")} ({data.entries.length})</Text>
            </Tabs.Trigger>
            <Tabs.Trigger value={"calendar"}>
              <FontAwesomeIcon icon={faRoad} />
              <Text ml={1}>{t("common.calendar")}</Text>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value={"series"} pt={3}>
            {data.entries.length > 0 ? (
              <DetailSeriesTable type={type} entries={data.entries} />
            ) : (
              <Text color={"fg.muted"} p={4} textAlign={"center"}>
                {t("detail.noSeries")}
              </Text>
            )}
          </Tabs.Content>

          <Tabs.Content value={"calendar"} pt={3}>
            <Flex justify={"flex-start"} mb={2}>
              <PopoverRoot positioning={{ placement: "left-start" }}>
                <PopoverTrigger asChild>
                  <IconButton
                    aria-label={t("common.settings")}
                    variant={"outline"}
                    size={"lg"}
                    bgColor={{ base: "bg.muted", _hover: "bg" }}
                    borderRadius={"md"}
                  >
                    <FontAwesomeIcon icon={faGears} />
                  </IconButton>
                </PopoverTrigger>
                <PopoverContent>
                  <SeasonSettingsPopover />
                </PopoverContent>
              </PopoverRoot>
            </Flex>
            {data.entries.length > 0 ? (
              type === "tracks" ? (
                <DetailCalendarTracks entries={data.entries} />
              ) : (
                <DetailCalendarGrid entries={data.entries} />
              )
            ) : (
              <Text color={"fg.muted"} p={4} textAlign={"center"}>
                {t("detail.noSeries")}
              </Text>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Page>
  );
}

export default DetailPage;
