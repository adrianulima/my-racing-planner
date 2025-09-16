import useScreenSize from "@/hooks/useScreenSize";
import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import { faSackXmark, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";

function CheckboxCounts({
  freeCount,
  ownedCount,
  wishCount,
}: {
  freeCount: number | string;
  ownedCount: number | string;
  wishCount: number | string;
}) {
  const { height } = useScreenSize();
  const ifNotSmall = (value: any) => (height.small ? undefined : value);
  return (
    <Stack gap={{ base: "4px", md: ifNotSmall("8px") }}>
      <Tooltip
        lazyMount
        unmountOnExit
        content={"Available for free with an iRacing subscription"}
        showArrow
        positioning={{ placement: "left" }}
        openDelay={200}
        closeDelay={100}
      >
        <HStack gap={{ base: "4px", md: ifNotSmall("8px") }}>
          <HStack justifyContent={"end"} minW={"65px"}>
            <Badge
              size={{ base: "xs", md: ifNotSmall("sm") }}
              variant="solid"
              minWidth={{ base: "24px", md: ifNotSmall("28px") }}
              justifyContent={"center"}
              colorPalette={"green"}
            >
              {freeCount}
            </Badge>
          </HStack>
          <Checkbox
            size={{ base: "sm", md: ifNotSmall("md") }}
            readOnly={true}
            colorPalette={"green"}
            checked={true}
            icon={<FontAwesomeIcon size={"xs"} icon={faSackXmark} />}
          >
            <Text hideBelow={"md"}>Free</Text>
          </Checkbox>
        </HStack>
      </Tooltip>
      <Tooltip
        lazyMount
        unmountOnExit
        content={"Content you already purchased"}
        showArrow
        positioning={{ placement: "left" }}
        openDelay={200}
        closeDelay={100}
      >
        <HStack gap={{ base: "4px", md: ifNotSmall("8px") }}>
          <HStack justifyContent={"end"} minW={"65px"}>
            <Badge
              size={{ base: "xs", md: ifNotSmall("sm") }}
              variant="solid"
              minWidth={{ base: "24px", md: ifNotSmall("28px") }}
              justifyContent={"center"}
            >
              {ownedCount}
            </Badge>
          </HStack>
          <Checkbox
            size={{ base: "sm", md: ifNotSmall("md") }}
            readOnly={true}
            checked={true}
          >
            <Text hideBelow={"md"}>Owned</Text>
          </Checkbox>
        </HStack>
      </Tooltip>
      <Tooltip
        lazyMount
        unmountOnExit
        content={
          "Content you wish to buy, select to preview it in your season planner"
        }
        showArrow
        positioning={{ placement: "left" }}
        openDelay={200}
        closeDelay={100}
      >
        <HStack gap={{ base: "4px", md: ifNotSmall("8px") }}>
          <HStack justifyContent={"end"} minW={"65px"}>
            <Badge
              size={{ base: "xs", md: ifNotSmall("sm") }}
              variant="solid"
              minWidth={{ base: "24px", md: ifNotSmall("28px") }}
              justifyContent={"center"}
              colorPalette={"blue"}
            >
              {wishCount}
            </Badge>
          </HStack>
          <Checkbox
            size={{ base: "sm", md: ifNotSmall("md") }}
            readOnly={true}
            colorPalette={"blue"}
            checked={true}
            icon={<FontAwesomeIcon size={"xs"} icon={faBookmark} />}
          >
            <Text hideBelow={"md"}>Wishlist</Text>
          </Checkbox>
        </HStack>
      </Tooltip>
    </Stack>
  );
}

export default CheckboxCounts;
