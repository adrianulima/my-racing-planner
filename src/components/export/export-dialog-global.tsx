import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import useScreenSize from "@/hooks/useScreenSize";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { setExportDialogOpen, useExportDialog } from "./export-dialog-store";
import LoadingContainer from "../page/loading-container";

const ExportContent = lazy(() => import("./export-content"));

function ExportDialogGlobal() {
  const { open } = useExportDialog();
  const { width } = useScreenSize();
  const { t } = useTranslation();

  return (
    <DialogRoot
      lazyMount
      unmountOnExit
      open={open}
      onOpenChange={(e) => setExportDialogOpen(e.open)}
      size={width.lg ? "xl" : width.md ? "lg" : "full"}
      scrollBehavior="inside"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogContent>
        <DialogHeader textAlign={"center"}>
          <DialogTitle>{t("dialogs.exportTitle")}</DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: 4, md: 10 }} textAlign={"justify"}>
          <Suspense fallback={<LoadingContainer />}>
            <ExportContent />
          </Suspense>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default ExportDialogGlobal;
