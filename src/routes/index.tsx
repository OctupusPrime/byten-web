import { Route } from "@tanstack/router";
import { rootRoute } from "./root";

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

function Home() {
  return (
    <>
      <p>landing</p>
    </>
  );
}
