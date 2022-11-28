import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSnQ1mUT_kcLSiCq5ViIkFK0eTznoQagY",
  authDomain: "resturantapp-97a5e.firebaseapp.com",
  projectId: "resturantapp-97a5e",
  storageBucket: "resturantapp-97a5e.appspot.com",
  messagingSenderId: "50830416671",
  appId: "1:50830416671:web:297e168da5c3931e26ee2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, firestore, analytics};