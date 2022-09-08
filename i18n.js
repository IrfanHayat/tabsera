import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsEN from "./locales/transalation/en.json";
import translationsAr from "./locales/transalation/ar.json";
import translationsRu from "./locales/transalation/ru.json";
//import translationsAr from "./ar/translation.json";
import translationsTr from "./locales/transalation/tr.json";
import translationsSo from "./locales/transalation/so.json";


const resources = {
  en: {
    translation: translationsEN,
  },
  ru: {
    translation: translationsRu,
  },
  tr: {
    translation: translationsTr,
  },
  ar: {
    translation: translationsAr,
  },
  so: {
    translation: translationsSo,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: "en", // default language
    //keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

