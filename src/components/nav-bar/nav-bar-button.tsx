import { Box, Circle, Float, Icon, Text } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "../ui/button";

function NavBarButton({
  icon,
  label,
  selected,
  notification,
  onClick,
  disabled,
  children,
  ...rest
}: ButtonProps & {
  label?: string;
  icon?: IconProp;
  selected?: boolean;
  notification?: boolean;
}) {
  return (
    <Button
      unstyled
      display={"flex"}
      flexDirection={"column"}
      cursor={!disabled ? "pointer" : undefined}
      alignItems={"center"}
      justifyItems={"center"}
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
      {...rest}
    >
      <Box position={"relative"}>
        {icon ? (
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
        ) : (
          children
        )}
        {notification && (
          <Float placement="top-end" offsetX="2" offsetY="2">
            <Circle bg="red" size="10px" />
          </Float>
        )}
      </Box>
      {label && (
        <Text
          userSelect={"none"}
          textAlign={"center"}
          fontSize="10px"
          lineHeight="1.15"
          maxW="76px"
          whiteSpace="normal"
          overflowWrap="anywhere"
          lineClamp={2}
        >
          {label}
        </Text>
      )}
    </Button>
  );
}

export default NavBarButton;
