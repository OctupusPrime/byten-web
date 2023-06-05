import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();

export { googleProvider, githubProvider };
