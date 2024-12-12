import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS0AUECWEoRKfo4bDAJgzfK7IFsqAsqU4",
  authDomain: "cumulonimbus-cloud-firebase.firebaseapp.com",
  projectId: "cumulonimbus-cloud-firebase",
  storageBucket: "cumulonimbus-cloud-firebase.appspot.com", // Corrected typo here
  messagingSenderId: "1090397435126",
  appId: "1:1090397435126:web:2cf99ea7b5ef46d82428d7",
  measurementId: "G-YGKCMR6P34",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
