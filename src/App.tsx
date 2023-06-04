import { router } from "./router.tsx";
import { RouterProvider } from "@tanstack/router";

import { MantineProvider, createEmotionCache } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import AppSettingsProvider from "@context/AppSettingsProvider.tsx";
import { useThemeStore } from "@features/settings";

const myCache = createEmotionCache({ key: "mantine" });

const App = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <MantineProvider
      theme={{
        colorScheme: theme,
      }}
      emotionCache={myCache}
    >
      <RouterProvider router={router} />
      <Notifications />
      <AppSettingsProvider />
    </MantineProvider>
  );
};

export default App;
