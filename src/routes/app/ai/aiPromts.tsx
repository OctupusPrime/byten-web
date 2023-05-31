import { Route } from "@tanstack/router";
import { appAiRoute } from ".";

export const appAiPromtsRoute = new Route({
  getParentRoute: () => appAiRoute,
  path: "/prompts",
  component: AiPromts,
});

function AiPromts() {
  return (
    <>
      <p>Ai promts</p>
    </>
  );
}
