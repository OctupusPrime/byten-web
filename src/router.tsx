import { Router } from "@tanstack/router";

//routes
import { indexRoute } from "./routes";
import { rootRoute } from "./routes/root";
import { loginRoute } from "./routes/login";
import { appRoute } from "./routes/app";
//dashboard
import { appDashboardRoute } from "./routes/app/dashboard";
//note
import { appNoteRoute } from "./routes/app/note";
import { appEditNoteRoute } from "./routes/app/note/edit";
//ai
import { appAiRoute } from "./routes/app/ai";
import { appAiTextModifyRoute } from "./routes/app/ai/textModify";
import { appAiPromptsRoute } from "./routes/app/ai/aiPrompts";
//settings
import { appSettingsRoute } from "./routes/app/settings";
//not found
import { NotFoundRoute } from "./routes/notFound";
import { appNotFoundRoute } from "./routes/app/appNotFound";

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  NotFoundRoute,
  appRoute.addChildren([
    appDashboardRoute,
    appAiRoute.addChildren([appAiTextModifyRoute, appAiPromptsRoute]),
    appSettingsRoute,
    appNoteRoute,
    appEditNoteRoute,
    appNotFoundRoute,
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
