import { Router } from "@tanstack/router";

//routes
import { rootRoute } from "./routes/root";
import { indexRoute } from "./routes";
import { loginRoute } from "./routes/login";
import { appRoute } from "./routes/app";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  appRoute,
]);

export type RouterContext = {};

export const router = new Router({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
