import admin from 'firebase-admin';

export const initializeFirebase = (): void => {
  if (admin.apps.length > 0) {
    return;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
    return;
  }

  // Fallback for local development where Firebase credentials are not configured.
  admin.initializeApp();
};

export const getFirebaseAuth = () => admin.auth();
