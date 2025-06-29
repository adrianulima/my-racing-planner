import { darkenHexColor, lightenHexColor } from "@/utils/color";
import { Badge, BadgeProps } from "@chakra-ui/react";

function LicenseBadge({
  letter,
  color,
  themeInverted,
  ...rest
}: BadgeProps & {
  letter: string;
  color: string;
  themeInverted?: boolean;
}) {
  const dark = darkenHexColor(`#${color}`, 0.3);
  const light = lightenHexColor(`#${color}`, 0.7);
  return (
    <Badge
      bg={{
        base: !themeInverted ? light : dark,
        _dark: !themeInverted ? dark : light,
      }}
      color={{
        base: !themeInverted ? dark : light,
        _dark: !themeInverted ? light : dark,
      }}
      borderColor={`#${color}`}
      borderWidth={1}
      fontWeight={"bold"}
      {...rest}
    >
      {letter}
    </Badge>
  );
}

export default LicenseBadge;
