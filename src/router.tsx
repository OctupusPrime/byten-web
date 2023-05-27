import { Router } from "@tanstack/router";
import { QueryClient } from "@tanstack/react-query";

//routes
import { rootRoute } from "./routes/root";
import { indexRoute } from "./routes";
import { loginRoute } from "./routes/login";
import { appRoute } from "./routes/app";
import { appSettingsRoute } from "./routes/app/settings";
import { appAiRoute } from "./routes/app/ai";
import { appDashboardRoute } from "./routes/app/dashboard";
import { appTodayRoute } from "./routes/app/today";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  appRoute.addChildren([
    appDashboardRoute,
    appAiRoute,
    appSettingsRoute,
    appTodayRoute,
  ]),
]);

export type RouterContext = {
  queryClient: QueryClient;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 2000,
      retry: 0,
    },
  },
});

const router = new Router({
  routeTree,
  context: {
    queryClient,
  },
  // defaultPreload: "intent", Allout of unsesary rerender turn on back if fixed
});

export { queryClient, router };

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
