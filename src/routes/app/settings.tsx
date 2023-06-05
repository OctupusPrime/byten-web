import { useEffect, useState } from "react";
import { Route } from "@tanstack/router";
import { appRoute } from ".";

import {
  SettingsSection,
  SettingsSectionItem,
  useLocalizationStore,
  useThemeStore,
} from "@features/settings";
import { Avatar, Progress, SegmentedControl, Select } from "@mantine/core";

import { getFileSize, humanFileSize } from "@utils/stringSize";

import { useAuthContext } from "@context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export const appSettingsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "settings",
  component: Settings,
});

function Settings() {
  const queryClient = useQueryClient();
  const { session, signOut } = useAuthContext();

  const displayName = session?.displayName || session?.email || "Unknown";

  const [appTheme, setAppTheme] = useThemeStore((state) => [
    state.appTheme,
    state.changeAppTheme,
  ]);

  const [localization, setLocalization] = useLocalizationStore((state) => [
    state.state,
    state.changeLocale,
  ]);

  const [cacheSize, setCacheSize] = useState({
    percentage: 0,
    displayValue: "0 B",
  });

  useEffect(() => {
    const updateCacheSize = () => {
      const data = localStorage.getItem("REACT_QUERY_OFFLINE_CACHE");

      const parsedData = data ? JSON.parse(data) : null;

      if (!parsedData)
        return {
          percentage: 0,
          displayValue: "0 B",
        };

      let stringCache = "";

      if (parsedData?.clientState?.mutations?.length) {
        stringCache += JSON.stringify(parsedData.clientState.mutations);
      }
      if (parsedData?.clientState?.queries?.length) {
        stringCache += JSON.stringify(parsedData.clientState.queries);
      }

      if (!stringCache)
        return {
          percentage: 0,
          displayValue: "0 B",
        };

      const fileSize = getFileSize(stringCache);

      const percentage = (fileSize / 5_000_000) * 100; //Max 5 mb

      setCacheSize({
        percentage: percentage < 1 ? 1 : Math.round(percentage * 100) / 100,
        displayValue: humanFileSize(fileSize),
      });
    };

    updateCacheSize();
  }, []);

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center gap-4">
        <Avatar size={"lg"} className="!rounded-full" src={session?.photoURL} />
        <div className="min-w-0">
          <h2 className="truncate text-2xl dark:text-white">{displayName}</h2>
        </div>
      </div>

      <SettingsSection label="Account">
        <SettingsSectionItem title="Provider" description="Google" />
        <SettingsSectionItem title="Email" description={session?.email ?? ""} />
      </SettingsSection>
      <SettingsSection label="Appirience">
        <SettingsSectionItem.Action
          title="Theme"
          description="Change app appearance."
        >
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
        </SettingsSectionItem.Action>
        <SettingsSectionItem.Action
          title="Theme"
          description="Change app appearance."
        >
          <Select
            value={localization}
            onChange={setLocalization}
            data={[
              { value: "en", label: "English (US)" },
              { value: "uk", label: "Українська (UA)" },
              { value: "ru", label: "Русcкий (RU)" },
            ]}
          />
        </SettingsSectionItem.Action>
      </SettingsSection>
      <SettingsSection label="Storage">
        <Progress
          size={20}
          sections={[
            {
              value: cacheSize.percentage,
              color: "blue",
              label:
                cacheSize.percentage > 10
                  ? cacheSize.percentage + "%"
                  : undefined,
            },
          ]}
        />
        <div className="flex items-center gap-2 dark:text-white">
          <div className="h-4 w-4 rounded-full bg-[#228be6]" />
          <span className="text-sm">Cache</span>
          <span className="text-sm font-medium">{cacheSize.displayValue}</span>
        </div>
        <SettingsSectionItem
          title="Clear cache"
          description={"Not enoth space? Clear app cache."}
          onClick={() => {
            queryClient.clear();
            setCacheSize({
              percentage: 0,
              displayValue: "0 B",
            });
          }}
        />
      </SettingsSection>
      <SettingsSection label="About ByteN">
        <SettingsSectionItem title="Version" description={"0.1"} />
      </SettingsSection>
      <SettingsSection label="All other">
        <SettingsSectionItem
          title="Exit"
          description={`Logged in as ${displayName}`}
          onClick={signOut}
        />
      </SettingsSection>
    </section>
  );
}
