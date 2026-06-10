import { useExportDialog } from "@/components/export/export-dialog-store";
import { useLanguageDialog } from "@/components/language/language-dialog-store";
import { lazy, Suspense } from "react";

const ExportDialogGlobal = lazy(() => import("../export/export-dialog-global"));
const LanguageDialogGlobal = lazy(
  () => import("../language/language-dialog-global"),
);

function ExportDialogMount() {
  const { open } = useExportDialog();
  if (!open) return null;

  return (
    <Suspense fallback={null}>
      <ExportDialogGlobal />
    </Suspense>
  );
}

function LanguageDialogMount() {
  const { open } = useLanguageDialog();
  if (!open) return null;

  return (
    <Suspense fallback={null}>
      <LanguageDialogGlobal />
    </Suspense>
  );
}

function GlobalDialogs() {
  return (
    <>
      <ExportDialogMount />
      <LanguageDialogMount />
    </>
  );
}

export default GlobalDialogs;
