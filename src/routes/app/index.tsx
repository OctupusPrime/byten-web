import { Outlet, Route, useNavigate } from "@tanstack/router";
import { rootRoute } from "../root";
import { useAuthContext } from "@context/AuthContext";
import { useEffect } from "react";
import AppNavBar from "src/layout/AppNavBar";

export const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: App,
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

  if (isLoading) return null;

  return (
    <div
      id="wrapper"
      className="h-[calc(100%-80px)] overflow-auto md:h-full md:pl-60"
    >
      <AppNavBar />
      <main className="mx-auto flex min-h-full w-full max-w-3xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
