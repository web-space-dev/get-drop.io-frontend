import { connectAuthEmulator, type Auth } from "firebase/auth";
import { connectFirestoreEmulator, type Firestore } from "firebase/firestore";
import { connectStorageEmulator, type FirebaseStorage } from "firebase/storage";

declare global {
  var __firebaseEmulatorsConnected: boolean | undefined;
}

function parseHostPort(value: string, name: string): [string, number] {
  const [host, portText] = value.split(":");
  const port = Number(portText);

  if (!host || !Number.isFinite(port)) {
    throw new Error(`Invalid emulator host for ${name}: ${value}`);
  }

  return [host, port];
}

function resolveClientReachableHost(host: string): string {
  if (typeof window === "undefined") {
    return host;
  }

  if (host === "127.0.0.1" || host === "localhost") {
    return window.location.hostname || host;
  }

  return host;
}

export function connectClientToEmulators(services: {
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
}): void {
  if (globalThis.__firebaseEmulatorsConnected) {
    return;
  }

  const firestoreHost =
    process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST ?? "127.0.0.1:8080";
  const authHost =
    process.env.NEXT_PUBLIC_AUTH_EMULATOR_HOST ?? "127.0.0.1:9099";
  const storageHost =
    process.env.NEXT_PUBLIC_STORAGE_EMULATOR_HOST ?? "127.0.0.1:9199";

  const [firestoreHostname, firestorePort] = parseHostPort(
    firestoreHost,
    "NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST",
  );
  const [authHostname, authPort] = parseHostPort(
    authHost,
    "NEXT_PUBLIC_AUTH_EMULATOR_HOST",
  );
  const [storageHostname, storagePort] = parseHostPort(
    storageHost,
    "NEXT_PUBLIC_STORAGE_EMULATOR_HOST",
  );

  const firestoreConnectHost = resolveClientReachableHost(firestoreHostname);
  const authConnectHost = resolveClientReachableHost(authHostname);
  const storageConnectHost = resolveClientReachableHost(storageHostname);

  connectFirestoreEmulator(services.db, firestoreConnectHost, firestorePort);
  connectAuthEmulator(services.auth, `http://${authConnectHost}:${authPort}`, {
    disableWarnings: true,
  });
  connectStorageEmulator(services.storage, storageConnectHost, storagePort);

  globalThis.__firebaseEmulatorsConnected = true;
}
