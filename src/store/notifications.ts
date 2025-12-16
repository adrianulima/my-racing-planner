import { PRIVACY_VERSION } from "@/components/privacy-policy/privacy-policy-content";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const newest = {
  changelog: APP_VERSION,
  privacyPolicy: PRIVACY_VERSION,
};

export const useNotificationsStorePersist = create(
  persist(() => ({ ...newest, changelog: "0" }), {
    name: "ui-notifications",
  }),
);

export const setChangelogRead = () =>
  useNotificationsStorePersist.setState(() => ({
    changelog: newest.changelog,
  }));

export const setPrivacyPolicyRead = () =>
  useNotificationsStorePersist.setState(() => ({
    privacyPolicy: newest.privacyPolicy,
  }));

// Banner visibility state (not persisted - resets on page refresh)
const useBannerStore = create<{
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}>((set) => ({
  isVisible: true,
  setVisible: (visible: boolean) => set({ isVisible: visible }),
}));

export const useBannerVisibility = () => useBannerStore();
export const showBanner = () => useBannerStore.setState({ isVisible: true });
export const hideBanner = () => useBannerStore.setState({ isVisible: false });

export const useNotifications = () => {
  const changelog = useNotificationsStorePersist((state) => state.changelog);
  const privacyPolicy = useNotificationsStorePersist(
    (state) => state.privacyPolicy,
  );

  return {
    changelog: changelog !== newest.changelog,
    privacyPolicy: privacyPolicy !== newest.privacyPolicy,
  };
};
