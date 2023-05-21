import { Route, useNavigate } from "@tanstack/router";
import { rootRoute } from "../root";
import { useAuthContext } from "@context/AuthContext";
import { useEffect } from "react";
import useGetTest from "@hooks/query/useGetTest";

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

  const { data } = useGetTest({
    onSuccess: () => {
      console.log("success");
    },
  });

  return (
    <>
      <p>App</p>
      <p>{JSON.stringify(data)}</p>
      <button
        className="mx-auto p-2 bg-slate-200 rounded-md mt-2 text-lg"
        onClick={signOut}
      >
        logout
      </button>
    </>
  );
}
