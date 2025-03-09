import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBYHkpcy39OKV7vFWJAzCD3hG4q92fmtGQ",
  authDomain: "nhts2025-e2c8d.firebaseapp.com",
  projectId: "nhts2025-e2c8d",
  storageBucket: "nhts2025-e2c8d.firebasestorage.app",
  messagingSenderId: "469314716958",
  appId: "1:469314716958:web:fb230dc4173c97369b350f",
  measurementId: "G-H07FJWZWP6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };