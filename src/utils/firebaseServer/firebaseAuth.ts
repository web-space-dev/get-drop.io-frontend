import {
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  createUserWithEmailAndPassword,
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
    // ✅ Step 1: Clear the authentication cookie via API
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      console.warn(
        "⚠️ Failed to clear auth cookie, continuing with Firebase logout",
      );
    }

    // ✅ Step 2: Sign out of Firebase
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
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      actionCodeSettings: {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL || window.location.origin
        }/auth/action`,
        handleCodeInApp: true,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to send password reset email");
  }
}

export async function resetPasswordForEmail(email: string): Promise<void> {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      actionCodeSettings: {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL || window.location.origin
        }/auth/action`,
        handleCodeInApp: true,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to send password reset email");
  }
}
