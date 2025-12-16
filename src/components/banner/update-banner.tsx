import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { hideBanner, useBannerVisibility } from "@/store/notifications";
import { FiX } from "react-icons/fi";

export default function UpdateBanner() {
  const { isVisible } = useBannerVisibility();

  const handleClose = () => {
    hideBanner();
  };

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      top={4}
      left={4}
      right={4}
      maxW="xl"
      mx="auto"
      zIndex={9999}
      bg="red.600"
      color="white"
      py={3}
      px={4}
      boxShadow="lg"
      borderRadius="md"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        align="center"
        justify="space-between"
        gap={4}
      >
        <Text fontSize={{ base: "sm", md: "md" }} fontWeight="medium" flex={1}>
          📢 <strong>Update Notice:</strong> The 2026 season 1 data updates may
          be delayed a few days while we await iRacing OAuth approval. The site
          will remain <strong>completely passwordless</strong> with no iRacing
          login required. In the future, we'll add an <em>optional</em> iRacing
          login to automatically fetch your owned content.
        </Text>
        <IconButton
          aria-label="Close banner"
          onClick={handleClose}
          variant="ghost"
          colorScheme="whiteAlpha"
          size="sm"
          flexShrink={0}
        >
          <FiX />
        </IconButton>
      </Flex>
    </Box>
  );
}
