import { Badge, Text, type TextProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const patterns = {
  "[Retired] ": "Retired",
  "[Legacy] ": "Legacy",
};

function NameWithBadges({ name }: { name: string }) {
  const badge = Object.keys(patterns).find((k) =>
    name.includes(k),
  ) as keyof typeof patterns;
  if (badge) {
    return (
      <>
        <Badge colorPalette="yellow" mr={1}>
          {patterns[badge]}
        </Badge>
        {name.replace(badge, "")}
      </>
    );
  }
  return name;
}

function ContentNameBadge({
  name,
  children,
  ...rest
}: PropsWithChildren<{ name: string } & TextProps>) {
  return (
    <Text fontWeight={"bold"} truncate {...rest}>
      {children}
      <NameWithBadges name={name} />
    </Text>
  );
}

export default ContentNameBadge;
