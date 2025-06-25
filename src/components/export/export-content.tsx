import { useIr } from "@/store/ir";
import { Heading, Stack, Text } from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "../ui/button";

function ExportContent() {
  const { myCars, myTracks, wishCars, wishTracks, favoriteSeries } = useIr();
  const queryParams = {
    myCars: myCars.join("-"),
    myTracks: myTracks.join("-"),
    wishCars: wishCars.join("-"),
    wishTracks: wishTracks.join("-"),
    favoriteSeries: favoriteSeries.join("-"),
  };

  const params = new URLSearchParams(queryParams).toString();

  const base = `${window.location.origin}${window.location.pathname}`;
  const url = `${base}?${params}`;
  return (
    <>
      <section>
        <Heading mt={2}>Transfer Your Settings to Another Device</Heading>
        <Text as="p">
          Easily bring your site settings to another device! Just copy the link
          or scan the QR code below to transfer all your preferences instantly.
          No need to set everything up again—just load and go!
        </Text>
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
          title={"Export My Content"}
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
            Copy URL
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
