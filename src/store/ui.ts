import { ECarCategories } from "@/ir-data/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ETabs {
  MySeason = "/",
  MySeries = "/series",
  MyCars = "/cars",
  MyTracks = "/tracks",
  ShopGuide = "/checkout",
  History = "/history",
}

export enum EDialogs {
  About = "/about",
  Help = "/help",
  PrivacyPolicy = "/privacy-policy",
  Changelog = "/changelog",
}

export const useUiStorePersist = create(
  persist(
    () => ({
      seasonShowCheckboxes: false,
      seasonShowCarsDropdown: false,
      seasonShowTrackConfig: false,
      seasonShowReorder: true,
      seasonHighlight: true,
      seasonShowWishlist: true,
      seasonShowOwned: true,
      seasonShowParticipation: false,
      seasonShowThisWeek: true,
      seasonShowRain: true,
      seasonUseLocalTimezone: true,
      seasonCategory: ECarCategories.all,
      shopVolumeDiscount: true,
      shopLoyaltyDiscount: false,
      helpPresented: false,
    }),
    {
      name: "ui-settings",
    },
  ),
);

export const setSeasonShowReorder = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowReorder: value }));

export const setSeasonShowCheckboxes = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowCheckboxes: value }));

export const setSeasonShowCarsDropdown = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowCarsDropdown: value }));

export const setSeasonShowTrackConfig = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowTrackConfig: value }));

export const setSeasonHighlight = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonHighlight: value }));

export const setSeasonShowWishlist = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowWishlist: value }));

export const setSeasonShowOwned = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowOwned: value }));

export const setSeasonShowParticipation = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowParticipation: value }));

export const setSeasonShowThisWeek = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowThisWeek: value }));

export const setSeasonShowRain = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowRain: value }));

export const setSeasonUseLocalTimezone = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonUseLocalTimezone: value }));

export const setSeasonCategory = (value: ECarCategories) =>
  useUiStorePersist.setState(() => ({ seasonCategory: value }));

export const setShopVolumeDiscount = (value: boolean) =>
  useUiStorePersist.setState(() => ({ shopVolumeDiscount: value }));

export const setShopLoyaltyDiscount = (value: boolean) =>
  useUiStorePersist.setState(() => ({ shopLoyaltyDiscount: value }));

export const setHelpPresented = (value: boolean) =>
  useUiStorePersist.setState(() => ({ helpPresented: value }));

export const useUi = () => {
  const seasonShowReorder = useUiStorePersist(
    (state) => state.seasonShowReorder,
  );
  const seasonShowCheckboxes = useUiStorePersist(
    (state) => state.seasonShowCheckboxes,
  );
  const seasonShowCarsDropdown = useUiStorePersist(
    (state) => state.seasonShowCarsDropdown,
  );
  const seasonShowTrackConfig = useUiStorePersist(
    (state) => state.seasonShowTrackConfig,
  );
  const seasonHighlight = useUiStorePersist((state) => state.seasonHighlight);
  const seasonShowWishlist = useUiStorePersist(
    (state) => state.seasonShowWishlist,
  );
  const seasonShowOwned = useUiStorePersist((state) => state.seasonShowOwned);
  const seasonShowParticipation = useUiStorePersist(
    (state) => state.seasonShowParticipation,
  );
  const seasonShowThisWeek = useUiStorePersist(
    (state) => state.seasonShowThisWeek,
  );
  const seasonShowRain = useUiStorePersist((state) => state.seasonShowRain);
  const seasonUseLocalTimezone = useUiStorePersist(
    (state) => state.seasonUseLocalTimezone,
  );
  const seasonCategory = useUiStorePersist((state) => state.seasonCategory);
  const shopVolumeDiscount = useUiStorePersist(
    (state) => state.shopVolumeDiscount,
  );
  const shopLoyaltyDiscount = useUiStorePersist(
    (state) => state.shopLoyaltyDiscount,
  );
  const helpPresented = useUiStorePersist((state) => state.helpPresented);

  return {
    seasonShowReorder,
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonShowTrackConfig,
    seasonHighlight,
    seasonShowWishlist,
    seasonShowOwned,
    seasonShowParticipation,
    seasonShowThisWeek,
    seasonShowRain,
    seasonUseLocalTimezone,
    seasonCategory,
    shopVolumeDiscount,
    shopLoyaltyDiscount,
    helpPresented,
  };
};
