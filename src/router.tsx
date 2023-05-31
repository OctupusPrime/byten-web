import { Router } from "@tanstack/router";
import { QueryClient } from "@tanstack/react-query";

//routes
import { indexRoute } from "./routes";
import { rootRoute } from "./routes/root";
import { loginRoute } from "./routes/login";
import { appRoute } from "./routes/app";
//dashboard
import { appDashboardRoute } from "./routes/app/dashboard";
import { appTodayRoute } from "./routes/app/today";
//ai
import { appAiRoute } from "./routes/app/ai";
import { appAiTextModifyRoute } from "./routes/app/ai/textModify";
import { appAiPromtsRoute } from "./routes/app/ai/aiPromts";
//settings
import { appSettingsRoute } from "./routes/app/settings";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  appRoute.addChildren([
    appDashboardRoute,
    appAiRoute.addChildren([appAiTextModifyRoute, appAiPromtsRoute]),
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
