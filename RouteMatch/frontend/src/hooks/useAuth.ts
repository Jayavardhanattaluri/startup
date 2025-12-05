import { useState, useEffect } from 'react';
import firebase from '../config/firebase'; // Import Firebase configuration

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const login = async (phoneNumber) => {
        try {
            const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
            return confirmationResult; // Return confirmation result for OTP verification
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Rethrow error for handling in the component
        }
    };

    const logout = async () => {
        try {
            await firebase.auth().signOut();
            setUser(null); // Clear user state on logout
        } catch (error) {
            console.error("Logout failed:", error);
            throw error; // Rethrow error for handling in the component
        }
    };

    return { user, loading, login, logout };
};

export default useAuth;