# Emulator Setup Guide

This guide is focused on running Firebase emulators locally for Firestore, Auth, and Storage.

## Prerequisites

- Node.js 20.9.0 or newer
- Java JDK 11 or newer
- Firebase CLI 8.14.0 or newer

Check versions:

```bash
node -v
java -version
firebase --version
```

## One-Time Setup

1. Use project Node version.

```bash
nvm use
```

2. Install dependencies.

```bash
npm install
```

3. Create local env file.

```bash
cp example.env .env.local
```

4. Fill at least these keys in `.env.local`:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=demo-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=demo-get-drop-io.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-get-drop-io
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=demo-get-drop-io.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=demo-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=demo-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=demo-measurement-id

USE_FIREBASE_EMULATORS=true
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true
NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
NEXT_PUBLIC_AUTH_EMULATOR_HOST=127.0.0.1:9099
NEXT_PUBLIC_STORAGE_EMULATOR_HOST=127.0.0.1:9199
```

## Start Local Development

Run emulators in one terminal:

```bash
npm run dev:emulators
```

Run Next.js app in a second terminal:

```bash
npm run dev
```

Open:

- App: http://localhost:3000
- Emulator UI: http://127.0.0.1:4000

## Safety Model

- Emulator script uses `--project demo-get-drop-io`.
- Frontend uses `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true` to route SDK calls to localhost.
- Server/admin code uses `USE_FIREBASE_EMULATORS=true` to route admin SDK to localhost hosts.

## Current Firebase File Responsibilities

Client SDK modules:

- `src/utils/firebaseServer/firebaseClient.ts`
- `src/utils/firebaseServer/firebaseconfig/firebaseConfig.ts`
- `src/utils/firebaseServer/firebaseconfig/useEmulators.ts`

Server/Admin SDK modules:

- `src/utils/firebaseServer/firebaseServer.ts`
- `src/utils/firebaseServer/firebaseconfig/adminConfig.ts`
- `src/utils/firebaseServer/firebaseconfig/useAdminEmulators.ts`

## Verification Steps

1. Click your test write button in the app.
2. Check Firestore in Emulator UI for a new document in `quickTest`.
3. Confirm no data appears in your live Firebase console.

## Troubleshooting

- If env changes are not picked up, stop and restart `npm run dev`.
- If Next.js fails on Node version, run `nvm use` and verify `node -v` is at least `20.9.0`.
- If emulator connection fails, confirm `npm run dev:emulators` is running and ports 8080/9099/9199 are available.
