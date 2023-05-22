import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@lib/i18.ts";

import { queryClient } from "./router.tsx";

import { AuthContextProvider } from "@context/AuthContext.tsx";
import QueryContextProvider from "@context/QueryContext.tsx";

import App from "./App.tsx";

//TODO update route package if they fix https://github.com/TanStack/router/issues/597

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryContextProvider queryClient={queryClient}>
        <App />
      </QueryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
