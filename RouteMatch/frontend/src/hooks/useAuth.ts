import { useState, useEffect } from 'react';
import firebase from '../config/firebase';

const useAuth = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((nextUser: firebase.User | null) => {
      setUser(nextUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (phoneNumber: string, appVerifier: firebase.auth.ApplicationVerifier) => {
    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      return confirmationResult;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return { user, loading, login, logout };
};

export default useAuth;
