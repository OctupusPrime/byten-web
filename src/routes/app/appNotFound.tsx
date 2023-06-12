import { Route, useNavigate } from "@tanstack/router";
import { appRoute } from ".";

import NotFound from "src/layout/NotFound";

export const appNotFoundRoute = new Route({
  getParentRoute: () => appRoute,
  path: "$",
  component: AppNotFoundPage,
});

function AppNotFoundPage() {
  const navigate = useNavigate();

  return (
    <NotFound
      onClick={() =>
        navigate({
          to: "/app",
        })
      }
    />
  );
}
