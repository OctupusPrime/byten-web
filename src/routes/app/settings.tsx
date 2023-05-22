import { Route } from "@tanstack/router";
import { appRoute } from ".";
import {
  SettingsSection,
  useLocalizationStore,
  useThemeStore,
} from "@features/settings";
import { SegmentedControl, Select } from "@mantine/core";
import { Locale } from "types/i18n";
import { useTranslation } from "react-i18next";
import Icon from "@components/Icon";

export const appSettingsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "settings",
  component: Settings,
});

function Settings() {
  const { i18n, t } = useTranslation();

  const [theme, setTheme] = useThemeStore((state) => [
    state.state,
    state.changeTheme,
  ]);

  const [localization, setLocalization] = useLocalizationStore((state) => [
    state.state,
    state.changeLocale,
  ]);

  const handleLocalizationChange = (lang: Locale) => {
    setLocalization(lang);

    i18n.changeLanguage(lang);
  };

  return (
    <>
      <h1 className="text-center text-2xl font-semibold mt-3 dark:text-white">
        Settings
      </h1>

      <SettingsSection title="Theme" description="Change app appearance.">
        <SegmentedControl
          value={theme}
          onChange={setTheme}
          data={[
            { label: "Light", value: "light" },
            { label: "Auto", value: "auto" },
            { label: "Dark", value: "dark" },
          ]}
          classNames={{
            root: "mt-2 sm:mt-0",
          }}
        />
      </SettingsSection>
      <SettingsSection title="Localization">
        <Select
          value={localization}
          onChange={handleLocalizationChange}
          data={[
            { value: "en", label: "English (US)" },
            { value: "ua", label: "Українська (UA)" },
            { value: "ru", label: "Русcкий (RU)" },
          ]}
        />
      </SettingsSection>
      <p>{t("test")}</p>
      <Icon name="settings" className="text-3xl" filled />
    </>
  );
}
