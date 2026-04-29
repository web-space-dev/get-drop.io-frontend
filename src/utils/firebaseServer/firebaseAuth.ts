import {
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseClient";

function getResetRedirectUrl(): string {
  const appendResetSuccessParam = (baseUrl: string): string => {
    const redirectUrl = new URL("/auth/login", baseUrl);
    redirectUrl.searchParams.set("passwordReset", "success");
    return redirectUrl.toString();
  };

  const envAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (envAppUrl) {
    return appendResetSuccessParam(envAppUrl);
  }

  if (typeof window !== "undefined") {
    return appendResetSuccessParam(window.location.origin);
  }

  return appendResetSuccessParam("http://localhost:3000");
}

export function onAuthStateChanged(
  cb: (user: User | null) => void,
): () => void {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(
  cb: (token: string | null) => void,
): () => void {
  try {
    return _onIdTokenChanged(auth, (user) => {
      if (user) {
        void user
          .getIdToken()
          .then((token) => {
            cb(token);
          })
          .catch((error) => {
            console.error("Error handling ID token change:", error);
          });
        return;
      }

      cb(null);
    });
  } catch (error) {
    console.error("Error subscribing to ID token changes:", error);
    throw error;
  }
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<User> {
  try {
    const result = await firebaseSignInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return result.user;
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw error;
  }
}

export async function signUp(email: string, password: string): Promise<User> {
  try {
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
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export async function resetPassword(email: string): Promise<void> {
  try {
    const actionCodeSettings = {
      url: getResetRedirectUrl(),
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}
