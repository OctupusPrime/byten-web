import { Route } from "@tanstack/router";
import { rootRoute } from "../root";
import { useAuthContext } from "@context/AuthContext";

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

function Login() {
  const { signInWithGoogle, session } = useAuthContext();

  return (
    <>
      <p className="text-center pt-[30vh] text-2xl font-medium">
        Login to use app
      </p>
      <p>{session?.email}</p>
      <div className="flex items-center">
        <button
          className="mx-auto p-2 bg-slate-200 rounded-md mt-2 text-lg"
          onClick={signInWithGoogle}
        >
          Login
        </button>
      </div>
    </>
  );
}
