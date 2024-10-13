import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyBcAX2Ud03U3u3pXiLiyXucMEZr-ih9zp4',
	authDomain: 'it303-project.firebaseapp.com',
	projectId: 'it303-project',
	storageBucket: 'it303-project.appspot.com',
	messagingSenderId: '1095256827838',
	appId: '1:1095256827838:web:b8fec1b75845b3e9bcbbef'
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

// Initialize Firebase services
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)

export const signupUser = async (email, password, userType) => {
  try {
    console.log("Attempting to sign up user:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    console.log("User created successfully:", user.uid);

    await setDoc(doc(db, "users", user.uid), {
      email: email,
      userType: userType
    })

    console.log("User data stored in Firestore:", email, userType)
  } catch (error) {
    console.error("Error signing up user:", error.code, error.message)
    console.error("Full error object:", JSON.stringify(error, null, 2))
    throw error
  }
}

export const loginUser = async (email, password) => {
  try {
    console.log("Attempting to log in user:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    console.log("User successfully authenticated:", user.uid);

    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (userDoc.exists()) {
      const userData = userDoc.data()
      console.log("User data retrieved from Firestore:", userData)
      return userData.userType
    } else {
      console.error("No user data found in Firestore for UID:", user.uid)
      throw new Error("User data not found.")
    }
  } catch (error) {
    console.error("Error in loginUser function:", error.code, error.message)
    console.error("Full error object:", JSON.stringify(error, null, 2))
    throw error
  }
}
