import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "byten-8d3c3.firebaseapp.com",
  projectId: "byten-8d3c3",
  storageBucket: "byten-8d3c3.appspot.com",
  messagingSenderId: "342456981981",
  appId: "1:342456981981:web:f1c698c76ad49da0e77e34",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
