import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useContentTransfer from "./useContentTransfer";

function TransferContentDialog() {
  const { hasNewData, applyData, ignoreData } = useContentTransfer();
  const { t } = useTranslation();
  return (
    <DialogRoot role="alertdialog" open={hasNewData}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dialogs.replacePreferences")}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            {t("export.replacePreferencesWarning")}
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button onClick={ignoreData} variant="outline">
              {t("common.cancel")}
            </Button>
          </DialogActionTrigger>
          <Button onClick={applyData}>{t("common.apply")}</Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={ignoreData} />
      </DialogContent>
    </DialogRoot>
  );
}

export default TransferContentDialog;
