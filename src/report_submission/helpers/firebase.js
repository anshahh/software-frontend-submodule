// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBcAX2Ud03U3u3pXiLiyXucMEZr-ih9zp4',
	authDomain: 'it303-project.firebaseapp.com',
	projectId: 'it303-project',
	storageBucket: 'it303-project.appspot.com',
	messagingSenderId: '1095256827838',
	appId: '1:1095256827838:web:b8fec1b75845b3e9bcbbef'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
