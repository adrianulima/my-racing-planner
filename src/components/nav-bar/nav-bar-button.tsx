import { Icon, Stack, Text } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBarButton({
  icon,
  label,
  selected,
  onClick,
  disabled,
}: {
  label: string;
  icon: IconProp;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  disabled?: boolean;
}) {
  return (
    <Stack
      as={"button"}
      cursor={!disabled ? "pointer" : undefined}
      alignItems={"center"}
      gap={"0"}
      opacity={disabled ? 0.4 : undefined}
      color={
        !disabled && selected
          ? { base: "blue.900", _dark: "blue.300" }
          : undefined
      }
      onClick={!disabled ? onClick : undefined}
      fontWeight={selected ? "semibold" : "medium"}
      _hover={
        !disabled && !selected
          ? {
              color: {
                base: "gray.900",
                _dark: "gray.100",
              },
              fontWeight: "semibold",
            }
          : undefined
      }
    >
      <Icon
        height={"22px"}
        width={"22px"}
        borderRadius={"6px"}
        alignItems={"center"}
        justifyContent={"center"}
        bg={selected ? "blue.600/40" : "transparent"}
        _hover={!disabled && !selected ? { bg: "gray.400/30" } : undefined}
        p={"6px"}
        userSelect={"none"}
      >
        <FontAwesomeIcon icon={icon} />
      </Icon>
      <Text userSelect={"none"} textAlign={"center"} fontSize="10px">
        {label}
      </Text>
    </Stack>
  );
}

export default NavBarButton;
