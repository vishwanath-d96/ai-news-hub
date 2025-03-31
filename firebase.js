import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDXbfJP6sK0QX2wR6mylWKhlKCr3atCb5Y",
    authDomain: "ai-news-hub-4936b.firebaseapp.com",
    projectId: "ai-news-hub-4936b",
    storageBucket: "ai-news-hub-4936b.firebasestorage.app",
    messagingSenderId: "989925295697",
    appId: "1:989925295697:web:0145a8a97a1669078c9a70"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);
const logOut = () => signOut(auth);

export { auth, signInWithGoogle, logOut };
