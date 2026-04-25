import { EDialogs } from "@/store/ui";
import { useEffect } from "react";
import { useSearch } from "wouter";

function getKeyFromValue(value: string): string | undefined {
  const entry = Object.entries(EDialogs).find(([_, val]) => val === value);
  return entry ? entry[0] : undefined;
}

export const useDialogTracking = (dialog: EDialogs) => {
  const search = useSearch();
  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_path: dialog,
      page_search: search,
      page_hash: dialog,
      screen_name: getKeyFromValue(dialog),
    });
  }, [dialog]);
};
