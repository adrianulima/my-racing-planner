import { create } from "zustand";

const useLanguageDialogStore = create<{ open: boolean }>(() => ({
  open: false,
}));

export const openLanguageDialog = () =>
  useLanguageDialogStore.setState({ open: true });

export const setLanguageDialogOpen = (open: boolean) =>
  useLanguageDialogStore.setState({ open });

export const useLanguageDialog = () => useLanguageDialogStore();
