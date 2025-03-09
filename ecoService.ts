import { db, auth } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const getUserName = async (): Promise<string | null> => {
  try {
    if (!auth.currentUser) throw new Error("User is not logged in");

    const userRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data().name || "User";  
    }

    return "User";
  } catch (error: any) {
    console.error("❌ Error fetching user name:", error.message);
    return "User";
  }
};


export const getEcoScore = async (): Promise<number | null> => {
  try {
    if (!auth.currentUser) throw new Error("User is not logged in");

    const userRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data().ecoScore || 0;
    }

    return null;
  } catch (error: any) {
    console.error("❌ Error fetching EcoScore:", error.message);
    return null;
  }
};
