import { Router } from "@tanstack/router";

//routes
import { indexRoute } from "./routes";
import { rootRoute } from "./routes/root";
import { loginRoute } from "./routes/login";
import { appRoute } from "./routes/app";
//dashboard
import { appDashboardRoute } from "./routes/app/dashboard";
import { appNoteRoute } from "./routes/app/note";
//ai
import { appAiRoute } from "./routes/app/ai";
import { appAiTextModifyRoute } from "./routes/app/ai/textModify";
import { appAiPromptsRoute } from "./routes/app/ai/aiPrompts";
//settings
import { appSettingsRoute } from "./routes/app/settings";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  appRoute.addChildren([
    appDashboardRoute,
    appAiRoute.addChildren([appAiTextModifyRoute, appAiPromptsRoute]),
    appSettingsRoute,
    appNoteRoute,
  ]),
]);

const router = new Router({
  routeTree,
});

export { router };

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
