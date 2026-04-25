import { ETabs } from "@/store/ui";
import { useEffect } from "react";
import { useLocation, useSearch } from "wouter";

function getKeyFromValue(value: string): string | undefined {
  const entry = Object.entries(ETabs).find(([_, val]) => val === value);
  return entry ? entry[0] : undefined;
}

export const usePageTracking = () => {
  const [location] = useLocation();
  const search = useSearch();

  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_path: location + search,
      page_search: search,
      page_hash: location,
      screen_name: getKeyFromValue(location) ?? location,
    });
  }, [location, search]);
};
