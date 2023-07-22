import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// authService.js

// Firebase configuration (replace with your own Firebase project configuration)
const firebaseConfig = {
    apiKey: "AIzaSyCUwGzMXpJOn-Un6IJjh4wyVWi0OnODGK8",
    authDomain: "oneeleven-d838f.firebaseapp.com",
    projectId: "oneeleven-d838f",
    storageBucket: "oneeleven-d838f.appspot.com",
    messagingSenderId: "746518673186",
    appId: "1:746518673186:web:8ce3456041f3186a0a977b"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to sign up with email/password
export const signUpWithEmailAndPassword = (email, password) => {
  // Create a new user using Firebase Authentication
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Return the user data or modify it as needed
      return user;
    })
    .catch((error) => {
      // Handle any errors that occur during the sign-up process
      throw new Error(error.message);
    });
};

// Function to sign in with email/password
export const signInWithEmailAndPassword = (email, password) => {
    // Sign in the user using Firebase Authentication
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Return the user data or modify it as needed
            return user;
        })
        .catch((error) => {
            // Handle any errors that occur during the sign-in process
            throw new Error(error.message);
        });
};

// Function to sign up with Google
export const signUpWithGoogle = () => {
  // Create a new Google provider
  const provider = new firebase.auth.GoogleAuthProvider();

  // Sign up the user using Google authentication
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((userCredential) => {
      const user = userCredential.user;
      // Return the user data or modify it as needed
      return user;
    })
    .catch((error) => {
      // Handle any errors that occur during the sign-up process
      throw new Error(error.message);
    });
};
