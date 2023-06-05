import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import "@lib/i18.ts";

import { AuthContextProvider } from "@context/AuthContext.tsx";
import QueryContextProvider from "@context/QueryContext.tsx";

import App from "./App.tsx";

//TODO update route package if they fix https://github.com/TanStack/router/issues/597
//TODO check spelling of promts or prompts

//TODO add dark theme conf btn to md loader

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryContextProvider>
        <App />
      </QueryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
