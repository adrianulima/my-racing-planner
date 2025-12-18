import { Flex, Stack } from "@chakra-ui/react";
import TransferContentDialog from "../export/tranfer-content-dialog";
import MainContainer from "../main-container/main-container";
import BottomNavBar from "../nav-bar/bottom-nav-bar";
import NavBar from "../nav-bar/nav-bar";
import TopBar from "../top-bar/top-bar";
import AppLayoutContextProvider from "./app-layout-context";

function App() {
  return (
    <Flex
      background={{ base: "irbg.light", _dark: "irbg.dark" }}
      width="100vw"
      height="100dvh"
      paddingTop={"env(safe-area-inset-top)"}
      direction={{ base: "column", md: "row" }}
    >
      <AppLayoutContextProvider>
        <NavBar zIndex={10} hideBelow="md" minW="80px" height="100%" />
        <Stack
          maxH="100%"
          height="100%"
          maxW={"calc(100%-80px)"}
          flex={1}
          overflowX={"auto"}
          padding={{ base: "0", md: "12px" }}
          paddingLeft={{ base: "0", md: "80px" }}
          marginLeft={{ base: "0", md: "-80px" }}
          gap={0}
        >
          <TopBar hideBelow="md" />
          <MainContainer />
        </Stack>
      </AppLayoutContextProvider>
      <BottomNavBar hideFrom="md" />

      <TransferContentDialog />
    </Flex>
  );
}

export default App;
