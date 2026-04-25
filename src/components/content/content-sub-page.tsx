import { ETabs } from "@/store/ui";
import { Stack, StackProps, Tabs, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

enum ETabContent {
  Cars = "Cars",
  Tracks = "Tracks",
}

function ContentSubPage({ ...props }: StackProps) {
  const [location, navigate] = useLocation();
  const { t } = useTranslation();
  const page =
    location === ETabs.MyCars ? ETabContent.Cars : ETabContent.Tracks;
  return (
    <Stack {...props}>
      <Tabs.Root
        size={"sm"}
        variant={"enclosed"}
        width={"100%"}
        flex={1}
        value={page}
        onValueChange={(e) =>
          navigate(e.value === ETabContent.Cars ? ETabs.MyCars : ETabs.MyTracks)
        }
      >
        <Tabs.List flex={1} width={"100%"}>
          <Tabs.Trigger value={ETabContent.Cars} width={"100%"}>
            <Text textWrap={"nowrap"} userSelect={"none"} truncate>
              {t("common.cars")}
            </Text>
          </Tabs.Trigger>
          <Tabs.Trigger value={ETabContent.Tracks} width={"100%"}>
            <Text textWrap={"nowrap"} userSelect={"none"} truncate>
              {t("common.tracks")}
            </Text>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Stack>
  );
}

export default ContentSubPage;
