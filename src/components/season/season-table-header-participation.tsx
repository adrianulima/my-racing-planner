import { ownNurbCombined } from "@/ir-data/utils/tracks";
import { useIr } from "@/store/ir";
import { HStack, Text } from "@chakra-ui/react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TRACKS_JSON from "../../ir-data/tracks.json";
import { Tooltip } from "../ui/tooltip";

function SeasonTableHeaderParticipation({
  seriesTracks,
}: {
  seriesTracks: { [key: string]: number };
}) {
  const { myTracks } = useIr();
  Object.keys(seriesTracks).forEach((key) => {
    if (key.includes("_cars")) {
      delete seriesTracks[key];
    }
  });
  const tracks = Object.values(seriesTracks).map(
    (trackId) => TRACKS_JSON[trackId.toString() as keyof typeof TRACKS_JSON],
  );
  const tracksNeeded = Math.ceil(tracks.length * 0.66);
  const numberOfTracks = tracks.filter(
    (track: any) =>
      track.free ||
      myTracks.includes(track.sku) ||
      ownNurbCombined(track.id, myTracks),
  ).length;
  const enoughTracks = numberOfTracks >= tracksNeeded;
  const color = {
    base: enoughTracks ? "green.600" : "red.600",
    _dark: enoughTracks ? "green.400" : "red.400",
  };
  const bgColor = {
    base: enoughTracks ? "green.50" : "red.50",
    _dark: enoughTracks ? "green.800" : "red.800",
  };

  return (
    <Tooltip
      lazyMount
      unmountOnExit
      content={`Participation credit program: ${enoughTracks ? "Yes" : "No"
        } (${numberOfTracks}/${tracksNeeded})`}
      showArrow
      positioning={{ placement: "bottom" }}
      openDelay={200}
      closeDelay={100}
    >
      <HStack
        textStyle={"xs"}
        color={color}
        bgColor={bgColor}
        justifyContent={"center"}
        position={"absolute"}
        left={0}
        right={0}
        bottom={0.5}
        px={2}
      >
        <Text>
          {enoughTracks ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faXmark} />
          )}{" "}
          {numberOfTracks} / {tracksNeeded}
        </Text>
      </HStack>
    </Tooltip>
  );
}

export default SeasonTableHeaderParticipation;
