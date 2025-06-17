import {
  NURB_COMBINED_IDS,
  ownNurbCombined,
  wishNurbCombined,
} from "@/ir-data/utils/tracks";
import { useIr } from "@/store/ir";
import { Box, Icon, IconProps, Text } from "@chakra-ui/react";
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";

import { Tooltip } from "../ui/tooltip";

const sizes = {
  xs: "12px",
  sm: "17px",
  md: "22px",
  lg: "30px",
};

function NurbInfoIcon({
  size,
  ...rest
}: IconProps & { size?: "xs" | "sm" | "md" | "lg" }) {
  const px = sizes[size as keyof typeof sizes] ?? sizes["md"];
  const { myTracks, wishTracks } = useIr();
  const owned = ownNurbCombined(NURB_COMBINED_IDS[0], myTracks);
  const wish = wishNurbCombined(NURB_COMBINED_IDS[0], wishTracks, myTracks);
  return (
    <Tooltip
      lazyMount
      unmountOnExit
      content={
        <Text textAlign={"center"} lineClamp="10" wordWrap={"break-word"}>
          Nürburgring Combined is the combination of both the Nürburgring Grand
          Prix Strecke and Nürburgring Nordschleife. In order to have access to
          it you must own both tracks.
        </Text>
      }
      showArrow
      positioning={{ placement: "top" }}
      openDelay={200}
      closeDelay={100}
    >
      <Icon
        height={px}
        width={px}
        alignItems={"center"}
        justifyContent={"center"}
        color={wish ? "blue.solid" : !owned ? "gray.500" : undefined}
        {...rest}
      >
        <Box>
          {owned || wish ? (
            <BsInfoCircleFill size={"100%"} />
          ) : (
            <BsInfoCircle size={"100%"} />
          )}
        </Box>
      </Icon>
    </Tooltip>
  );
}

export default NurbInfoIcon;
