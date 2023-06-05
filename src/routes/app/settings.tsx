import { Route } from "@tanstack/router";
import { appRoute } from ".";
import {
  SettingsSection,
  useLocalizationStore,
  useThemeStore,
} from "@features/settings";
import { SegmentedControl, Select } from "@mantine/core";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export const appSettingsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "settings",
  component: Settings,
});

function Settings() {
  const { i18n } = useTranslation();

  const [appTheme, setAppTheme] = useThemeStore((state) => [
    state.appTheme,
    state.changeAppTheme,
  ]);

  const [localization, setLocalization] = useLocalizationStore((state) => [
    state.state,
    state.changeLocale,
  ]);

  const time = useMemo(() => {
    return dayjs().format("MMMM");
  }, [i18n.language]);

  return (
    <section className="w-full">
      <h1 className="mt-3 text-center text-2xl font-semibold dark:text-white">
        Settings
      </h1>

      <SettingsSection title="Theme" description="Change app appearance.">
        <SegmentedControl
          value={appTheme}
          onChange={setAppTheme}
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
          onChange={setLocalization}
          data={[
            { value: "en", label: "English (US)" },
            { value: "uk", label: "Українська (UA)" },
            { value: "ru", label: "Русcкий (RU)" },
          ]}
        />
      </SettingsSection>
      <p className="text-white">{time}</p>
    </section>
  );
}
