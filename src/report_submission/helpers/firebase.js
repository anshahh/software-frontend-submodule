import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail 
} from 'firebase/auth';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyBcAX2Ud03U3u3pXiLiyXucMEZr-ih9zp4",
  authDomain: "it303-project.firebaseapp.com",
  projectId: "it303-project",
  storageBucket: "it303-project.appspot.com",
  messagingSenderId: "1095256827838",
  appId: "1:1095256827838:web:b8fec1b75845b3e9bcbbef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized successfully");

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

/**
 * Sign up a new user and store their email and userType in Firestore.
 * Also sends an email verification link.
 */
export const signupUser = async (email, password, userType) => {
  try {
    console.log("Attempting to sign up user:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User created successfully:", user.uid);

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      email: email,
      userType: userType
    });

    console.log("User data stored in Firestore:", email, userType);

    // Send email verification
    await sendEmailVerification(user);
    console.log("Email verification sent.");

    // Verify document creation
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log("Verified user document exists in Firestore.");
    } else {
      console.error("User document was not found in Firestore after creation.");
      throw new Error("Failed to create user data in Firestore.");
    }
  } catch (error) {
    console.error("Error signing up user:", error.code, error.message);
    console.error("Full error object:", JSON.stringify(error, null, 2));
    throw error;
  }
}

/**
 * Log in an existing user and retrieve their userType from Firestore.
 * Checks if the user's email is verified.
 */
export const loginUser = async (email, password) => {
  try {
    console.log("Attempting to log in user:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Refresh user to get the latest emailVerified status
    await user.reload();

    // Check if email is verified
    if (user.emailVerified) {
      throw new Error("Please verify your email before logging in.");
    }

    console.log("User successfully authenticated:", user.uid);

    const userDocRef = doc(db, "users", user.uid);
    console.log("Fetching user document from Firestore:", userDocRef.path);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User data retrieved from Firestore:", userData);
      return userData.userType;
    } else {
      console.error("No user data found in Firestore for UID:", user.uid);
      throw new Error("User data not found in Firestore. Please contact support.");
    }
  } catch (error) {
    if (error.code) {
      // Firebase-specific errors
      console.error("FirebaseError Code:", error.code);
      console.error("FirebaseError Message:", error.message);
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error("No user found with this email.");
        case 'auth/wrong-password':
          throw new Error("Incorrect password.");
        case 'auth/invalid-email':
          throw new Error("Invalid email address.");
        case 'auth/configuration-not-found':
          throw new Error("Firebase configuration error. Please contact support.");
        default:
          throw new Error(`Authentication error: ${error.message}`);
      }
    } else {
      // Other errors (e.g., Firestore issues)
      console.error("Error in loginUser function:", error);
      throw error;
    }
  }
}

/**
 * Send a password reset email to the user.
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent.");
  } catch (error) {
    console.error("Error sending password reset email:", error.code, error.message);
    throw error;
  }
};
