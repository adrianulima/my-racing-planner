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
import { create } from "zustand";
import LoadingContainer from "../page/loading-container";

const ExportContent = lazy(() => import("./export-content"));

const useExportDialog = create<{ open: boolean }>(() => ({ open: false }));

export const openExportDialog = () => useExportDialog.setState({ open: true });

function ExportDialogGlobal() {
  const { open } = useExportDialog();
  const { width } = useScreenSize();
  const { t } = useTranslation();

  return (
    <DialogRoot
      lazyMount
      unmountOnExit
      open={open}
      onOpenChange={(e) => useExportDialog.setState({ open: e.open })}
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
