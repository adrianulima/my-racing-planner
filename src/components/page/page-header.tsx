import useScreenSize from "@/hooks/useScreenSize";
import { Collapsible, HStack, Stack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useAppLayout } from "../app/useAppLayout";
import CheckboxCounts from "./checkbox-counts";
import PageTitle from "./page-title";

function PageHeader({
  title,
  description,
  freeCount,
  ownedCount,
  wishCount,
  children,
}: PropsWithChildren<{
  title: string;
  description: string;
  freeCount?: number | string;
  ownedCount?: number | string;
  wishCount?: number | string;
}>) {
  const { scrolled } = useAppLayout();
  const { height } = useScreenSize();
  const ifNotSmall = (value: any) => (height.small ? undefined : value);
  const showCounts =
    freeCount != undefined || ownedCount != undefined || wishCount != undefined;
  return (
    <Collapsible.Root open={!scrolled}>
      <Collapsible.Content>
        <Stack gap={1} pb={2}>
          <HStack
            padding={{ base: "unset", md: ifNotSmall(4) }}
            justifyContent={"space-between"}
            alignItems={"start"}
          >
            <PageTitle title={title} description={description} />
            {showCounts && (
              <CheckboxCounts
                freeCount={freeCount ?? 0}
                ownedCount={ownedCount ?? 0}
                wishCount={wishCount ?? 0}
              />
            )}
          </HStack>
          {children}
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default PageHeader;
