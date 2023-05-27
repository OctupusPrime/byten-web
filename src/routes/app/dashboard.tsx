import { Route } from "@tanstack/router";
import { appRoute } from ".";
import MDEditor from "@components/MDEditorTest";
import Icon from "@components/Icon";

export const appDashboardRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/",
  component: Dashboard,
});

function Dashboard() {
  // const navigate = useNavigate();

  return (
    <>
      <MDEditor />
    </>
  );
}
