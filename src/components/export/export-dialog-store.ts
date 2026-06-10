import { create } from "zustand";

const useExportDialogStore = create<{ open: boolean }>(() => ({ open: false }));

export const openExportDialog = () =>
  useExportDialogStore.setState({ open: true });

export const setExportDialogOpen = (open: boolean) =>
  useExportDialogStore.setState({ open });

export const useExportDialog = () => useExportDialogStore();
