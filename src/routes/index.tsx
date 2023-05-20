import { Route } from "@tanstack/router";
import { rootRoute } from "./root";
import { useAuthContext } from "@context/AuthContext";
import axiosInstance from "@lib/axios";

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  
  path: "/",
  component: Home,
});

function Home() {
  const { session, signInWithGoogle, signOut, isLoading, getToken } =
    useAuthContext();

  const handleReq = async () => {
    try {
      const res = await axiosInstance.get("/test");

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>IsLoading</p>
      <p>{JSON.stringify(isLoading)}</p>

      <p>Session</p>
      <p>{JSON.stringify(session)}</p>

      <div className="mx-auto flex justify-center gap-5 pt-4">
        <button onClick={signInWithGoogle}>Login</button>
        <button onClick={signOut}>Logout</button>
        <button onClick={async () => console.log(await getToken())}>
          Token
        </button>
        <button onClick={handleReq}>Req</button>
      </div>
    </>
  );
}
