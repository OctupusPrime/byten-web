import { Route, useNavigate } from "@tanstack/router";
import { rootRoute } from "../root";
import { useAuthContext } from "@context/AuthContext";
import { useEffect } from "react";

export const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: App,
  loader: ({ context }) => {
    console.log("queryContext", context.queryClient);
  },
});

function App() {
  const { session, signOut } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!session)
      navigate({
        to: "/login",
      });
  }, [session]);

  return (
    <>
      <p>App</p>
      <button
        className="mx-auto p-2 bg-slate-200 rounded-md mt-2 text-lg"
        onClick={() => {
          navigate({
            to: "/login",
          });
        }}
      >
        logout
      </button>
      <button
        className="mx-auto p-2 bg-slate-200 rounded-md mt-2 text-lg"
        onClick={signOut}
      >
        logout
      </button>
    </>
  );
}
