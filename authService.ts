import { auth } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  UserCredential 
} from "firebase/auth";

/**
 * Sign up function
 * @param email - User's email
 * @param password - User's password
 * @param navigation - Navigation object for screen transition
 */
export const signUp = async (email: string, password: string, navigation: any): Promise<void> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user.email);
    navigation.navigate("Home");
  } catch (error: any) {
    alert(error.message);
  }
};

/**
 * Login function
 * @param email - User's email
 * @param password - User's password
 * @param navigation - Navigation object for screen transition
 */
export const login = async (email: string, password: string, navigation: any): Promise<void> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user.email);
    navigation.navigate("Home"); 
  } catch (error: any) {
    alert(error.message);
  }
};

export const logout = async (navigation: any): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User logged out");
    navigation.navigate("Login"); 
  } catch (error: any) {
    alert(error.message);
  }
};
