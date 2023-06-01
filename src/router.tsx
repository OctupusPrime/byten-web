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
import { appAiPromptsRoute } from "./routes/app/ai/aiPrompts";
//settings
import { appSettingsRoute } from "./routes/app/settings";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  appRoute.addChildren([
    appDashboardRoute,
    appAiRoute.addChildren([appAiTextModifyRoute, appAiPromptsRoute]),
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
      refetchOnWindowFocus: false,

      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: false,
    },
  },
});

const router = new Router({
  routeTree,
  context: {
    queryClient,
  },
});

export { queryClient, router };

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
