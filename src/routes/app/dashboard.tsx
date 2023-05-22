import { Route } from "@tanstack/router";
import { appRoute } from ".";

export const appSettingsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/",
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <p>Dashboard</p>
    </>
  );
}
