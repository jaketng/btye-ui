import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (hardcoded)
const firebaseConfig = {
  apiKey: "AIzaSyCS0AUECWEoRKfo4bDAJgzfK7IFsqAsqU4",
  authDomain: "cumulonimbus-cloud-firebase.firebaseapp.com",
  projectId: "cumulonimbus-cloud-firebase",
  storageBucket: "cumulonimbus-cloud-firebase.appspot.com",
  messagingSenderId: "1090397435126",
  appId: "1:1090397435126:web:2cf99ea7b5ef46d82428d7",
  measurementId: "G-YGKCMR6P34",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Function to handle Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google Sign-In successful. User:", user);
    return user; // Return user details if needed
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error; // Throw the error for the caller to handle
  }
};

// Track the authenticated user
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
  } else {
    console.log("No user signed in.");
  }
});
