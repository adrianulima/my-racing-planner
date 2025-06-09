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
import { DialogRootProps } from "@chakra-ui/react";
import { lazy, Suspense, useState } from "react";
import LoadingContainer from "../page/loading-container";
const AboutContent = lazy(() => import("./about-content"));

function AboutDialog({ children, ...rest }: DialogRootProps) {
  const [open, setOpen] = useState(false);
  const { width } = useScreenSize();
  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => {
        (document.activeElement as HTMLElement).blur();
        setOpen(e.open);
      }}
      size={width.lg ? "xl" : width.md ? "lg" : "full"}
      scrollBehavior="inside"
      placement="center"
      motionPreset="slide-in-bottom"
      {...rest}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent full={!width.md}>
        <DialogHeader textAlign={"center"}>
          <DialogTitle>Racing Planner (v{APP_VERSION})</DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: 4, md: 10 }} textAlign={"justify"}>
          <Suspense fallback={<LoadingContainer />}>
            <AboutContent />
          </Suspense>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default AboutDialog;
