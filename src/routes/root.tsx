import { Outlet, RootRoute } from "@tanstack/router";
import React from "react";
import { RouterContext } from "src/router";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const rootRoute = RootRoute.withRouterContext<RouterContext>()({
  component: () => {
    return (
      <>
        {/* <Link
          to={"/app/settings"}
          className={`block py-2 px-3 text-blue-700`}
          // Make "active" links bold
          activeProps={{ className: `font-bold` }}
        >
          Login
        </Link>
        <Link
          to={"/app"}
          className={`block py-2 px-3 text-blue-700`}
          // Make "active" links bold
          activeProps={{ className: `font-bold` }}
        >
          App
        </Link> */}
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </>
    );
  },
});
