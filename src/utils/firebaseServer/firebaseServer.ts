import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getAdminInitConfig } from "./firebaseconfig/adminConfig";

if (process.env.USE_FIREBASE_EMULATORS === "true") {
  import("./firebaseconfig/useAdminEmulators").then(
    ({ connectAdminToEmulators }) => {
      try {
        connectAdminToEmulators();
      } catch (error) {
        console.warn("Failed to connect admin SDK to emulators:", error);
      }
    },
  );
}

if (!getApps().length) {
  const config = getAdminInitConfig();

  if (config.credential) {
    initializeApp({
      credential: cert(config.credential),
      projectId: config.projectId,
    });
  } else {
    initializeApp({ projectId: config.projectId });
  }

  const db = getFirestore();
  db.settings({ ignoreUndefinedProperties: true });
}

export const adminFirestore = getFirestore();
export const adminStorage = getStorage();

export async function verifyIdToken(idToken: string): Promise<DecodedIdToken> {
  try {
    return await getAuth().verifyIdToken(idToken);
  } catch (error) {
    console.error("Error verifying ID token:", error);
    throw new Error("Invalid ID token");
  }
}
