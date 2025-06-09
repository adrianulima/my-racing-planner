import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useScreenSize from "@/hooks/useScreenSize";
import { ETabs, setHelpPresented, useUi } from "@/store/ui";
import { DialogRootProps } from "@chakra-ui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import LoadingContainer from "../page/loading-container";
const HelpContent = lazy(() => import("./help-content"));

function HelpDialog({ children, ...rest }: DialogRootProps) {
  const query = useSearch();
  const { helpPresented } = useUi();
  const [isOpen, setIsOpen] = useState(!query && !helpPresented);
  const { width } = useScreenSize();
  const [_, navigate] = useLocation();

  useEffect(() => {
    if (!query && !helpPresented) {
      setIsOpen(true);
      setHelpPresented(true);
      navigate(ETabs.MySeries);
    }
  }, [query, helpPresented]);

  return (
    <DialogRoot
      lazyMount
      unmountOnExit
      open={isOpen}
      onOpenChange={(e) => {
        (document.activeElement as HTMLElement).blur();
        setIsOpen(e.open);
      }}
      size={width.lg ? "xl" : width.md ? "lg" : "full"}
      scrollBehavior="inside"
      placement="center"
      motionPreset="slide-in-bottom"
      {...rest}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader textAlign={"center"}>
          <DialogTitle>Welcome to Racing Planner</DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: 4, md: 10 }} textAlign={"justify"}>
          <Suspense fallback={<LoadingContainer />}>
            <HelpContent />
          </Suspense>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default HelpDialog;
