import { Route, useNavigate } from "@tanstack/router";
import { rootRoute } from "./root";

import NotFound from "src/layout/NotFound";

export const NotFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "$",
  component: AppNotFoundPage,
});

function AppNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full p-4">
      <NotFound
        onClick={() =>
          navigate({
            to: "/",
          })
        }
      />
    </div>
  );
}
