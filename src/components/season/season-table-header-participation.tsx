import { ownNurbCombined } from "@/ir-data/utils/tracks";
import { TContent } from "@/ir-data/utils/types";
import { useIr } from "@/store/ir";
import { HStack, Text } from "@chakra-ui/react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import TRACKS_JSON from "../../ir-data/tracks.json";
import { Tooltip } from "../ui/tooltip";

const PARTICIPATION_THRESHOLD = 0.66;

function SeasonTableHeaderParticipation({
  seriesTracks,
}: {
  seriesTracks: { [key: string]: number };
}) {
  const { myTracks, wishTracks } = useIr();

  const {
    ownedTracks,
    wishedTracks,
    tracksNeeded,
    enoughTracks,
    enoughTracksWithWish,
  } = useMemo(() => {
    const filteredTracks = Object.fromEntries(
      Object.entries(seriesTracks).filter(
        ([key]) => !key.includes("_cars") && !key.includes("_rainChance"),
      ),
    );

    const tracks = Object.values(filteredTracks)
      .map((trackId) => {
        const track =
          TRACKS_JSON[trackId.toString() as keyof typeof TRACKS_JSON];
        return track;
      })
      .filter(Boolean) as TContent[];

    const tracksNeeded = Math.ceil(tracks.length * PARTICIPATION_THRESHOLD);

    const ownedTracks = tracks.filter(
      (track) =>
        track.free ||
        myTracks.includes(track.sku) ||
        ownNurbCombined(track.id, myTracks),
    ).length;

    const wishedTracks = tracks.filter(
      (track) =>
        wishTracks.includes(track.sku) || ownNurbCombined(track.id, wishTracks),
    ).length;

    return {
      ownedTracks,
      wishedTracks,
      tracksNeeded,
      enoughTracks: ownedTracks >= tracksNeeded,
      enoughTracksWithWish:
        ownedTracks < tracksNeeded &&
        ownedTracks + wishedTracks >= tracksNeeded,
    };
  }, [seriesTracks, myTracks, wishTracks]);

  const color = {
    base: enoughTracks
      ? "green.600"
      : enoughTracksWithWish
      ? "blue.600"
      : "red.600",
    _dark: enoughTracks
      ? "green.400"
      : enoughTracksWithWish
      ? "blue.400"
      : "red.400",
  };

  const bgColor = {
    base: enoughTracks
      ? "green.50"
      : enoughTracksWithWish
      ? "blue.50"
      : "red.50",
    _dark: enoughTracks
      ? "green.800"
      : enoughTracksWithWish
      ? "blue.800"
      : "red.800",
  };

  return (
    <Tooltip
      lazyMount
      unmountOnExit
      content={`Participation credit program: ${enoughTracks ? "Yes" : "No"} (${
        ownedTracks + wishedTracks
      }/${tracksNeeded})`}
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
          {enoughTracks || enoughTracksWithWish ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faXmark} />
          )}{" "}
          {ownedTracks + wishedTracks} / {tracksNeeded}
        </Text>
      </HStack>
    </Tooltip>
  );
}

export default SeasonTableHeaderParticipation;
