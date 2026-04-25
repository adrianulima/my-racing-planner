import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import ko from "./locales/ko.json";
import pl from "./locales/pl.json";
import ptBR from "./locales/pt-BR.json";
import ru from "./locales/ru.json";
import zhCN from "./locales/zh-CN.json";

export const supportedLanguages = [
  "en",
  "es",
  "pt-BR",
  "de",
  "fr",
  "ru",
  "ko",
  "pl",
  "zh-CN",
] as const;
export type Language = (typeof supportedLanguages)[number];

const isLanguage = (value: unknown): value is Language =>
  typeof value === "string" &&
  supportedLanguages.includes(value as Language);

export const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") return "en";

  try {
    const persisted = window.localStorage.getItem("ui-settings");
    const language = persisted
      ? JSON.parse(persisted)?.state?.language
      : undefined;
    if (isLanguage(language)) return language;
  } catch {
    // Ignore malformed persisted state and fall back to browser language.
  }

  const browserLanguage = window.navigator.language.split("-")[0];
  if (window.navigator.language.toLowerCase().startsWith("pt")) {
    return "pt-BR";
  }
  if (window.navigator.language.toLowerCase().startsWith("zh")) {
    return "zh-CN";
  }
  return isLanguage(browserLanguage) ? browserLanguage : "en";
};

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    ko: { translation: ko },
    pl: { translation: pl },
    "pt-BR": { translation: ptBR },
    ru: { translation: ru },
    "zh-CN": { translation: zhCN },
  },
  lng: getStoredLanguage(),
  fallbackLng: "en",
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
