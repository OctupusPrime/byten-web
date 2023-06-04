import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import "@lib/i18.ts";

import { AuthContextProvider } from "@context/AuthContext.tsx";
import QueryContextProvider from "@context/QueryContext.tsx";

import App from "./App.tsx";

//TODO update route package if they fix https://github.com/TanStack/router/issues/597
//TODO check spelling of promts or prompts

//TODO change locale spelling from ua to uk and add dayjs change locale in store

//TOTO add notification to each errors to hooks

//TODO add dark theme conf btn to md loader

//TODO add error message to FirebaseError: Firebase: Error (auth/account-exists-with-different-credential). in here auth function call

//TODO move to context localization and theme listener

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryContextProvider>
        <App />
      </QueryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
