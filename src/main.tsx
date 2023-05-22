import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@lib/i18.ts";

import { MantineProvider } from "@mantine/core";

import { queryClient, router } from "./router.tsx";

import { AuthContextProvider } from "@context/AuthContext.tsx";
import QueryContextProvider from "@context/QueryContext.tsx";
import { RouterProvider } from "@tanstack/router";

import { useThemeStore } from "@features/settings/index.ts";

import { getThemeValue } from "@utils/theme.ts";

//TODO update route package if they fix https://github.com/TanStack/router/issues/597

const App = () => {
  const theme = useThemeStore((state) => state.state);

  return (
    <MantineProvider
      theme={{
        colorScheme: getThemeValue(theme),
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryContextProvider queryClient={queryClient}>
        <App />
      </QueryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
