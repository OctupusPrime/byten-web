import { Outlet, Route, useNavigate } from "@tanstack/router";
import { rootRoute } from "../root";
import { useAuthContext } from "@context/AuthContext";
import { useEffect } from "react";

export const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: App,
  // loader: ({ context }) => {
  //   console.log("queryContext", context.queryClient);
  // },
});

function App() {
  const navigate = useNavigate();
  const { session, isLoading } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;

    if (!session)
      navigate({
        to: "/login",
      });
  }, [session, isLoading]);

  if (isLoading) return <></>;

  return (
    <>
      <Outlet />
    </>
  );
}
