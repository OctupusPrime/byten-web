import { Outlet, Route, useNavigate } from "@tanstack/router";
import { rootRoute } from "../root";
import { useAuthContext } from "@context/AuthContext";
import { useEffect } from "react";
import AppNavBar from "@components/AppNavBar";

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
    <div className="h-full pb-20 pl-0 md:pb-0 md:pl-60">
      <AppNavBar />
      <main className="mx-auto min-h-full w-full max-w-3xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
