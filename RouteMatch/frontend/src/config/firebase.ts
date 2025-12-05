import firebase from 'firebase/app';
import 'firebase/auth';

// Firebase configuration for OTP login
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Function to send OTP
export const sendOtp = async (phoneNumber) => {
  const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  return await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
};

// Function to verify OTP
export const verifyOtp = async (verificationId, otp) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
  return await firebase.auth().signInWithCredential(credential);
};

// Export Firebase auth instance
export const auth = firebase.auth();