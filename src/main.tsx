import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { AuthContextProvider } from "@context/AuthContext.tsx";
import QueryContextProvider from "@context/QueryContext.tsx";
import { RouterProvider } from "@tanstack/router";
import { queryClient, router } from "./router.tsx";

import { MantineProvider } from "@mantine/core";

// const App = () => {
//   const { isLoading } = useAuthContext();

//   return;
//   return <>{isLoading ? <p>Loading</p> : <RouterProvider router={router} />}</>;
// };

//TODO update route package if they fix https://github.com/TanStack/router/issues/597

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryContextProvider queryClient={queryClient}>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
