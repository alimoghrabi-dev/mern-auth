// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-75856.firebaseapp.com",
  projectId: "mern-auth-75856",
  storageBucket: "mern-auth-75856.appspot.com",
  messagingSenderId: "244865809450",
  appId: "1:244865809450:web:2b4b437c39f7cf3a3f9753",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
