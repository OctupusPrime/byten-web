import { Outlet, RootRoute } from "@tanstack/router";
import { RouterContext } from "src/router";

// const TanStackRouterDevtools =
//   process.env.NODE_ENV === "production"
//     ? () => null // Render nothing in production
//     : React.lazy(() =>
//         // Lazy load in development
//         import("@tanstack/router-devtools").then((res) => ({
//           default: res.TanStackRouterDevtools,
//           // For Embedded Mode
//           // default: res.TanStackRouterDevtoolsPanel
//         }))
//       );

export const rootRoute = RootRoute.withRouterContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        {/* <TanStackRouterDevtools position="bottom-right" /> */}
      </>
    );
  },
});
