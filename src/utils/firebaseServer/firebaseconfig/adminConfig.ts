export type AdminCredentialConfig = {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
};

export type AdminInitConfig = {
  projectId: string;
  credential?: AdminCredentialConfig;
};

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function requireServerEnv(name: string): string {
  const value = env(name);
  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }
  return value;
}

export function getAdminInitConfig(): AdminInitConfig {
  const projectId =
    env("FIREBASE_PROJECT_ID") ??
    env("NEXT_PUBLIC_FIREBASE_PROJECT_ID") ??
    "demo-get-drop-io";

  const clientEmail = env("FIREBASE_CLIENT_EMAIL");
  const privateKey = env("FIREBASE_PRIVATE_KEY")?.replace(/\\n/g, "\n");

  if (!projectId) {
    throw new Error("Missing Firebase project id for admin initialization.");
  }

  if (clientEmail || privateKey) {
    return {
      projectId,
      credential: {
        projectId,
        clientEmail: clientEmail ?? requireServerEnv("FIREBASE_CLIENT_EMAIL"),
        privateKey: privateKey ?? requireServerEnv("FIREBASE_PRIVATE_KEY"),
      },
    };
  }

  return { projectId };
}
