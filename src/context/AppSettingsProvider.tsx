import { useEffect } from "react";
import dayjs from "@lib/dayjs";

import { useLocalizationStore, useThemeStore } from "@features/settings";
import { useTranslation } from "react-i18next";

import { getThemeValue } from "@utils/theme";

const AppSettingsProvider = () => {
  const { i18n } = useTranslation();

  const [appTheme, setTheme] = useThemeStore((state) => [
    state.appTheme,
    state.changeTheme,
  ]);

  const localization = useLocalizationStore((state) => state.state);

  useEffect(() => {
    if (appTheme) {
      setTheme(getThemeValue(appTheme));
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const setSystemTheme = (e: MediaQueryListEvent) => {
      if (appTheme !== "auto") return;

      if (e.matches) {
        setTheme("dark");
        return document.documentElement.classList.add("dark");
      }

      setTheme("light");
      return document.documentElement.classList.remove("dark");
    };

    mql.addEventListener("change", setSystemTheme);

    return () => mql.removeEventListener("change", setSystemTheme);
  }, [appTheme]);

  useEffect(() => {
    i18n.changeLanguage(localization);
    dayjs.locale(localization);
  }, [localization]);

  return null;
};

export default AppSettingsProvider;
