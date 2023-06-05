import { Outlet, RootRoute } from "@tanstack/router";
import { lazy } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const rootRoute = new RootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
      </>
    );
  },
});
