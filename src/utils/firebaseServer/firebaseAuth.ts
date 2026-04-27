import {
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { auth } from "./firebaseClient";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseClient";
export function onAuthStateChanged(
  cb: (user: User | null) => void,
): () => void {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(
  cb: (token: string | null) => void,
): () => void {
  return _onIdTokenChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      cb(token);
    } else {
      cb(null);
    }
  });
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<User> {
  const result = await firebaseSignInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateLastLoginAt(result.user);

  return result.user;
}

export async function signUp(email: string, password: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "sellers", result.user.uid), {
    id: result.user.uid,
    businessName: "",
    email,
    status: "pending",
    logoUrl: "",
    primaryColour: "",
    messagesUsedThisMonth: 0,
    topupBalance: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return result.user;
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("❌ Logout error:", error);
    throw error;
  }
}

export async function updateLastLoginAt(user: User): Promise<void> {
  try {
    const userDocRef = doc(db, "users", user.uid);

    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      return;
    }

    await updateDoc(userDocRef, {
      lastLoginAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating lastLoginAt:", error);
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export async function resetPassword(email: string): Promise<void> {
  const actionCodeSettings = {
    url: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/auth/action`,
    handleCodeInApp: true,
  };

  await sendPasswordResetEmail(auth, email, actionCodeSettings);
}
