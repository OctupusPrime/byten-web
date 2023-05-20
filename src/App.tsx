import axiosInstance from "@lib/axios";
import { useAuthContext } from "@context/AuthContext";

function App() {
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

      <button onClick={signInWithGoogle}>Login</button>
      <button onClick={signOut}>Logout</button>
      <button onClick={async () => console.log(await getToken())}>Token</button>
      <button onClick={handleReq}>Req</button>
    </>
  );
}

export default App;
