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
    //className="pl-60"
    <div className="pl-0 pb-20 md:pl-60 md:pb-0">
      <AppNavBar />
      <main className="max-w-3xl mx-auto w-full p-3 md">
        <Outlet />
      </main>
    </div>
  );
}
