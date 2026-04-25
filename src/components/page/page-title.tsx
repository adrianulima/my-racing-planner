import useScreenSize from "@/hooks/useScreenSize";
import { Heading, Stack, StackProps, Text } from "@chakra-ui/react";

function PageTitle({
  title,
  description,
  ...rest
}: StackProps & {
  title: string;
  description: string;
}) {
  const { height } = useScreenSize();
  const ifNotSmall = <T,>(value: T) => (height.small ? undefined : value);
  return (
    <Stack pl={{ base: "0.5rem", md: ifNotSmall("unset") }} gap={0} {...rest}>
      <Heading
        size={{ base: "2xl", md: ifNotSmall("4xl") }}
        fontFamily="mono"
        fontWeight="bold"
        userSelect={"none"}
      >
        {title}
      </Heading>
      <Text fontSize={{ base: "xs", md: "unset" }} userSelect={"none"}>
        {description}
      </Text>
    </Stack>
  );
}

export default PageTitle;
