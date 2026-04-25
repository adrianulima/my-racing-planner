import { useIr } from "@/store/ir";
import { Heading, Stack, Text } from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

function ExportContent() {
  const { t } = useTranslation();
  const { myCars, myTracks, wishCars, wishTracks, favoriteSeries, mySchedule } = useIr();
  const queryParams = {
    myCars: myCars.join("-"),
    myTracks: myTracks.join("-"),
    wishCars: wishCars.join("-"),
    wishTracks: wishTracks.join("-"),
    favoriteSeries: favoriteSeries.join("-"),
    mySchedule: mySchedule.join(","),
  };

  const params = new URLSearchParams(queryParams).toString();

  const base = `${window.location.origin}${window.location.pathname}`;
  const url = `${base}?${params}`;
  return (
    <>
      <section>
        <Heading mt={2}>{t("export.heading")}</Heading>
        <Text as="p">{t("export.description")}</Text>
      </section>

      <Stack
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        pt={6}
        gap={6}
      >
        <QRCodeSVG
          value={url}
          size={220}
          title={t("dialogs.exportTitle")}
          marginSize={5}
          imageSettings={{
            src: "/my-racing-planner-icon.svg",
            width: 50,
            height: 50,
            excavate: true,
          }}
        />
        <Button
          variant={"subtle"}
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
        >
          <span>
            {t("export.copyUrl")}
            <FontAwesomeIcon icon={faCopy} />
          </span>
        </Button>
        <Text
          fontWeight={"medium"}
          textAlign={"center"}
          wordWrap={"break-word"}
          lineBreak={"anywhere"}
        >
          {url}
        </Text>
      </Stack>
    </>
  );
}

export default ExportContent;
