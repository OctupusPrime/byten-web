import { useEffect } from "react";
import "./index.css";
import "@lib/i18.ts";

import { MantineProvider, createEmotionCache } from "@mantine/core";

import { router } from "./router.tsx";
import { RouterProvider } from "@tanstack/router";

import {
  useLocalizationStore,
  useThemeStore,
} from "@features/settings/index.ts";

import { getThemeValue } from "@utils/theme.ts";
import { useTranslation } from "react-i18next";

const myCache = createEmotionCache({ key: "mantine" });

const App = () => {
  const { i18n } = useTranslation();

  const theme = useThemeStore((state) => state.state);

  const localization = useLocalizationStore((state) => state.state);

  useEffect(() => {
    i18n.changeLanguage(localization);
  }, []);

  return (
    <MantineProvider
      theme={{
        colorScheme: getThemeValue(theme),
      }}
      emotionCache={myCache}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
