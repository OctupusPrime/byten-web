// import React from "react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { type QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { type ReactNode } from "react";

// const ReactQueryDevtools =
//   process.env.NODE_ENV === "production"
//     ? () => null // Render nothing in production
//     : React.lazy(() =>
//         // Lazy load in development
//         import("@tanstack/react-query-devtools").then((res) => ({
//           default: res.ReactQueryDevtools,
//           // For Embedded Mode
//           // default: res.TanStackRouterDevtoolsPanel
//         }))
//       );

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       cacheTime: 1000 * 60 * 60 * 24, // 24 hours
//       staleTime: 2000,
//       retry: 0,
//     },
//   },
// });

interface QueryContextProps {
  children: ReactNode;
  queryClient: QueryClient;
}

const QueryContextProvider = ({ children, queryClient }: QueryContextProps) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // resume mutations after initial restore from localStorage was successful
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      {children}
      {/* <ReactQueryDevtools position="top-right" /> */}
    </PersistQueryClientProvider>
  );
};

export default QueryContextProvider;
