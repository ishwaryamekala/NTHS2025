// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYHkpcy39OKV7vFWJAzCD3hG4q92fmtGQ",
  authDomain: "nhts2025-e2c8d.firebaseapp.com",
  projectId: "nhts2025-e2c8d",
  storageBucket: "nhts2025-e2c8d.firebasestorage.app",
  messagingSenderId: "469314716958",
  appId: "1:469314716958:web:fb230dc4173c97369b350f",
  measurementId: "G-H07FJWZWP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Fix the "window is not defined" error by using React Native Auth Storage
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };