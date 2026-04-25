export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean | null>,
) => {
  window.gtag?.("event", eventName, params);
};
