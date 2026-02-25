import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: process.env.FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: process.env.FIREBASE_APP_ID || 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const sendOtp = async (
  phoneNumber: string,
  recaptchaContainerId = 'recaptcha-container',
): Promise<firebase.auth.ConfirmationResult> => {
  const verifier = new firebase.auth.RecaptchaVerifier(recaptchaContainerId, {
    size: 'invisible',
  });

  return auth.signInWithPhoneNumber(phoneNumber, verifier);
};

export const verifyOtp = async (
  verificationId: string,
  otp: string,
): Promise<firebase.auth.UserCredential> => {
  const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
  return auth.signInWithCredential(credential);
};

export default firebase;
