import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsEN from "./en/translation.json";
import translationsFr from "./fr/translation.json";
import translationsDe from "./de/translation.json";
import translationsAr from "./ar/translation.json";
import translationsSm from "./sm/translation.json";

const resources = {
  en: {
    translation: translationsEN,
  },
  fr: {
    translation: translationsFr,
  },
  de: {
    translation: translationsDe,
  },
  ar: {
    translation: translationsAr,
  },
  sm: {
    translation: translationsSm,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en", // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
