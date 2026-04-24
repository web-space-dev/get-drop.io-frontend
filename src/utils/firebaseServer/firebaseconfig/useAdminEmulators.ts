export function connectAdminToEmulators(): void {
  const firestoreHost =
    process.env.FIRESTORE_EMULATOR_HOST ??
    process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST ??
    "127.0.0.1:8080";
  const authHost =
    process.env.FIREBASE_AUTH_EMULATOR_HOST ??
    process.env.NEXT_PUBLIC_AUTH_EMULATOR_HOST ??
    "127.0.0.1:9099";
  const storageHost =
    process.env.FIREBASE_STORAGE_EMULATOR_HOST ??
    process.env.NEXT_PUBLIC_STORAGE_EMULATOR_HOST ??
    "127.0.0.1:9199";

  process.env.FIRESTORE_EMULATOR_HOST = firestoreHost;
  process.env.FIREBASE_AUTH_EMULATOR_HOST = authHost;
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = storageHost;
}
