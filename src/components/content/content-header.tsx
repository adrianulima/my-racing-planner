import { HStack } from "@chakra-ui/react";
import CheckboxCounts from "./checkbox-counts";
import PageHeader from "./page-header";

function ContentHeader({
  title,
  description,
  freeCount,
  ownedCount,
  wishCount,
}: {
  title: string;
  description: string;
  freeCount: number;
  ownedCount: number;
  wishCount: number;
}) {
  return (
    <HStack
      padding={{ base: "unset", md: 4 }}
      justifyContent={"space-between"}
      alignItems={"start"}
    >
      <PageHeader title={title} description={description} />
      <CheckboxCounts
        freeCount={freeCount}
        ownedCount={ownedCount}
        wishCount={wishCount}
      />
    </HStack>
  );
}

export default ContentHeader;