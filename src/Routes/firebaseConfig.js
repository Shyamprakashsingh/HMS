// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRv1t2_u1kvuApHTFoNxm8exCEVNavaSI",
  authDomain: "github-clone-709d9.firebaseapp.com",
  projectId: "github-clone-709d9",
  storageBucket: "github-clone-709d9.appspot.com",
  messagingSenderId: "986191027924",
  appId: "1:986191027924:web:7046c8654edfdbd8f72541"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
