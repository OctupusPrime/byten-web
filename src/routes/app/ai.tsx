import { Route } from "@tanstack/router";
import { appRoute } from ".";

export const appAiRoute = new Route({
  getParentRoute: () => appRoute,
  path: "ai",
  component: Ai,
});

function Ai() {
  return (
    <>
      <p>Ai</p>
    </>
  );
}
