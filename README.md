# Drop.io Frontend

For local Firebase emulator setup, use `readmeforemulators.md`.

## Prerequisites

- Node.js 20.9.0 or newer
- Java JDK 11 or newer (required by Firestore emulator)
- Firebase CLI 8.14.0 or newer

Quick checks:

```bash
node -v
java -version
firebase --version
```

This repo includes `.nvmrc` with `20.9.0`.

## Install and Run

1. Clone the repository.

```bash
git clone https://github.com/web-space-dev/get-drop.io-frontend
cd get-drop.io-frontend
```

2. Use the pinned Node version.

```bash
nvm use
```

3. Install dependencies.

```bash
npm install
```

4. Copy env template and fill in Firebase Web App values.

```bash
cp example.env .env.local
```

5. Start local emulators (safe demo project ID).

```bash
npm run dev:emulators
```

6. In a second terminal, run the app.

```bash
npm run dev
```

7. Open the app and Emulator UI.

- App: http://localhost:3000
- Emulator UI: http://127.0.0.1:4000

## Local Emulator Safety Model

- Emulator scripts run with `--project demo-get-drop-io`.
- This prevents accidental writes to your live dev Firebase project.
- Keep `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true` in local development.

## Emulator Commands

- Start Firestore/Auth/Storage emulators with persisted local data:

```bash
npm run dev:emulators
```

- Start all configured emulators:

```bash
npm run dev:emulators:all
```

## Firebase Integration

Reusable Firebase client + emulator routing is in:

- `src/utils/firebaseServer/firebaseClient.ts`
- `src/utils/firebaseServer/firebaseconfig/firebaseConfig.ts`
- `src/utils/firebaseServer/firebaseconfig/useEmulators.ts`

Server-only Firebase Admin setup is in:

- `src/utils/firebaseServer/firebaseServer.ts`
- `src/utils/firebaseServer/firebaseconfig/adminConfig.ts`
- `src/utils/firebaseServer/firebaseconfig/useAdminEmulators.ts`

Use it where needed:

```ts
import { getFirebaseServices } from "@/utils/firebaseServer/firebaseClient";

const { auth, db, storage } = getFirebaseServices();
```

Server usage (API routes/server actions only):

```ts
import {
  adminFirestore,
  verifyIdToken,
} from "@/utils/firebaseServer/firebaseServer";
```

When `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true`, this connects to:

- Firestore: `127.0.0.1:8080`
- Auth: `127.0.0.1:9099`
- Storage: `127.0.0.1:9199`

When `USE_FIREBASE_EMULATORS=true`, server-side admin SDK also routes to local emulators.

## Libraries Used

- Next.js
- React
- TypeScript
- MUI (Material UI + Emotion)
- Framer Motion
- ESLint + Prettier
