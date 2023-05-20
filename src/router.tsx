import { Router } from "@tanstack/router";

//routes
import { rootRoute } from "./routes/root";
import { indexRoute } from "./routes";
import { loginRoute } from "./routes/login";
import { appRoute } from "./routes/app";
import { QueryClient } from "@tanstack/react-query";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  appRoute,
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
