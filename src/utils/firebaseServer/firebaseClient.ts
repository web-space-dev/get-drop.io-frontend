import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  type Firestore,
} from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { firebaseConfig } from "./firebaseconfig/firebaseConfig";

const firebaseApp: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(firebaseApp);

let db: Firestore;
try {
  db = initializeFirestore(firebaseApp, {
    ignoreUndefinedProperties: true,
  });
} catch {
  db = getFirestore(firebaseApp);
}

const storage = getStorage(firebaseApp);

if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true") {
  import("./firebaseconfig/useEmulators").then(
    ({ connectClientToEmulators }) => {
      try {
        connectClientToEmulators({ auth, db, storage });
      } catch (error) {
        console.warn("Failed to connect to emulators:", error);
      }
    },
  );
}

export function getFirebaseApp(): FirebaseApp {
  return firebaseApp;
}

export function getFirebaseServices(): {
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
} {
  return { auth, db, storage };
}

export { auth, db, storage };
