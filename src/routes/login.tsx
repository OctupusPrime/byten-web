import { Route } from "@tanstack/router";
import { rootRoute } from "./root";
import { useAuthContext } from "@context/AuthContext";
import { GithubButton, GoogleButton } from "@features/login";

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

function Login() {
  const { signInWithGoogle, session, signInWithGithub } = useAuthContext();

  return (
    <div className="flex min-h-full">
      <p className="pt-[30vh] text-center text-2xl font-medium">
        Login to use app
      </p>
      <p>{session?.email}</p>
      <div className="flex items-center">
        <button
          className="mx-auto mt-2 rounded-md bg-slate-200 p-2 text-lg"
          onClick={signInWithGoogle}
        >
          Login
        </button>
      </div>
      <div className="mx-auto mt-[30vh] h-auto w-full max-w-sm rounded border border-gray-400">
        <div className="flex justify-center gap-2">
          <GoogleButton onClick={signInWithGoogle} />
          <GithubButton onClick={signInWithGithub} />
        </div>
      </div>
    </div>
  );
}
