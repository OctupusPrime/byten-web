import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "@data/i18n/en/translation.json";

export const resources = {
  en: {
    translation: enTranslation,
  },
};

i18next.use(initReactI18next).init({
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});
