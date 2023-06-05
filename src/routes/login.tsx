import { useEffect } from "react";
import { rootRoute } from "./root";

import { Route, useNavigate } from "@tanstack/router";
import { useAuthContext } from "@context/AuthContext";

import {
  GithubButton,
  GoogleButton,
  useAuthStatusStore,
} from "@features/login";
import { LoadingOverlay } from "@mantine/core";

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithGithub, session, isLoading } =
    useAuthContext();

  const [isRedirectLoading, setIsRedirectLoading] = useAuthStatusStore(
    (state) => [state.isRedirectLoading, state.changeRedirectLoadingStatus]
  );

  useEffect(() => {
    if (!isLoading && !session) setIsRedirectLoading(false);

    if (session)
      navigate({
        to: "/app",
      });
  }, [session, isLoading]);

  const handleSignInClick = (provider: () => void) => {
    provider();
    setIsRedirectLoading(true);
  };

  return (
    <div className="flex justify-center p-3">
      <div className="relative mt-[30vh] w-full max-w-md rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <LoadingOverlay visible={isRedirectLoading} />
        <h2 className="text-lg font-medium dark:text-white">
          Welcome to ByteN, login with
        </h2>
        <div className="mt-4 flex items-center gap-4">
          <GoogleButton
            radius="xl"
            onClick={() => handleSignInClick(signInWithGoogle)}
            className="flex-grow"
          >
            Google
          </GoogleButton>
          <GithubButton
            radius="xl"
            onClick={() => handleSignInClick(signInWithGithub)}
            className="flex-grow"
          >
            Github
          </GithubButton>
        </div>
      </div>
    </div>
  );
}
